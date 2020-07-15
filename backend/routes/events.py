import requests
import xmltodict
from flask import render_template, Blueprint, request

from utils.cache import cache

events_bp = Blueprint('events', __name__)


def get_cities (events):
    cities = set()
    for event in events:
        city = event.get('location', 'unknown')
        cities.add(city)

    return list(cities)



@events_bp.route('/frontend')
@cache.cached(timeout=600)
def frontend_events_page():
    frontend_events_url = 'https://web-standards.ru/calendar.json'

    try:
        frontend_events = requests.get(frontend_events_url)
        cities = get_cities(frontend_events.json())
        location_param = request.args.get('location', '')
        location = location_param.lower().strip()

        events = list(filter(
            lambda e: location in e.get('location', 'unknown').lower(),
            reversed(frontend_events.json())
        ))

        return render_template(
            'pages/frontend_events.html',
            title="Frontend",
            location=location_param,
            cities=cities,
            events=events,
        )
    except ValueError:
        return 'Oops!  That was no valid content.  Try again...'


@events_bp.route('/kotlin')
@cache.cached(timeout=600)
def kotlin_events_page():
    kotlin_events_url = """https://raw.githubusercontent.com/JetBrains/kotlin-web-site/master/data/events.xml"""

    try:
        kotlin_events = requests.get(kotlin_events_url)
        # FIXME sorting by date
        events_content = xmltodict.parse(kotlin_events.content)
        events = events_content['events']['event']
        return render_template(
            'pages/kotlin_events.html',
            title="Kotlin",
            events=events
        )
    except ValueError:
        return 'Oops!  That was no valid content.  Try again...'
