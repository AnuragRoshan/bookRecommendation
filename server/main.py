import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask import Flask, request, jsonify

# Load the dataset
books = pd.read_csv("data.csv", sep=",", encoding="latin-1")

# Select relevant columns
books = books[['isbn', 'name', 'description', 'author', 'age', 'published']]

# Fill NaN values with an empty string
books['description'] = books['description'].fillna('')

# Create a function to process the 'age' column
def process_age(age):
    try:
        min_age, max_age = map(int, age.split(' '))
        return min_age, max_age
    except ValueError:
        return 0, 0  # Return default values for invalid age

# Apply the process_age function to the 'age' column
books['min_age'], books['max_age'] = zip(*books['age'].apply(process_age))

# Create a new column 'text_features' combining relevant columns
books['text_features'] = books['name'] + ' ' + books['description'] + ' ' + books['author']

# Initialize the TfidfVectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words='english')

# Fit and transform the text features
tfidf_matrix = tfidf_vectorizer.fit_transform(books['text_features'])

# Compute the cosine similarity matrix
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# Initialize Flask
app = Flask(__name__)

# Create a function to get content-based recommendations
def get_content_based_recommendations(book_name, cosine_sim=cosine_sim):
    # Get the index of the book with the given name
    book_index = books.index[books['name'] == book_name].tolist()
    
    if not book_index:
        return jsonify({"error": "Book not found in the dataset."})

    book_index = book_index[0]

    # Get the pairwise similarity scores of all books with the given book
    sim_scores = list(enumerate(cosine_sim[book_index]))

    # Sort the books based on similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the book indices of the top recommendations
    top_book_indices = [i[0] for i in sim_scores[1:6]]

    # Return the recommended books in JSON format
    recommendations = books.iloc[top_book_indices][['isbn', 'name', 'author', 'age']]
    return recommendations.to_json(orient='records')

# Define a route for the API
@app.route('/get_recommendations', methods=['GET'])
def recommend_books():
    book_name = request.args.get('book_name', default='', type=str)
    return get_content_based_recommendations(book_name)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
