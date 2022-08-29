import json
import os
from collections import defaultdict
from flask import Flask, jsonify
import requests
from datetime import datetime, date
import time
from bs4 import BeautifulSoup


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

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

    # route to return list of (dates : list of cameras)
    @app.route('/cameras')
    def default():
        URL = 'https://www.police.sa.gov.au/your-safety/road-safety/traffic-camera-locations'
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, 'html.parser')

        elements = soup.findAll("li", {"class": "showlist"})

        # get the list of cameras for each date, using a set to remove duplicates
        hashmap = defaultdict(set)

        for el in elements:
            date = el.get('data-value')
            location = el.text

            if not date:
                continue

            hashmap[date].add(location)

        # format result array, which will be sent as a JSON array
        res = []

        for date in hashmap:
            obj = {
                "date": date,
                "cameras": list(hashmap[date])
            }

            res.append(obj)

        # sort by ascending date
        res.sort(key=lambda x: datetime.strptime(x.get("date"), "%d/%m/%Y"))

        # return as JSON array
        return jsonify(res)

    # test route to ensure React frontend can communicate with Flask backend
    @app.route('/time')
    def get_current_time():
        return {'time': time.time()}

    return app
