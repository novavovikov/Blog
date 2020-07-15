import uuid
import shutil

from flask import render_template, send_from_directory, request, Blueprint, \
    redirect, url_for
from transliterate import translit, detect_language

from constants.query import QueryParams
from constants.share import Share
from utils.articles import *
from utils.cache import cache

articles_bp = Blueprint('articles', __name__)

#
@articles_bp.route('/')
def articles_page():
    tag_param = request.args.get(QueryParams.tag)
    article_names = tag_param and get_article_names_by_tag(tag_param)
    articles = get_article_list(article_names)
    tags = get_tag_names()
    return render_template(
        'pages/articles.html',
        articles=articles,
        title=tag_param,
        tags=tags
    )


@articles_bp.route('/search')
def search_page():
    query_param = request.args.get(QueryParams.query)
    articles = get_article_list()
    filtered_articles = filter_articles_by_str(query_param, articles)
    tags = get_tag_names()
    return render_template(
        'pages/articles.html',
        articles=filtered_articles,
        title=query_param,
        tags=tags
    )


@articles_bp.route('/new')
@cache.cached(timeout=600)
def new_post():
    return render_template('pages/new_post.html')


@articles_bp.route('/create', methods=['POST'])
def create_page():
    title = request.form['title']
    description = request.form['description']
    tags = request.form['tags']
    content = request.form['content']

    article_name = translit(title, reversed=True) if detect_language(
        title) else title
    hashed_dirname = f'{article_name.lower()}-{uuid.uuid4().hex[:8]}'
    dirname = hashed_dirname.replace(' ', '-')
    article_dir = path.join(articles_dir, dirname)

    os.mkdir(article_dir)
    with open(path.join(article_dir, 'content.md'), 'w') as file:
        file.write(content)

    with open(path.join(article_dir, 'settings.yml'), 'w') as file:
        settings = {
            'title': title,
            'description': description,
            'created_date': os.path.getctime(
                path.join(article_dir, 'content.md')),
            'tags': list(map(lambda tag: tag.strip(), tags.split(',')))
        }
        yaml.dump(settings, stream=file, Dumper=yaml.RoundTripDumper,
                  allow_unicode=True)

    # git_push(branch_name=dirname, commit_message=article_name)
    # rm_tree(article_dir)
    return redirect(f'/articles/{dirname}')


@articles_bp.route('/files/<path:dirname>/<path:filename>')
@cache.cached(timeout=600)
def images(dirname, filename):
    return send_from_directory(path.join(articles_dir, dirname), filename)


@articles_bp.route('/articles/<path:dirname>')
@cache.cached(timeout=600)
def article_page(dirname: str):
    remove_param = request.args.get(QueryParams.remove)

    if remove_param is not None:
        article_path = os.path.join(articles_dir, dirname)
        shutil.rmtree(article_path, ignore_errors=True)
        return redirect('/')

    try:

        article_content = get_article_content(dirname)
        article_settings = get_article_settings(dirname)
        return render_template(
            'pages/article.html',
            settings=article_settings,
            content=article_content,
            article_url=get_article_url(dirname),
            share=Share.items,
            tags=article_settings.get('tags'),
        )
    except ValueError:
        return render_template('pages/not-found.html')
