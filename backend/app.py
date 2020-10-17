from datetime import datetime
from os import path
from typing import Dict

import ruamel.yaml as yaml
from dateutil.parser import parse
from flask import Flask, render_template

from paths import data_dir
from routes.articles import articles_bp
from routes.events import events_bp
from routes.other import other_bp
from utils import articles, structure
from utils.cache import cache

structure.create_temp_folder()
articles.generate_article_tags()

app = Flask(__name__, static_folder='templates/assets')

if app.config['ENV'] == 'production':
    app.config.from_object('config.ProductionConfig')
else:
    app.config.from_object('config.DevelopmentConfig')

cache.init_app(app)
app.register_blueprint(other_bp)
app.register_blueprint(articles_bp)
app.register_blueprint(events_bp, url_prefix='/events')


@app.template_global('get_nav')
def get_nav(place: str):
    with open(path.join(data_dir, "_nav.yml")) as file:
        return yaml.safe_load(file).get(place, ())


@app.template_global('now')
def now():
    return datetime.utcnow()


@app.template_filter('get_social_url')
def get_social_url(system: str, article):
    return article.get('cover', system)


@app.template_filter('format_date')
def format_date(value: str, dateFormat: str = '%d.%m.%Y'):
    date = parse(value)
    return datetime.strftime(date, dateFormat)


@app.template_filter('timestamp_to_date')
def timestamp_to_date(value: float, dateFormat: str = '%d %b %Y'):
    return datetime.fromtimestamp(value).strftime(dateFormat)


@app.template_filter('get_google_calendar_link')
def get_google_calendar_link(event: Dict):
    text = event.get('summary')
    date_format = "%Y%m%d" if event.get('allDay') else "%Y%m%dT%H%M%SZ"
    start_date = format_date(event.get('start'), date_format)
    end_date = format_date(event.get('end'), date_format)
    details = event.get('description')
    location = event.get('location')
    return f""""http://www.google.com/calendar/event?action=TEMPLATE
&text={text}
&dates={start_date}/{end_date}
&details={details}
&location={location}
&trp=false&sprop=&sprop=name:"""


@app.after_request
def add_header(request):
    request.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    request.headers["Pragma"] = "no-cache"
    request.headers["Expires"] = "0"
    request.headers['Cache-Control'] = 'public, max-age=0'
    return request


@app.errorhandler(404)
@cache.cached(timeout=600)
def not_found_page(e):
    return render_template('pages/not-found.html')


if __name__ == '__main__':
    app.run()
