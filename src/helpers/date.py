from datetime import datetime

from dateutil.parser import parse


def format_datetime(value, dateFormat="%d.%m.%Y"):
    date = parse(value)
    return datetime.strftime(date, dateFormat)
