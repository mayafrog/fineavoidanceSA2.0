import os
from collections import defaultdict
from flask import Flask, jsonify, request
import requests
from datetime import datetime, date
import time
from bs4 import BeautifulSoup
from firebase_admin import credentials, firestore, initialize_app

MAPS_API_KEY = os.getenv('MAPS_API_KEY')


def scrape():
    URL = 'https://www.police.sa.gov.au/your-safety/road-safety/traffic-camera-locations'
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')

    elements = soup.findAll("li", {"class": "showlist"})

    # get the list of cameras for each date, using a set to remove duplicates
    hashmap = defaultdict(set)

    for el in elements:
        date = el.get('data-value')
        address = el.text

        if not date:
            continue

        hashmap[date].add(address)

    # format result array, which will be sent as a JSON array
    res = [{"date": date, "cameras": list(hashmap[date])} for date in hashmap]

    return res


def geocode(address):
    try:
        address += ", SOUTH AUSTRALIA, AUSTRALIA"

        params = {'address': address +
                  ", SOUTH AUSTRALIA, AUSTRALIA", 'key': MAPS_API_KEY}

        response = requests.get(
            "https://maps.googleapis.com/maps/api/geocode/json", params=params)

        data = response.json()['results'][0]['geometry']['location']
        lat = data['lat']
        lng = data['lng']

        return {"lng": lng, "lat": lat}

    except Exception as e:
        return f"An Error Occurred: {e}"


def create_app(test_config=None):
    # Initialise Flask app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    # Initialise Firestore DB
    cred = credentials.Certificate('key.json')
    default_app = initialize_app(cred)
    db = firestore.client()

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # route to scrape and return list of all cameras
    @app.route('/cameras', methods=['GET'])
    def get_cameras():
        res = scrape()

        # sort by ascending date
        res.sort(key=lambda x: datetime.strptime(x.get("date"), "%d/%m/%Y"))

        # return as JSON array
        return jsonify(res)

    # route to upsert information into database for a certain date
    @app.route('/cameras', methods=['POST', 'PUT'])
    def upsert_cameras():
        try:
            ref = db.collection('cameras')
            for each in ref.get():
                if each.get('date') == request.json['date']:
                    ref.document(each.id).update(request.json)
                    break
            else:
                ref.add(request.json)

            return jsonify({"success": True}), 200

        except Exception as e:
            return f"An Error Occurred: {e}"

    # route to return list of all cameras stored in database
    @app.route('/all-cameras', methods=['GET'])
    def get_all_cameras():
        try:
            ref = db.collection('cameras')
            all_entries = [doc.to_dict() for doc in ref.stream()]
            return jsonify(all_entries), 200
        except Exception as e:
            return f"An Error Occurred: {e}"

    # route to automatically upsert into database using scraper
    @app.route('/all-cameras', methods=['POST', 'PUT'])
    def upsert_all_cameras():
        try:
            ref = db.collection('cameras')
            already_stored = set([each.get('date') for each in ref.get()])
            scraped = scrape()
            res = []

            for each in scraped:
                date = each['date']

                if date in already_stored:
                    continue

                obj = {"date": date, "cameras": []}
                for location in each['cameras']:
                    geoinfo = geocode(location)
                    instance = {
                        "location": location,
                        "position": {"lng": geoinfo['lng'],
                                     "lat": geoinfo['lat']}

                    }
                    obj["cameras"].append(instance)

                res.append(obj)

            # make transactional
            for each in res:
                ref.add(each)

            return jsonify({"success": True}), 200

        except Exception as e:
            return f"An Error Occurred: {e}"

    # route to return list of cameras for today's date stored in database (ALT: GET FROM SCRAPER)
    @app.route('/cameras-today', methods=['GET'])
    def get_cameras_today():
        today = (date.today().strftime("%d/%m/%Y"))
        try:
            ref = db.collection('cameras')
            all_entries = [doc.to_dict() for doc in ref.where(
                "date", "==", today).stream()]
            return jsonify(all_entries), 200
        except Exception as e:
            return f"An Error Occurred: {e}"

    return app
