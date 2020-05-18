import os
from datetime import datetime
from os import path
from typing import Dict

import ruamel.yaml as yaml
from dateutil.parser import parse
from flask import Flask
from flask_caching import Cache
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy

root_folder = os.path.dirname(__file__)

app = Flask(__name__)

if app.config['ENV'] == 'production':
    app.config.from_object('config.ProductionConfig')
else:
    app.config.from_object('config.DevelopmentConfig')

db = SQLAlchemy(app)
cache = Cache(app)

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


@app.template_global('get_nav')
def get_nav():
    with open(path.join(root_folder, "_nav.yml")) as file:
        return yaml.safe_load(file)


@app.template_filter('format_datetime')
def format_datetime(value: str, dateFormat: str = '%d.%m.%Y'):
    date = parse(value)
    return datetime.strftime(date, dateFormat)


@app.template_filter('get_google_calendar_link')
def get_google_calendar_link(event: Dict):
    text = event.get('summary')
    date_format = "%Y%m%d" if event.get('allDay') else "%Y%m%dT%H%M%SZ"
    start_date = format_datetime(event.get('start'), date_format)
    end_date = format_datetime(event.get('end'), date_format)
    details = event.get('description')
    location = event.get('location')
    return f"http://www.google.com/calendar/event?action=TEMPLATE&text={text}&dates={start_date}/{end_date}&details={details}&location={location}&trp=false&sprop=&sprop=name:"


from routes import api
from routes import views

views
api


@app.after_request
def add_header(request):
    request.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    request.headers["Pragma"] = "no-cache"
    request.headers["Expires"] = "0"
    request.headers['Cache-Control'] = 'public, max-age=0'
    return request


if __name__ == '__main__':
    manager.run()
