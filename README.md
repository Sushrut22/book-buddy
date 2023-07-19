# 📚 BookBuddy: Your Reading Companion

BookBuddy is a web application designed to enhance your reading experience by providing personalized book recommendations and a convenient way to manage your reading lists. Whether you're looking for new books to explore or need assistance in organizing your reading journey, BookBuddy has got you covered.

## Features

- 🎯 **Collaborative Filtering:** BookBuddy utilizes a [collaborative filtering model](https://github.com/atharv-patil/book-buddy/blob/main/models.ipynb) to recommend books based on user preferences and interactions. Discover new titles based on the collective wisdom of fellow readers.

- 📖 **Content-Based Recommendations:** BookBuddy also offers [content based recommendations](https://github.com/atharv-patil/book-buddy/blob/main/models.ipynb). Simply mention a book you enjoyed, and our chatbot will provide you with similar book suggestions. Additionally, you can provide your preferred genre, and the chatbot will offer tailored recommendations.

- 🌟 **Popularity-Based Approach:** When you're just starting out or haven't rated any books yet, BookBuddy employs a popularity-based approach inspired by IMDb's top-rated movie formula. This default ordering of books ensures you have a starting point for exploration.

- 📚 **Read List:** Keep track of the books you plan to read using the Read List feature. Add books to your list, view them at any time, and mark them as read once you've completed them.

- ⭐ **Rated Books List:** Rate the books you've read and keep a record of your ratings. The Rated Books List allows you to view and manage your rated books, helping you remember and recommend your favorite reads.

- 🌈 **User-Friendly Interface:** BookBuddy features a user-friendly interface with intuitive navigation and visually appealing design elements. Enjoy a smooth and engaging experience as you explore books and manage your reading journey.

## Technologies Used

- 🚀 Backend: Flask (Python)
- 💾 Database: MongoDB
- ⚛️ Frontend: ReactJS, Material UI
- 🌐 API Integration: Openlibrary API
- 🤖 Chatbot: Dialogflow
- 🔗 Webhook Integration: Flask (for chatbot and backend communication)
- ☁️ Deployment: Ngrok

## Installation

To run BookBuddy locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Sushrut22/book-buddy.git`

2. You need to Install the `genre_matrix.pkl` file for this project here: [link](https://www.mediafire.com/file/6dmz4lb6denms1s/genre_matrix.pkl/file)\
   After installation, put this file in `/src/api/api/` directory.

3. Install the required dependencies for the backend:

   `pip install -r requirements.txt`

4. Set up a MongoDB database and update the connection details in the backend configuration file.

5. Start the backend server:

   `python server.py`

6. Install the required dependencies for the frontend(cd to your project directory) then:

   `npm install`

7. Start the frontend development server:

   `npm start`

8. Access BookBuddy in your web browser at `http://localhost:3000`.

## Usage

1. Create an account or log in to your existing account on BookBuddy `(Optional)`.
2. Explore the Read List section to add books you plan to read. You can mark them as read once you finish them.
3. Rate books you've read and manage your rated books in the Rated Books Section.
4. Use the chatbot to get recommendations based on books you mention or your preferred genres.
5. Discover personalized recommendations in the Recommended List based on collaborative filtering, content-based approaches, and the popularity-based approach.

## Video Demonstration and screenshots

Watch the BookBuddy in action in our video demonstration: [BookBuddy Demo](https://www.youtube.com/watch?v=pdeWZkCaQUQ)
- Screenshots
![image](https://github.com/atharv-patil/book-buddy/assets/83455141/d57ff3c4-255d-4e25-8c61-9d4ee0167f8b)
![image](https://github.com/atharv-patil/book-buddy/assets/83455141/ba8914c9-9629-429e-a523-61f75c802dd9)
![image](https://github.com/atharv-patil/book-buddy/assets/83455141/5e882920-dc9d-4e00-96f8-e518738a95c7)
![image](https://github.com/atharv-patil/book-buddy/assets/83455141/2092f550-1c24-4818-93c3-711fdf3a94f6)
![image](https://github.com/atharv-patil/book-buddy/assets/83455141/d0f17e1d-4625-44c0-9cd8-f8e1345648ff)
![image](https://github.com/atharv-patil/book-buddy/assets/83455141/e568dcf0-0744-471e-8898-5d91877fa138)


## Contributing

Contributions to BookBuddy are welcome! If you encounter any issues or have ideas for improvements, feel free to submit a pull request or open an issue in the repository.

## Collaborators

BookBuddy was created by:

- [@Sushrut22](https://github.com/Sushrut22) (Sushrut Lachure)
- [@atharv-patil](https://github.com/atharv-patil) (Atharv Patil)
- [@varshil27](https://github.com/varshil27) (Varshil Kavathiya)
