from flask import Flask, request, jsonify, Response
import pandas as pd
import numpy as np
import pickle
import json
from dotenv import load_dotenv, find_dotenv
import os
from bson.json_util import dumps
from pymongo import MongoClient

load_dotenv(find_dotenv())
password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://sushrut22:{password}@cluster0.vovo9kl.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connection_string)
user_ratings_db = client.bookstore.user_ratings
read_list_db = client.bookstore.read_list
app = Flask(__name__)

books_600_data = pd.read_csv(
    "booklib-app-using-react-js-and-openlib-api/src/api/api/new.csv")
books_600_data["weighted_rating"] = np.nan

with open('booklib-app-using-react-js-and-openlib-api/src/api/api/matrix_clb_ftr.pkl', 'rb') as file:
    matrix_clb_ftr = pickle.load(file)

isbn_to_order = {}
with open("booklib-app-using-react-js-and-openlib-api/src/api/api/order_clb_ftr.txt", "r") as f:
    order_to_isbn = f.readlines()
for i in range(len(order_to_isbn)):
    order_to_isbn[i] = order_to_isbn[i].replace("\n", "")


for i in range(len(order_to_isbn)):
    isbn_to_order[order_to_isbn[i]] = i

# ----------------------------------------------------------------------------


@app.route("/")
def hello_world():
    return "<h1>Hello, World!</h1>"


@app.route('/get_order', methods=['POST'])
def collaborative_recommendations():
    try:
        data = request.get_json()
        userid = data["userid"]
        books_rated = user_ratings_db.find({"userid": userid})

        user_ratings = np.zeros((600,))
        s = set()
        for books in books_rated:
            isbn = books["isbn"]
            rating = books["rating"]
            s.add(isbn)
            user_ratings[isbn_to_order[isbn]] = rating-2.5

        result = np.dot(matrix_clb_ftr, user_ratings)
        mapper = [(result[i], i) for i in range(600)]
        mapper.sort(reverse=True)
        global books_600_data
        for i, j in mapper:
            if order_to_isbn[j] in s:
                i = 0
            books_600_data.loc[books_600_data["ISBN"] ==
                               order_to_isbn[j], "weighted_rating"] = i

        books_600_data = books_600_data.sort_values(
            by="weighted_rating", ascending=False)

        df_without_rating = books_600_data.drop('weighted_rating', axis=1)

        json_str = df_without_rating.to_json(orient='records')

        return Response(response=json_str, status=200, mimetype="application/json")

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/similar_books', methods=['POST'])
def similar_recommendations():
    try:
        data = request.get_json()
        name = data["Name"]
        isbn = -1
        for i in range(len(books_600_data)):
            if books_600_data["bookTitle"].iloc[i] == name:
                isbn = books_600_data["ISBN"].iloc[i]
                break

        similarities = matrix_clb_ftr[isbn_to_order[isbn]]

        l = []
        for i in range(len(similarities)):
            l.append((similarities[i], i))
        l.sort(reverse=True)

        isbns = []
        for i, j in l[1:6]:
            isbns.append(order_to_isbn[j])

        names = []
        for i in range(len(books_600_data)):
            if books_600_data["ISBN"].iloc[i] in isbns:
                names.append(
                    {"isbn": books_600_data["ISBN"].iloc[i],
                     "title": books_600_data["bookTitle"].iloc[i],
                     "img_url": books_600_data["imageUrlL"].iloc[i],
                     "new_id": books_600_data["new_id"].iloc[i],
                     "publisher": books_600_data["publisher"].iloc[i],
                     "bookAuthor": books_600_data["bookAuthor"].iloc[i]})

        return jsonify(names)

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/insert_ratings', methods=['POST'])
def add():
    try:
        data = request.get_json()
        user_ratings_db.insert_one(data)
        print(data)
        return jsonify({'status': "OK"})
    except Exception as e:
        return jsonify({'error': str(e), "status": "NOT INSERTED"})


@app.route('/add_readbook', methods=['POST'])
def add_book():
    try:
        data = request.get_json()
        userid = data["userid"]
        ISBN = data["isbn"]

        existing_book = read_list_db.find_one(
            {"userid": userid, "isbn": ISBN})
        if existing_book:
            return Response("Book already exists in the read list.", status=400)

        read_list_db.insert_one(data)
        return jsonify({'status': "OK"})
    except Exception as e:
        print(f"Error: {e}")
        return Response(status=500)


@app.route('/list_readbooks', methods=['POST'])
def get_book_list():
    try:
        data = request.get_json()
        print(data)
        userid = data["userid"]
        books_added = read_list_db.find({"userid": userid})
        result = []
        for i in books_added:
            i.pop("_id")
            result.append(i)
        print(result)
        return jsonify(result)
    except Exception as e:
        print(f"Error: {e}")
        return Response(status=500)


@app.route('/delete_readbook', methods=['POST'])
def delete_book():
    try:
        data = request.get_json()
        userid = data["userid"]
        ISBN = data["isbn"]

        existing_book = read_list_db.find_one(
            {"userid": userid, "isbn": ISBN})
        if existing_book:
            read_list_db.delete_one({"userid": userid, "isbn": ISBN})
            return Response(status=200)
        else:
            return Response("Book not found in the read list.", status=404)
    except Exception as e:
        print(f"Error: {e}")
        return Response(status=500)


@app.route('/list_ratedbooks', methods=['POST'])
def get_list():
    try:
        data = request.get_json()
        userid = data["userid"]
        books_added = user_ratings_db.find({"userid": userid})

        result = []
        for i in books_added:
            i.pop("_id")
            result.append(i)

        return jsonify(result)
    except Exception as e:
        print(f"Error: {e}")
        return Response(status=500)


@app.route('/delete_ratedbook', methods=['POST'])
def delete():
    try:
        data = request.get_json()
        userid = data["userid"]
        ISBN = data["isbn"]

        existing_book = user_ratings_db.find_one(
            {"userid": userid, "isbn": ISBN})
        if existing_book:
            user_ratings_db.delete_one({"userid": userid, "isbn": ISBN})
            return Response(status=200)
        else:
            return Response("Book not found in the read list.", status=404)
    except Exception as e:
        print(f"Error: {e}")
        return Response(status=500)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
