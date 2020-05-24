# Blog generated from md files

[Example here](http://events.novavovikov.ru/)

## Installation
You will need Docker to run site lifecycle tasks

## Run

### dev mode
```shell script
./run-dev.sh
```

> `backend` - http://localhost:5000 
>
> `frontend` - http://localhost:3000


### prod mode
backend:
```shell script
export FLASK_ENV='production'
export USER_ID=$(id -u)
export GROUP_ID=$(id -g)

docker-compose build --no-cache
docker-compose up -d --force-recreate
```

proxy:
```shell script
./run-proxy.sh
```

## Writing content
All articles are [here](backend/data/articles).