import frappe

def get_context(context):
    movie_name = frappe.form_dict.get("name")
    if not movie_name:
        frappe.throw("Movie not found", frappe.NotFound)

    movie = frappe.get_doc("Movie", movie_name)
    context.title = movie.title
    context.genre = movie.genre
    context.release_year = movie.release_year
    context.imdb_rating = movie.imdb_rating
    context.director = movie.director
    context.country = movie.country
    context.status = movie.status
    context.description = movie.description
    context.poster_image = movie.poster_image
    context.name = movie.name
    context.average_rating = movie.get_average_rating()  # Adjust if method differs
