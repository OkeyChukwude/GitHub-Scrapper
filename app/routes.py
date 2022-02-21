from flask import jsonify, request, abort, make_response
from app import app
from .scrapper import scrapper

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/')
def index():
    return app.send_static_file('home.html')

@app.route('/scrapper/<string:username>', methods=['GET'])
def scrape(username):
    if username == '':
        abort(400)

    scrapper_response = scrapper(username)
    if (scrapper_response['message'] == 'success'):
        return jsonify(scrapper_response['data'])
    
    return jsonify(scrapper_response['message'])