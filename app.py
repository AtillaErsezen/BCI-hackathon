from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Replace 'your_omdb_api_key_here' with your actual OMDB API key
OMDB_API_KEY = 'dec6492a'

# Function to get movie recommendations from OMDB based on keywords
def get_movie_recommendations(keyword):
    url = f"http://www.omdbapi.com/?apikey={OMDB_API_KEY}&s={keyword}&type=movie"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if 'Search' in data:
            return data['Search']  # Return the list of movies
        else:
            return []  # No results found
    else:
        return []

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle movie recommendations based on keyword search
@app.route('/recommend', methods=['POST'])
def recommend():
    keyword = request.form['keyword']
    movies = get_movie_recommendations(keyword)
    return jsonify(movies)

if __name__ == '__main__':
    app.run(debug=True)
