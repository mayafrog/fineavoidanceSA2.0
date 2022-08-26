import os
from collections import defaultdict
from flask import Flask, render_template
import requests
from datetime import datetime, date
import time
from bs4 import BeautifulSoup


class Day:
    def __init__(self, date, cameras):
        self.date = date
        self.cameras = cameras


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

        hashmap = defaultdict(set)

        for el in elements:
            if el.get('data-value'):
                hashmap[el.get('data-value')].add(el.text)

        res = []

        for day in hashmap:
            # res.append([day, list(hashmap[day])])
            res.append([day, list(hashmap[day])])

        res.sort(key=lambda x: datetime.strptime(x[0], "%d/%m/%Y"))

        return {'results': res}

    # test route to ensure React frontend can communicate with Flask backend
    @app.route('/time')
    def get_current_time():
        return {'time': time.time()}

    return app
