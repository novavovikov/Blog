from flask import Flask
from flask_caching import Cache
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy

from helpers.date import format_datetime
from helpers.google import get_google_calendar_link

app = Flask(__name__)

if app.config['ENV'] == 'production':
    app.config.from_object('config.ProductionConfig')
else:
    app.config.from_object('config.DevelopmentConfig')

app.jinja_env.filters['format_datetime'] = format_datetime
app.jinja_env.filters['get_google_calendar_link'] = get_google_calendar_link

db = SQLAlchemy(app)
cache = Cache(app)

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

import routes.views
import routes.api

if __name__ == '__main__':
    manager.run()
