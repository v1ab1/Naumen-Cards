import os
from flask import Flask, flash, request, redirect, url_for, send_file
from werkzeug.utils import secure_filename
import json

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/img'


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def hello():
    return "Hello World!"


@app.route('/register', methods=['POST'])
def register():
    login = request.args['login']
    password = request.args['password']
    with open("static/users.json", "r") as jsonFile:
        data = json.load(jsonFile)
    if login in data:
        return "409"
    data[login] = password
    with open("static/users.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    with open("static/items.json", "r") as jsonFile:
        data = json.load(jsonFile)
    data[login] = []
    with open("static/items.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    with open("static/coins.json", "r") as jsonFile:
        data = json.load(jsonFile)
    data[login] = 1000
    with open("static/coins.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    with open("static/friends.json", "r") as jsonFile:
        data = json.load(jsonFile)
    data[login] = []
    with open("static/friends.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    return "200"


@app.route('/get_market', methods=['GET'])
def get_market():
    with open("static/market.json", "r") as jsonFile:
        data = json.load(jsonFile)
    return json.dumps(data['market'])


@app.route('/login', methods=['GET'])
def login():
    login = request.args['login']
    password = request.args['password']
    with open("static/users.json", "r") as jsonFile:
        data = json.load(jsonFile)
    if login in data:
        if data[login] == password:
            return "200"
    return "401"


@app.route('/upload_item', methods=['POST'])
def upload_item():
    login = request.args['login']
    name = request.args['name']
    description = request.args['description']
    #picture
    with open("static/items.json", "r") as jsonFile:
        data = json.load(jsonFile)
    with open("static/id.txt", "r") as txtFile:
        id = int(txtFile.readline())
    with open("static/coins.json", "r") as jsonFile:
        data_coins = json.load(jsonFile)
    data_coins[login] -= 1
    id += 1
    item = {"id": id,
            "title": name,
            "description": description}
    data[login].append(item)
    with open("static/items.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    with open("static/id.txt", "w") as txtFile:
        txtFile.write(str(id))
    with open("static/coins.json", "w") as jsonFile:
        json.dump(data_coins, jsonFile)
    return "200"


@app.route('/buy_item', methods=['POST'])
def buy_item():
    login = request.args['login']
    id = request.args['id']
    with open("static/market.json", "r") as jsonFile:
        data = json.load(jsonFile)
    with open("static/coins.json", "r") as jsonFile:
        data_coins = json.load(jsonFile)
    with open("static/items.json", "r") as jsonFile:
        data_items = json.load(jsonFile)
    found = False
    item = {}
    for i in range(len(data['market'])):
        if data['market'][i]['id'] == int(id):
            item = data['market'][i]
            found = True
            del data['market'][i]
            break
    if not found:
        return "404"
    if int(data_coins[login]) >= int(item['price']):
        data_coins[login] = int(data_coins[login]) - int(item['price'])
        data_coins[item['owner']] = int(data_coins[item['owner']]) + int(item['price'])
        del item['owner']
        del item['price']
        data_items[login].append(item)
        with open("static/market.json", "w") as jsonFile:
            json.dump(data, jsonFile)
        with open("static/coins.json", "w") as jsonFile:
            json.dump(data_coins, jsonFile)
        with open("static/items.json", "w") as jsonFile:
            json.dump(data_items, jsonFile)
        return "200"
    else:
        return "403"


@app.route('/sell_item', methods=['POST'])
def sell_item():
    login = request.args['login']
    id = request.args['id']
    price = request.args['price']
    with open("static/items.json", "r") as jsonFile:
        data = json.load(jsonFile)
    found = False
    item = {}
    for i in range(len(data[login])):
        if data[login][i]['id'] == int(id):
            item = data[login][i]
            found = True
            del data[login][i]
            break
    if not found:
        return "404"
    item['owner'] = login
    item['price'] = price
    with open("static/market.json", "r") as jsonFile:
        data_market = json.load(jsonFile)
    data_market['market'].append(item)
    with open("static/market.json", "w") as jsonFile:
        json.dump(data_market, jsonFile)
    with open("static/items.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    return "200"


@app.route('/get_friends', methods=['GET'])
def get_friends():
    login = request.args['login']
    with open("static/friends.json", "r") as jsonFile:
        data = json.load(jsonFile)
    return json.dumps(data[login])


@app.route('/return_item', methods=['POST'])
def return_item():
    login = request.args['login']
    id = request.args['id']
    with open("static/market.json", "r") as jsonFile:
        data = json.load(jsonFile)
    found = False
    item = {}
    for i in range(len(data['market'])):
        if data['market'][i]['id'] == int(id):
            if data['market'][i]['owner'] == login:
                item = data['market'][i]
                found = True
                del data['market'][i]
                break
            else:
                return "403"
    if not found:
        return "404"
    with open("static/items.json", "r") as jsonFile:
        data_items = json.load(jsonFile)
    del item['owner']
    del item['price']
    data_items[login].append(item)
    with open("static/market.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    with open("static/items.json", "w") as jsonFile:
        json.dump(data_items, jsonFile)
    return "200"


@app.route('/send_item', methods=['POST'])
def send_item():
    login = request.args['login']
    id = request.args['id']
    to = request.args['to']
    with open("static/items.json", "r") as jsonFile:
        data = json.load(jsonFile)
    if to not in data:
        return "404"
    found = False
    item = ['None']
    for i in range(len(data[login])):
        if data[login][i]['id'] == int(id):
            item = data[login][i]
            found = True
            del data[login][i]
            break
    if not found:
        return "404"
    data[to].append(item)
    with open("static/items.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    return "200"


@app.route('/get_items', methods=['GET'])
def get_items():
    login = request.args['login']
    with open("static/items.json", "r") as jsonFile:
        data = json.load(jsonFile)
    return json.dumps(data[login])


@app.route('/add_friend', methods=['POST'])
def add_friend():
    login = request.args['login']
    friend = request.args['friend']
    with open("static/friends.json", "r") as jsonFile:
        data = json.load(jsonFile)
    with open("static/users.json", "r") as jsonFile:
        data_users = json.load(jsonFile)
    if friend not in data_users:
        return "404"
    if friend in data[login]:
        return "403"
    data[login].append(friend)
    with open("static/friends.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    return "200"

@app.route('/get_coins', methods=['GET'])
def get_coins():
    login = request.args['login']
    with open("static/coins.json", "r") as jsonFile:
        data = json.load(jsonFile)
    return json.dumps(data[login])


@app.route('/delete_friend', methods=['POST'])
def delete_friend():
    login = request.args['login']
    friend = request.args['friend']
    with open("static/friends.json", "r") as jsonFile:
        data = json.load(jsonFile)
    if friend not in data[login]:
        return "404"
    else:
        index = data[login].index(friend)
        del data[login][index]
    with open("static/friends.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    return "200"

@app.route('/get_image', methods=['GET'])
def get_image():
    folder = request.args['object']

    return send_file("static/img/logitech.jpg")


@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return "200"
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''


app.run(host="172.20.10.9")