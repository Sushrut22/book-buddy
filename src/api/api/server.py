from collections import defaultdict
from flask import Flask, request, jsonify, Response
import pandas as pd
import numpy as np
import pickle
import json
from dotenv import load_dotenv, find_dotenv
import os
from pymongo import MongoClient

load_dotenv(find_dotenv())
password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://sushrut22:{password}@cluster0.vovo9kl.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connection_string)

user_ratings_db = client.bookstore.user_ratings
read_list_db = client.bookstore.read_list

app = Flask(__name__)

books_600_data = pd.read_csv(
    "src/api/api/new.csv")
books_600_data["weighted_rating_temp"] = np.nan

genre_to_order = {}
with open("src/api/api/genres_order.txt", "r") as f:
    order_to_genre = f.readlines()
for i in range(len(order_to_genre)):
    order_to_genre[i] = order_to_genre[i].replace("\n", "")

booktitle = []
with open('src/api/api/booktitle_chatbot.txt', 'r', encoding='utf-8') as f:
    booktitle = f.readlines()
for i in range(len(booktitle)):
    booktitle[i] = booktitle[i].replace("\n", "")

with open('src/api/api/matrix_clb_ftr.pkl', 'rb') as file:
    matrix_clb_ftr = pickle.load(file)

isbn_to_order = {}
with open("src/api/api/order_clb_ftr.txt", "r") as f:
    order_to_isbn = f.readlines()
for i in range(len(order_to_isbn)):
    order_to_isbn[i] = order_to_isbn[i].replace("\n", "")

for i in range(len(order_to_isbn)):
    isbn_to_order[order_to_isbn[i]] = i

with open('src/api/api/genre_matrix.pkl', 'rb') as file:
    genre_matrix = pickle.load(file)

# ----------------------------------------------------------------------------


@app.route('/get_order', methods=['POST'])
def collaborative_recommendations():
    try:
        global books_600_data
        data = request.get_json()
        userid = data["userid"]
        books_rated = user_ratings_db.find({"userid": userid})
        user_ratings = np.zeros((600,))
        s = set()
        for books in books_rated:
            isbn = books["isbn"]
            rating = books["rating"]
            try:
                rating = int(rating)
            except:
                rating = 0
            s.add(isbn)
            user_ratings[isbn_to_order[isbn]] = rating-2.5
        if len(s) == 0:
            json_str = books_600_data.to_json(orient='records')
            return Response(response=json_str, status=200, mimetype="application/json")

        result = np.dot(matrix_clb_ftr, user_ratings)
        mapper = [(result[i], i) for i in range(600)]
        mapper.sort(reverse=True)

        for i, j in mapper:
            if order_to_isbn[j] in s:
                i = 0
            books_600_data.loc[books_600_data["ISBN"] ==
                               order_to_isbn[j], "weighted_rating_temp"] = i

        books_600_data_temp = books_600_data.sort_values(
            by="weighted_rating_temp", ascending=False)

        df_without_rating = books_600_data_temp.drop(
            'weighted_rating_temp', axis=1)

        json_str = df_without_rating.to_json(orient='records')

        return Response(response=json_str, status=200, mimetype="application/json")

    except Exception as e:
        return jsonify({'error': str(e)})


# for readlist related operations


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
        userid = data["userid"]
        books_added = read_list_db.find({"userid": userid})
        result = []
        for i in books_added:
            print(i)
            i.pop("_id")
            result.append(i)
        print(len(result))
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

# for rating realted operations


@app.route('/insert_ratings', methods=['POST'])
def add():
    try:
        data = request.get_json()
        try:
            data["rating"] = int(data["rating"])
        except:
            data["rating"] = 0

        user_ratings_db.insert_one(data)

        return jsonify({'status': "OK"})
    except Exception as e:
        return jsonify({'error': str(e), "status": "NOT INSERTED"})


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


@app.route('/chat', methods=['POST'])
def index():
    data = request.get_json()
    intent = data['queryResult']['intent']['displayName']

    # # depends on intent everything now
    if intent == "Recommend-book-name":
        bookname = data['queryResult']['parameters']['book-name']
        return jsonify(book_based(bookname))
    elif intent == "Recommend-Genre":
        genre = data['queryResult']['parameters']['genre']
        res = genre_based(genre)
        return jsonify(res)


def genre_based(s):
    like = np.zeros((982,))
    for i in s:
        like[genre_to_order[i]] = 1

    ans = np.dot(genre_matrix, like)

    l = []
    a = {}
    for i in range(len(ans)):
        l.append((ans[i], i))
    l.sort(reverse=True)
    fulfillmentText = "Here are few book recommendations just for you: \n"
    for i, j in l[:5]:
        fulfillmentText += booktitle[j]
        fulfillmentText += ", "
    fulfillmentText = fulfillmentText[:-2]
    fulfillmentText += '.'

    return {
        "fulfillmentText": fulfillmentText
    }


def book_based(name):
    global books_600_data
    try:
        user_ratings = np.zeros((600,))
        s = set()
        for i in range(len(books_600_data)):
            if books_600_data["bookTitle"].iloc[i] in name:
                isbn = books_600_data["ISBN"].iloc[i]
                s.add(isbn)
                user_ratings[isbn_to_order[isbn]] = 1

        result = np.dot(matrix_clb_ftr, user_ratings)
        mapper = [(result[i], i) for i in range(600)]
        mapper.sort(reverse=True)

        for i, j in mapper:
            if order_to_isbn[j] in s:
                i = 0
            books_600_data.loc[books_600_data["ISBN"] ==
                               order_to_isbn[j], "weighted_rating_temp"] = i

        books_600_data_temp = books_600_data.sort_values(
            by="weighted_rating_temp", ascending=False)

        fulfillmentText = "Here are few book recommendations just for you: \n"

        for i in range(5):
            title = books_600_data_temp["bookTitle"].iloc[i]
            if i == 4:
                fulfillmentText += " "+title+"."
            else:
                fulfillmentText += " "+title+","

        return {
            "fulfillmentText": fulfillmentText
        }
    except Exception as e:
        print(f"Error: {e}")
        return Response(status=500)


if __name__ == "__main__":
    try:
        app.run(debug=True, port=5000)
    except Exception as e:
        print(f"Error: {e}")
