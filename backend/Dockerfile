FROM python:3.8.0-alpine

# set environment variables
ENV FLASK_RUN_HOST 0.0.0.0

COPY . .

RUN \
  apk update &&\
  pip install --upgrade pip &&\
  apk add --no-cache --virtual .build-deps gcc musl-dev linux-headers && \
  python3 -m pip install -r requirements.txt --no-cache-dir && \
  apk --purge del .build-deps

CMD ["flask", "run"]
