# Simple Task Management service


## Instalation

* create and enable a virtual environment

```bash
$ python3 -m venv venv
$ . venv/bin/activate
```

* install `poetry`

```bash
$ pip install -U pip setuptools wheel
$ pip install -U poetry
```

* install the project dependencies

```bash
$ poetry install
```


## Configuration

The configuration can be loaded from a file or through environment variables.
The `config` module will look for and load the environment variables first. If
not found then it will search for a file named `.env` in the path the project
was started (usually the project root directory). If a configuration is not set
the default value defined in the `config` module will be used.

The app should be setup to connect to a PostgreSQL database.

#### Configuration options

- `DB_DRIVER`; default: `postgresql`
- `DB_HOST`; default: `None`
- `DB_PORT`; default: `None`
- `DB_USER`; default: `None`
- `DB_PASSWORD`; default: `None`
- `DB_DATABASE`; default: `None`
- `DB_DSN`; default: `<DB_DRIVER>://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/<DB_DATABASE>`
- `DB_POOL_MIN_SIZE`; default: `1`
- `DB_POOL_MAX_SIZE`; default: `16`
- `DB_ECHO`; default: `False`
- `DB_SSL`; default: `None`
- `DB_USE_CONNECTION_FOR_REQUEST`; default: `True`
- `DB_RETRY_LIMIT`; default: `1`
- `DB_RETRY_INTERVAL`; default: `1`


## Run the service for development

* export the configuration variables as needed
* ensure the database has been migrated to the later version
* invoke `uvicorn`

```bash
$ DB_HOST=localhost DB_USER=postgres DB_PASSWORD=mysecretpassword poetry run alembic upgrade head
$ DB_HOST=localhost DB_USER=postgres DB_PASSWORD=mysecretpassword poetry run uvicorn fastapi_demo.asgi:app --reload
```


## Run the service for production

* export the configuration variables as needed
* ensure the database has been migrated to the later version
* invoke `gunicorn` with `uvicorn`-based workers

```bash
$ export DB_HOST=localhost
$ export DB_USER=postgres
$ export DB_PASSWORD=mysecretpassword
$ poetry run alembic upgrade head
$ poetry run gunicorn fastapi_demo.asgi:app -b 127.0.0.1:8000 -k uvicorn.workers.UvicornWorker
```


## Manage tasks API

_see, also the `/docs` endpoint_


#### Create new task

Create a new task with the given title, description and due-date.

* example using `curl`

```bash
$ curl -X POST 'http://127.0.0.1:8000/tasks/' title="Buy milk" desc="go to the supermarket on the way home" due="2021-12-01"
{"due_date":"2021-12-01","description":"go to the supermarket on the way home","title":"Buy milk","id":5}
```

* example using [`httpie`](https://httpie.io/cli)

```bash
$ http POST 'http://127.0.0.1:8000/tasks/' title="Buy milk" desc="go to the supermarket on the way home" due="2021-12-01"
HTTP/1.1 200 OK
content-length: 105
content-type: application/json
date: Fri, 12 Nov 2099 14:09:46 GMT
server: uvicorn

{
    "description": "go to the supermarket on the way home",
    "due_date": "2021-12-01",
    "id": 6,
    "title": "Buy milk"
}
```

#### Get single task

Get the information about a single task

```bash
$ http GET 'http://127.0.0.1:8000/tasks/6'
HTTP/1.1 200 OK
content-length: 105
content-type: application/json
date: Fri, 12 Nov 2099 14:10:14 GMT
server: uvicorn

{
    "description": "go to the supermarket on the way home",
    "due_date": "2021-12-01",
    "id": 6,
    "title": "Buy milk"
}
```

#### Get all tasks

Get the information about all tasks

```bash
$ http GET 'http://127.0.0.1:8000/tasks'
http GET 'http://127.0.0.1:8000/tasks/'
HTTP/1.1 200 OK
content-length: 333
content-type: application/json
date: Fri, 12 Nov 2099 14:10:31 GMT
server: uvicorn

[
    {
        "desc": "go to the supermarket on the way home",
        "due": "2021-12-01",
        "title": "Buy milk"
    },
    {
        "desc": "go to the supermarket on the way home",
        "due": "2021-12-01",
        "title": "Buy milk"
    }
]
```

#### Delete a task

Delete the task with id 4

```bash
$ http DELETE 'http://127.0.0.1:8000/tasks/4'
HTTP/1.1 200 OK
content-length: 8
content-type: application/json
date: Fri, 12 Nov 2099 00:35:30 GMT
server: uvicorn

{
    "id": 4
}
```
