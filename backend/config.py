import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'this-really-needs-to-be-changed'
    SQLALCHEMY_DATABASE_URI = 'postgresql://events:events@postgres:5432/events'
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    CACHE_TYPE = 'redis'
    CACHE_KEY_PREFIX = 'pages'
    CACHE_REDIS_HOST = 'redis'


class DevelopmentConfig(Config):
    CACHE_TYPE = 'null'
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
