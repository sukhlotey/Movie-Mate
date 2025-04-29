function submit_rating(movie_name) {
    const rating = document.getElementById('rating').value;
    if (!rating) {
        alert('Please select a rating.');
        return;
    }
    fetch('/api/method/movie_mate.api.submit_rating', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Frappe-CSRF-Token': frappe.csrf_token
        },
        body: JSON.stringify({
            movie_name: movie_name,
            rating: parseInt(rating)
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Rating submitted successfully!');
            location.reload();
        } else {
            alert('Error submitting rating.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting rating.');
    });
}
