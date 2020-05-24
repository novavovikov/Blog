import os
from os import path

import requests
import xmltodict
from app import app, cache, root_folder
from flask import render_template
from markdown import markdown
from typings.events import FrontendEvents, KotlinEvents

articles_dir = path.join(root_folder, 'articles/')


@app.route('/')
@cache.cached(timeout=600)
def main():
    return render_template('pages/index.html')


@app.route('/articles/<path:filename>')
@cache.cached(timeout=600)
def article_page(filename):
    try:
        with open(f'{articles_dir}{filename}.md') as file:
            content = markdown(file.read())
            return render_template('pages/article.html', content=content)
    except Exception:
        return render_template('pages/not-found.html')


@app.route('/articles')
@cache.cached(timeout=600)
def articles_page():
    def filter_md_files(file_name):
        return file_name.endswith('.md')

    def get_article_name(file_name):
        return file_name.replace('.md', '')

    md_files = filter(filter_md_files, os.listdir(articles_dir))
    articles = map(get_article_name, md_files)
    return render_template('pages/articles.html', articles=articles)


@app.route('/frontend')
@cache.cached(timeout=600)
def frontend_events_page():
    frontend_events_url = 'https://web-standards.ru/calendar.json'

    try:
        # kotlin_events = requests.get(kotlin_events_url, stream=True)
        # xmltodict.parse(kotlin_events.content)

        frontend_events: requests.Response[FrontendEvents] = requests.get(frontend_events_url)
        events = reversed(frontend_events.json())
        return render_template('pages/frontend_events.html', title="Frontend", events=events)
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
        return render_template('pages/kotlin_events.html', title="Kotlin", events=events)
    except ValueError:
        return 'Oops!  That was no valid content.  Try again...'


@app.errorhandler(404)
def not_found_page(e):
    return render_template('pages/not-found.html')
