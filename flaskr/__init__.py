import os
from collections import defaultdict
from flask import Flask
import requests
from datetime import date
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
        today = (date.today().strftime("%d/%m/%Y"))

        URL = 'https://www.police.sa.gov.au/your-safety/road-safety/traffic-camera-locations'
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, 'html.parser')
        
        big_list = soup.find_all("ul", {"class": re.compile(r"^showlist")})
        locations = soup.findAll("li", {"class": "showlist"})

        hashmap = defaultdict(set)

        # print(big_list)
        for ul in locations:
            if ul.get('data-value'):
                hashmap[ul.get('data-value')].add(ul.text)

        return [today, list(hashmap[today])]

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app
