import os
from datetime import datetime
from math import ceil
from os import path
from typing import Tuple, List, Iterator

import ruamel.yaml as yaml
from markdown import markdown

from paths import articles_dir, tags_file
from typings.articles import Articles, Article


def intersection(list_a, list_b):
    return [e for e in list_a if e in list_b]


def article_reading_time(dirname: str):
    with open(path.join(articles_dir, dirname, 'content.md')) as file:
        data = file.read().replace(' ', '')
        reading_time = len(data) / 1500
        return ceil(reading_time)


def get_article_settings(dirname: str) -> Article:
    article_dir = path.join(articles_dir, f'{dirname}/')
    cover_name = get_article_cover_name(dirname)
    article_settings = {}

    with open(path.join(article_dir, 'settings.yml')) as file:
        file_content = yaml.safe_load(file)
        file_content and article_settings.update(file_content)

    with open(path.join(article_dir, 'settings.yml'), 'w') as file:
        if 'created_date' not in article_settings:
            content_file = path.join(article_dir, 'content.md')
            created_date = os.path.getctime(content_file)
            article_settings.update({
                'created_date': created_date
            })

        yaml.dump(
            article_settings,
            stream=file,
            Dumper=yaml.RoundTripDumper,
            allow_unicode=True
        )

    # specify it explicitly in the settings file or have a file named “cover”
    if 'cover' not in article_settings:
        article_settings.update({
            'cover': cover_name and f'/files/{dirname}/{cover_name}'
        })

    # dynamic values
    article_settings.update({
        'dirname': dirname,
        'url': f'articles/{dirname}',
        'reading_time': article_reading_time(dirname)
    })

    return article_settings


def get_article_list(article_names: List[str] = None) -> Articles:
    files = os.listdir(articles_dir)
    articles = filter(
        lambda file: os.path.isdir(path.join(articles_dir, file)),
        files
    )

    if isinstance(article_names, list):
        articles = intersection(articles, article_names)

    article_list = list(map(get_article_settings, articles))
    article_list.sort(
        key=lambda a: datetime.fromtimestamp(a.get('created_date')),
        reverse=True
    )

    return article_list


def generate_article_tags():
    settings_list = get_article_list()
    all_tags = {}

    for settings in settings_list:
        tags = settings.get('tags')
        if tags:
            for tag in tags:
                tag_articles = all_tags.get(tag, [])
                all_tags[tag] = tag_articles + [settings.get('dirname')]

    with open(tags_file, 'w') as file:
        yaml.dump(all_tags, stream=file, Dumper=yaml.RoundTripDumper,
                  allow_unicode=True)


def get_article_names_by_tag(tag: str) -> List[str]:
    with open(tags_file) as file:
        tags = yaml.safe_load(file)
        return tags.get(tag, [])


def has_text_in_article(query: str):
    def has_query_in_str(string: str):
        return string.lower().find(query.lower()) != -1

    def has_query_in_article(article) -> bool:
        tags = article.get('tags', [])
        for item in tags:
            if has_query_in_str(item):
                return True

        for key in ('title', 'description'):
            string = article.get(key, '')
            if has_query_in_str(string):
                return True

        return False

    return has_query_in_article


def filter_articles_by_str(
    query: str,
    articles: Articles
) -> Iterator[Article]:
    return list(filter(has_text_in_article(query), articles))


def get_tag_names(count=0) -> Tuple[str]:
    with open(tags_file) as file:
        tags = yaml.safe_load(file)
        return tuple(tags[0:count]) if count > 0 else tags


def get_article_cover_name(dirname):
    extensions = ('jpg', 'jpeg', 'png')
    for ext in extensions:
        filename = f'cover.{ext}'
        has_file = os.path.exists(path.join(articles_dir, dirname, filename))
        if has_file:
            return filename


def get_article_url(dirname):
    article_url = os.environ.get('ARTICLES_URL')
    return article_url and f'{article_url}/{dirname}'


def get_article_content(dirname):
    with open(f'{articles_dir}{dirname}/content.md') as file:
        return markdown(file.read(), extensions=['fenced_code'])
