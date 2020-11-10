[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# satsang-backend

satsang-backend

## setup

write a .env file with your postgres username and password
```
POSTGRES_USER=username
POSTGRES_PASSWORD=password123
```

build the docker image and then compose up.

```
docker build -t satsang-backend . -f app.dockerfile
docker-compose up
```