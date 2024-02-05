import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify

# Load the data from the CSV file
data = pd.read_csv('ratings.csv')

# Create a user-item matrix
user_item_matrix = data.pivot_table(index='username', columns='isbn', values='rating').fillna(0)

# Calculate item-item similarity using cosine similarity
item_similarity = cosine_similarity(user_item_matrix.T)

# Initialize Flask
app = Flask(__name__)

def get_item_based_recommendations(input_isbn, num_recommendations=5):
    if input_isbn not in user_item_matrix.columns:
        return jsonify({"error": f"Book with ISBN {input_isbn} not found in the dataset."})

    book_index = list(user_item_matrix.columns).index(input_isbn)

    sim_scores = list(enumerate(item_similarity[book_index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    top_book_indices  = [i[0] for i in sim_scores[1:num_recommendations+1]]

    # Convert ISBNs to integers
    recommended_books = user_item_matrix.columns[top_book_indices].astype(int)
    return recommended_books

# Define a route for the API
@app.route('/get_collab_recommendations', methods=['GET'])
def recommend_books():
    isbn = request.args.get('book_name', default='', type=str)
    
    try:
        isbn = int(isbn)
    except ValueError:
        return jsonify({"error": "Invalid ISBN provided."})

    recommendations = get_item_based_recommendations(isbn)

    # Convert the recommendations to a list
    recommended_books_list = recommendations.tolist()

    # Return the recommended books in JSON format
    data =jsonify({"recommended_books": recommended_books_list})
    return data


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
