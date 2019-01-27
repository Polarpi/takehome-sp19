from typing import Tuple

from flask import Flask, jsonify, request, Response
import mockdb.mockdb_interface as db

app = Flask(__name__)


def create_response(
    data: dict = None, status: int = 200, message: str = ""
) -> Tuple[Response, int]:
    """Wraps response in a consistent format throughout the API.

    Format inspired by https://medium.com/@shazow/how-i-design-json-api-responses-71900f00f2db
    Modifications included:
    - make success a boolean since there's only 2 values
    - make message a single string since we will only use one message per response
    IMPORTANT: data must be a dictionary where:
    - the key is the name of the type of data
    - the value is the data itself

    :param data <str> optional data
    :param status <int> optional status code, defaults to 200
    :param message <str> optional message
    :returns tuple of Flask Response and int, which is what flask expects for a response
    """
    if type(data) is not dict and data is not None:
        raise TypeError("Data should be a dictionary 😞")

    response = {
        "code": status,
        "success": 200 <= status < 300,
        "message": message,
        "result": data,
    }
    return jsonify(response), status


"""
~~~~~~~~~~~~ API ~~~~~~~~~~~~
"""


@app.route("/")
def hello_world():
    return create_response({"content": "hello world!"})


@app.route("/mirror/<name>")
def mirror(name):
    data = {"name": name}
    return create_response(data)


@app.route("/shows", methods=['GET'])
def get_all_shows():
    if request.args.get('minEpisodes') is None:
        return create_response({"shows": db.get('shows')})
    return create_response({"shows": db.getMinEpisodes('shows', int(request.args.get('minEpisodes')))})


@app.route("/shows/<id>", methods=['DELETE'])
def delete_show(id):
    if db.getById('shows', int(id)) is None:
        return create_response(status=404, message="No show with this id exists")
    db.deleteById('shows', int(id))
    return create_response(message="Show deleted")


# TODO: Implement the rest of the API here!
@app.route("/shows/<id>", methods=['GET'])
def get_show_by_id(id):
    if db.getById('shows', int(id)) is None:
        return create_response(status=404, message="No show with this id exists")
    return create_response({'show': db.getById('shows', int(id))})


@app.route("/shows", methods=['POST'])
def post_show():
    name = request.get_json().get('name')
    episodes_seen = request.get_json().get('episodes_seen')

    if name is None or episodes_seen is None:
        return create_response(status=422, message="Required parameters to create a show not provided")
    return create_response({"shows": db.create("shows", request.get_json())}, status=201)


@app.route("/shows/<id>", methods=['POST'])
def update_show(id):
    name = request.get_json().get('name')
    episodes_seen = request.get_json().get('episodes_seen')
    if db.getById('shows', int(id)) is None:
        return create_response(status=404, message="No show with this id exists")
    if name is None or episodes_seen is None:
        return create_response(status=422, message="Required parameters to update a show not provided")
    return create_response({"shows": db.updateById("shows", int(id), request.get_json())}, status=201)


"""
~~~~~~~~~~~~ END API ~~~~~~~~~~~~
"""
if __name__ == "__main__":
    app.run(port=8080, debug=True)
