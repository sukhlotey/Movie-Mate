import frappe

def get_context(context):
    # Get the movie name from the URL (e.g., /movie/20)
    movie_name = frappe.form_dict.name
    if not movie_name:
        frappe.throw("Movie not found", frappe.NotFound)

    # Debug: Log the movie_name
    frappe.log_error(f"Fetching movie: {movie_name}")

    # Fetch the Movie document
    movie = frappe.get_doc('Movie', movie_name)
    if not movie:
        frappe.throw("Movie not found", frappe.NotFound)

    # Debug: Log minimal movie data
    frappe.log_error(f"Movie: {movie_name}, Title: {movie.get('title')}")

    # Populate context with movie data
    # Use dictionary access to handle both Document and dict cases
    context.title = movie.get('title') or getattr(movie, 'title', '')
    context.poster_image = movie.get('poster_image') or getattr(movie, 'poster_image', '')
    context.genre = movie.get('genre') or getattr(movie, 'genre', '')
    context.release_year = movie.get('release_year') or getattr(movie, 'release_year', '')
    context.imdb_rating = movie.get('imdb_rating') or getattr(movie, 'imdb_rating', '')
    context.director = movie.get('director') or getattr(movie, 'director', '')
    context.country = movie.get('country') or getattr(movie, 'country', '')
    context.status = movie.get('status') or getattr(movie, 'status', '')
    context.description = movie.get('description') or getattr(movie, 'description', '')
    context.average_rating = movie.get('average_rating') or getattr(movie, 'average_rating', '')
    context.name = movie.get('name') or getattr(movie, 'name', '')
