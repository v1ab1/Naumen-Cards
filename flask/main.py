import os
from flask import Flask, request, send_file
from werkzeug.utils import secure_filename
import json
from heic2png import HEIC2PNG
from PIL import Image

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'heic'}

app = Flask(__name__)
IMG_FOLDER = '/static/img'
app.config['UPLOAD_FOLDER'] = './static/img'


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def open_json(filename):
    with open("static/" + filename, "r") as jsonFile:
        data = json.load(jsonFile)
    return data


def write_json(data, filename):
    with open("static/" + filename, "w") as jsonFile:
        json.dump(data, jsonFile)


def find_id(data, id, name):
    for i in range(len(data[name])):
        if data[name][i]['id'] == int(id):
            item = data[name][i]
            del data[name][i]
            return item, data
    return "404", "404"


def upload_photo(file, name):
    start = file.filename.split('.')[0]
    ending = file.filename.split('.')[1].lower()
    file.filename = start + "." + ending
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        end = filename.split('.')[1]
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], str(name)) + "." + end)
        if end == 'heic':
            heic_img = HEIC2PNG('static/img/' + str(name) + "." + end)
            heic_img.save()
            os.remove("static/img/" + str(name) + "." + end)
            end = 'png'
        foo = Image.open('static/img/' + str(name) + "." + end)
        if end == 'png':
            foo = foo.convert('RGB')
        foo.save('static/img/' + str(name) + ".jpg", optimize=True, quality=50)
        os.remove('static/img/' + str(name) + '.png')


@app.route('/register', methods=['POST'])
def register():
    login = request.args['login']
    password = request.args['password']
    # telegram = request.args['telegram']
    data = open_json("users.json")
    if login in data:
        return "409"
    data[login] = password
    write_json(data, "users.json")
    data = open_json("items.json")
    data[login] = []
    write_json(data, "items.json")
    data = open_json("coins.json")
    data[login] = 1000
    write_json(data, "coins.json")
    data = open_json("friends.json")
    data[login] = []
    write_json(data, "friends.json")
    # data = open_json("telegrams.json")
    # data[login] = telegram
    # write_json(data, "telegrams.json")
    file = request.files['file']
    upload_photo(file, login)
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
    data = open_json("users.json")
    if login in data:
        if data[login] == password:
            return "200"
    return "401"


@app.route('/upload_item', methods=['POST'])
def upload_item():
    login = request.args['login']
    name = request.args['name']
    description = request.args['description']
    data = open_json("items.json")
    with open("static/id.txt", "r") as txtFile:
        id = int(txtFile.readline())
    data_coins = open_json("coins.json")
    data_coins[login] -= 1
    id += 1
    item = {"id": id,
            "title": name,
            "description": description}
    data[login].append(item)
    write_json(data, "items.json")
    with open("static/id.txt", "w") as txtFile:
        txtFile.write(str(id))
    write_json(data_coins, "coins.json")
    file = request.files['file']
    upload_photo(file, id)
    return "200"


@app.route('/buy_item', methods=['POST'])
def buy_item():
    login = request.args['login']
    id = request.args['id']
    data = open_json("market.json")
    data_coins = open_json("coins.json")
    data_items = open_json("items.json")
    item, data = find_id(data, id, 'market')
    if item == "404":
        return "404"
    if int(data_coins[login]) >= int(item['price']):
        data_coins[login] = int(data_coins[login]) - int(item['price'])
        data_coins[item['owner']] = int(data_coins[item['owner']]) + int(item['price'])
        del item['owner']
        del item['price']
        data_items[login].append(item)
        write_json(data, "market.json")
        write_json(data_coins, "coins.json")
        write_json(data_items, "items.json")
        return "200"
    else:
        return "403"


@app.route('/sell_item', methods=['POST'])
def sell_item():
    login = request.args['login']
    id = request.args['id']
    price = request.args['price']
    data = open_json("items.json")
    item, data = find_id(data, id, login)
    if item == "404":
        return "404"
    item['owner'] = login
    item['price'] = price
    data_market = open_json("market.json")
    data_market['market'].append(item)
    write_json(data_market, "market.json")
    write_json(data, "items.json")
    return "200"


@app.route('/get_friends', methods=['GET'])
def get_friends():
    login = request.args['login']
    data = open_json("friends.json")
    return json.dumps(data[login])


@app.route('/return_item', methods=['POST'])
def return_item():
    login = request.args['login']
    id = request.args['id']
    data = open_json("market.json")
    item, data = find_id(data, id, 'market')
    if item == "404":
        return "404"
    if item['owner'] != login:
        return "403"
    data_items = open_json("items.json")
    del item['owner']
    del item['price']
    data_items[login].append(item)
    write_json(data, "market.json")
    write_json(data_items, "items.json")
    return "200"


@app.route('/send_item', methods=['POST'])
def send_item():
    login = request.args['login']
    id = request.args['id']
    to = request.args['to']
    data = open_json("items.json")
    if to not in data:
        return "404"
    item, data = find_id(data, id, login)
    if item == "404":
        return "404"
    data[to].append(item)
    write_json(data, "items.json")
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
    data = open_json("friends.json")
    data_users = open_json("users.json")
    if friend not in data_users:
        return "404"
    if friend in data[login]:
        return "403"
    data[login].append(friend)
    write_json(data, "friends.json")
    return "200"


@app.route('/get_coins', methods=['GET'])
def get_coins():
    login = request.args['login']
    data = open_json("coins.json")
    return json.dumps(data[login])


@app.route('/delete_friend', methods=['POST'])
def delete_friend():
    login = request.args['login']
    friend = request.args['friend']
    data = open_json("friends.json")
    if friend not in data[login]:
        return "404"
    else:
        index = data[login].index(friend)
        del data[login][index]
    write_json(data, "friends.json")
    return "200"


@app.route('/get_image', methods=['GET'])
def get_image():
    name = request.args['name']
    return send_file("static/img/" + name + ".jpg")


app.run(host="172.20.10.9")
