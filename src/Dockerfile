FROM python:3.8.0-alpine

# set environment variables
ENV FLASK_RUN_HOST 0.0.0.0

COPY requirements.txt .

RUN apk update
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev linux-headers && \
 python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps


COPY . .

CMD ["flask", "db", "init"]
CMD ["flask", "db", "migrate"]
CMD ["flask", "db", "upgrade"]
CMD ["flask", "run"]