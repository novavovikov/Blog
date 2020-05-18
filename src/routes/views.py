import requests
import xmltodict
from app import app, cache
from flask import render_template

from typings.events import FrontendEvents, KotlinEvents


@app.route('/')
@cache.cached(timeout=600)
def frontend_events_page():
    frontend_events_url = 'https://web-standards.ru/calendar.json'

    try:
        # kotlin_events = requests.get(kotlin_events_url, stream=True)
        # xmltodict.parse(kotlin_events.content)

        frontend_events: requests.Response[FrontendEvents] = requests.get(frontend_events_url)
        events = reversed(frontend_events.json())
        return render_template('pages/frontend_events.html', events=events)
    except ValueError:
        return 'Oops!  That was no valid content.  Try again...'


@app.route('/kotlin')
@cache.cached(timeout=600)
def kotlin_events_page():
    kotlin_events_url = 'https://raw.githubusercontent.com/JetBrains/kotlin-web-site/master/data/events.xml'

    try:
        kotlin_events = requests.get(kotlin_events_url)
        # FIXME sorting by date
        events: KotlinEvents = xmltodict.parse(kotlin_events.content)['events']['event']
        return render_template('pages/kotlin_events.html', events=events)
    except ValueError:
        return 'Oops!  That was no valid content.  Try again...'


@app.errorhandler(404)
def not_found_page(e):
    return render_template('pages/not-found.html')
