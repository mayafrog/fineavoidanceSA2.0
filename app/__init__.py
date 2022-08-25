import os
from collections import defaultdict
from flask import Flask, render_template
import requests
from datetime import datetime, date
from bs4 import BeautifulSoup
import re


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
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

    # default page
    @app.route('/')
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
            res.append([day, list(hashmap[day])])

        res.sort(key = lambda x: datetime.strptime(x[0], "%d/%m/%Y"))

        return render_template('index.html')

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app
