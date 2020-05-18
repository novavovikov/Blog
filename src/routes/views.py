import requests
from flask import render_template

from app import app, cache


@app.route('/')
@cache.cached(timeout=600)
def home():
    try:
        response = requests.get('https://web-standards.ru/calendar.json')
        events = response.json()[::-1]
        return render_template('events.html', events=events)
    except ValueError:
        return 'Oops!  That was no valid content.  Try again...'


@app.errorhandler(404)
def not_found_page(e):
    return render_template('not-found.html')
