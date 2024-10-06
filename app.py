from flask import Flask, render_template, request
import requests
import random

app = Flask(__name__)

# TMDB API key
API_KEY = 'b029b76cd8563686df3f7f986822b8a5'

# Base URL for TMDB API
BASE_URL = 'https://api.themoviedb.org/3'


def get_movie_recommendations(genre):
    # Get the genre list to find genre id
    genre_url = f'{BASE_URL}/genre/movie/list?api_key={API_KEY}&language=en-US'
    genre_response = requests.get(genre_url)
    genres = genre_response.json().get('genres', [])

    # Find the genre ID from the provided genre name
    genre_id = None
    for g in genres:
        if g['name'].lower() == genre.lower():
            genre_id = g['id']
            break

    if not genre_id:
        return []

    # First, get the total number of pages for this genre
    url = f'{BASE_URL}/discover/movie?api_key={API_KEY}&with_genres={genre_id}&language=en-US'
    initial_response = requests.get(url)
    total_pages = initial_response.json().get('total_pages', 1)

    # Choose a random page
    random_page = random.randint(1, min(total_pages, 500))  # TMDB limits to 500 pages max

    # Fetch movies from the random page
    random_url = f'{BASE_URL}/discover/movie?api_key={API_KEY}&with_genres={genre_id}&language=en-US&page={random_page}'
    response = requests.get(random_url)
    movies = response.json().get('results', [])

    return movies


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        genre = request.form['genre']
        movies = get_movie_recommendations(genre)
        return render_template('index.html', movies=movies, genre=genre)
    
    return render_template('index.html', movies=[], genre='')


if __name__ == '__main__':
    app.run(debug=True)
