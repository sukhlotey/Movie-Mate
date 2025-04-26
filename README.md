# Frappe-Movie-app

## Frappe and Bench Installation Guide

This guide provides step-by-step instructions for installing Frappe and Bench on **Ubuntu Linux** and on **Windows using a Virtual Machine (VM)** with Ubuntu.

---

## Installation on Ubuntu Linux

### Prerequisites
- Ubuntu 20.04 or later
- Root or sudo access
- Internet connection

### Step 1: Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install Dependencies
Install required packages:
```bash
sudo apt install git python-is-python3 python3-dev python3-pip redis-server libmariadb-dev mariadb-server mariadb-client pkg-config
```
### Step 5: Configure MariaDB

During this installation you'll be prompted to set the MySQL root password. If you are not prompted, you'll have to initialize the MySQL server setup yourself. You can do that by running the command:

**Remember: only run it if you're not prompted the password during setup.**

```bash
mariadb-secure-installation
```
Restart MariaDB:
```bash
sudo systemctl restart mariadb
```
### Step 3: Install Node
We recommend installing node using _nvm_
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install --lts
```

### Step 4: Install Yarn
```bash
sudo npm install -g yarn
```

### Step 6: Install wkhtmltopdf
```bash
sudo apt install xvfb libfontconfig
```
Download and install wkhtmltopdf package from [https://wkhtmltopdf.org/downloads.html](https://wkhtmltopdf.org/downloads.html), then run this command to install the package.


### Step 7: Install Bench
Install Bench CLI:
```bash
pip install frappe-bench
```
**Note: depending on your OS and version of python, you may need to use pip3 instead of pip.**

Pip discourages system-wide installations, thus you might have to do something equivalent to source rcfile. Will vary depending on your OS. E.g. for Ubuntu
```bash
source ~/.profile
```
You may need to manually add the directory its installed to into your PATH. The output of pip install should indicate this if required. You can run something like this with the correct path to achieve this.
```bash
echo "export PATH=/path/to/bin:$PATH" >> ~/.profile
source ~/.profile
```
Depending on your OS version and python/pip version, you may get an error here regarding an externally-managed-environment

You can work around this for now by running or use virtualenv
```bash
pip install frappe-bench --break-system-packages
```
An alternative method to do this is with uv and a shell alias

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```
Add alias bench='uvx --from frappe-bench bench' to your shell rc file (.zshrc, .bashrc or similar)

**Confirm the bench installation by checking the version**
```bash
bench --version
```

### Step 8: Initialize Bench
```bash
bench init frappe-bench 
cd frappe-bench
```


## Installation on Windows Using Virtual Machine

[https://www.groundlabs.com/documentation/cr/Content/VM/Setting-Up-a-Windows-Virtual-Machine.html](https://www.groundlabs.com/documentation/cr/Content/VM/Setting-Up-a-Windows-Virtual-Machine.html)
### Prerequisites
- Windows 10 or 11
- Virtual Machine software (e.g., Oracle VirtualBox or VMware Workstation)
- Ubuntu 20.04 ISO image
- At least 4GB RAM and 20GB disk space for the VM

### Step 1: Set Up Virtual Machine
1. Download and install **VirtualBox** from [virtualbox.org](https://www.virtualbox.org/).
2. Download the **Ubuntu 20.04 ISO** from [ubuntu.com](https://ubuntu.com/download/server).
3. Create a new VM in VirtualBox:
   - Name: `Frappe-Ubuntu`
   - Type: Linux, Ubuntu (64-bit)
   - Allocate: 4GB RAM, 20GB disk
4. Mount the Ubuntu ISO and start the VM.
5. Follow the Ubuntu installation wizard to set up the OS.

### Step 2: Configure Ubuntu in VM
Log in to the Ubuntu VM and open a terminal.

### Step 3: Follow Ubuntu Installation Steps
Follow the same steps as in the **Ubuntu Linux** section above (Steps 1–11) to install Frappe and Bench.

### Step 4: Access the Site
- Ensure the VM's network is set to **NAT** or **Bridged Adapter** in VirtualBox.
- From the Windows host, open a browser and navigate to `http://<VM-IP>:8000` or `http://mysite.local:8000` (if DNS is configured).
- To find the VM's IP:
  ```bash
  ip addr show
  ```
  Look for the IP under `inet` (e.g., `192.168.x.x`).

---

## Troubleshooting
- **MariaDB Errors**: Ensure the root password is correct and configurations are applied.
- **Port Conflicts**: Check if port 8000 is free using `sudo netstat -tuln`.
- **VM Network Issues**: Verify the network adapter settings in VirtualBox/VMware.
- **Bench Commands Fail**: Ensure you are in the `frappe-bench` directory and Python 3 is used.

---


# Movie Mate Application Documentation

## Overview
Movie Mate is a web-based application built using the **Frappe Framework** to manage a collection of movies. Users can view movie details, submit ratings, and see additional metadata like IMDB ratings, directors, countries, and box office status (Hit, Flop, or Average). The application includes a list view of movies and detailed views for each movie, with a user-friendly interface for rating submissions.

This documentation provides a step-by-step guide to creating the Movie Mate app, suitable for beginners with basic knowledge of Python, HTML, and Frappe. It assumes you have a Frappe development environment set up.

## Prerequisites
Before starting, ensure you have:
- **Frappe Framework** installed (version 14 or 15 recommended).
- A Frappe **bench** environment set up. If not, follow these steps:
  1. Install prerequisites: Python 3.8+, Node.js, Redis, MariaDB, and Yarn.
  2. Install bench: `pip install frappe-bench`.
  3. Initialize a bench: `bench init frappe-bench`.
  4. Navigate to the bench directory: `cd frappe-bench`.
  5. Get the Frappe app: `bench get-app frappe`.

---

## Step 1: Create the Movie Mate App
The first step is to create a new Frappe app named `movie_mate`.

1. **Create the App**:
   Run the following command in your bench directory:
   ```bash
   bench new-app movie_mate
   ```
   - Enter details when prompted:
     - App Title: `Movie Mate`
     - App Description: `An app manage movies detail and rating`
     - Publisher: `Your Name`
     - Email: `Your Email`
   - This creates a new app in `frappe-bench/apps/movie_mate`.

![Screenshot from 2025-04-25 23-24-32](https://github.com/user-attachments/assets/bfc63301-a063-4e28-b855-52e7c7e5877d)

---

2. **Create a New Site**:
   Create a site for testing the app:
   ```bash
   bench new-site movie-mate.localhost
   ```
- Set the MariaDB root password when prompted.
     
   ![Screenshot from 2025-04-25 23-26-32](https://github.com/user-attachments/assets/a86061b9-769c-448d-b1c5-b40b2c9736f8)

```bash
sites/movie-mate.localhost
├── indexes
│   └── web_routes
├── locks
├── logs
├── private
│   ├── backups
│   └── files
├── public
│   └── files
└── site_config.json
```

The indexes folder has indexes generated via Website Search.

The locks folder maintains file based locks over in-site documents as well as indicators of the state of the site itself.

As you can see, the private folder will contain any database backups and private files. Private files are user uploaded files that need authentication to be accessible.

The public folder will contain files that are accessible without authentication. This can contain website images that should be accessible without login.

The site_config.json file contains configuration that is specific to this site which should not be version controlled. This is similar to an environment variables file. If you look at the contents of the file, it contains the database configuration values for this site.

---

Access site in your browser 
bench allows you to create multiple sites and access them separately in the browser on the same port. This is what we call multi-tenancy support in bench.

Frappe will identify which site to serve by matching the hostname of the request with the site name, so you should be able to access your site on http://library.localhost:8002

If this does not work for you it's because we have to tell our operating system that movie-mate.localhost should point to localhost. To do that, you can add the following entry to your /etc/hosts file.

```bash
127.0.0.1 library.localhost
```
This will map movie-mate.localhost to localhost. Bench has a convenient command to do just that.

```bash
$ bench --site library.localhost add-to-hosts
```

![Screenshot from 2025-04-25 23-30-09](https://github.com/user-attachments/assets/cbd7cb67-a6a6-4a0a-bcde-205187ea9c95)

---

4. **Install the App**:
   Install the app on your bench:
   ```bash
   bench --site movie-mate.localhost install-app movie_mate
   ```
   ![Screenshot from 2025-04-25 23-28-42](https://github.com/user-attachments/assets/e8958678-eb76-4308-8548-257f35a319d3)

To confirm if the app was installed, run the following command:

```bash
$ bench --site library.localhost list-apps
```

4. **Start the Development Server**:
   Start the bench in development mode:
   ```bash
   bench start
   ```
   Access the site at `http://movie-mate.localhost:8002` and log in with the default credentials (username: `Administrator`, password: set during site creation).

5. See App installed in desk

![Screenshot from 2025-04-25 23-56-51](https://github.com/user-attachments/assets/d6809cea-b777-4d52-998d-f5e60dd36a61)

## Step 2: Create the Movie Doctype
The Movie Doctype stores movie details like title, release year, genre, and more.

1. **Create the Doctype**:
   - Go to `Desk > Customize > Doctype > New`.
   - Enter:
     - **Name**: `Movie`
     - **Module**: `Movie Mate`
     - **Fields** (add the following):
       | Label            | Fieldname        | Fieldtype     | Options/Notes                      |
       |------------------|------------------|---------------|------------------------------------|
       | Title            | title            | Data          | Mandatory                          |
       | Release Year     | release_year     | Int           |                                    |
       | Genre            | genre            | Select        | Options: Action,Comedy,Drama, etc  |
       | Description      | description      | Text Editor   |                                    |
       | Poster Image     | poster_image     | Attach Image  |                                    |
       | IMDB Rating      | imdb_rating      | Int           |                                    |
       | Director         | director         | Data          |                                    |
       | Country          | country          | Data          |                                    |
       | Status           | status           | Select        | Options: Hit,Flop,Average          |
       | Published        | published        | Check         | For web visibility                 |
       | Route            | route            | Data          | For web URL                        |
   
     - **Settings**:
       - Check **Has Web View** to enable web pages for movies.
       - Check **Allow Guest to View** if non-logged-in users should see movies.
       - Set **Permissions**: Grant `create`, `read`, `write` to `System Manager` and `read` to `Website User` or `Guest`.
   - Save the Doctype.

2. **Set Up Route**:
   - Ensure the `Route` field is configured to auto-generate unique URLs (e.g., based on `title`).
   - You can set this in a controller later or manually in the form.

3. **Run Migration**:
   Apply the Doctype changes:
   ```bash
   bench --site movie-mate.localhost migrate
   ```

## Step 3: Create the Review Doctype
The Review Doctype stores user ratings for movies.

1. **Create the Doctype**:
   - Go to `Desk > Customize > Doctype > New`.
   - Enter:
     - **Name**: `Review`
     - **Module**: `Movie Mate`
     - **Fields**:
       | Label          | Fieldname      | Fieldtype   | Options/Expand                              |
       |----------------|----------------|-------------|--------------------------------------------|
       | Movie          | movie          | Link        | Options: Movie                             |
       | Rating         | rating         | Select      | Options: 1,2,3,4,5                         |
       | User           | user           | Data        | Read Only, Default: frappe.session.user    |
       | Creation Date  | creation       | Datetime    | Read Only, Default: Now                    |

      - **Settings**:
       - **Autoname**: Set to `field:movie` or a naming series like `REV-.####`.
       - **Permissions**: Grant `create`, `read`, `write` to `Website User`.
   - Save the Doctype.

3. **Run Migration**:
   ```bash
   bench --site movie-mate.localhost migrate
   ```
---

## Step 4: Create Web Templates
Frappe uses Jinja templates to render web pages. We’ll create two templates: `movie.html` for individual movie pages and `movie_row.html` for the list view.
(Already created when enable to web view)

1. **Template Directory**:
   - Navigate to `frappe-bench/apps/movie_mate/movie_mate/movie_mate/doctype/movie/templates`.
---

2. **Create `movie.html`**:
   This template displays a movie’s details, including new fields and a rating submission form.
   - Create `movie.html` in `templates/`:
     ```html
     {% extends 'templates/web.html' %}

     {% block page_content %}
     <div class='py-20 row'>
         <div class='col-sm-3'>
             <img alt='{{ title }}' src='{{ poster_image }}' class="img-fluid rounded shadow">
         </div>
         <div class='col'>
             <h1>{{ title }}</h1>
             <p class='lead'>Genre: {{ genre }}</p>
             <p>Release Year: <strong>{{ release_year }}</strong></p>
             <p>IMDB Rating: <strong>{{ imdb_rating or 'N/A' }}</strong></p>
             <p>Director: <strong>{{ director or 'N/A' }}</strong></p>
             <p>Country: <strong>{{ country or 'N/A' }}</strong></p>
             <p>Status: <strong>{{ status or 'N/A' }}</strong></p>
             <p class='mt-4'>{{ description }}</p>
             <!-- Display Average Rating -->
             <p>Average Rating: <strong>{{ average_rating or 'No ratings yet' }}</strong></p>
             <!-- Rating Submission Form -->
             {% if frappe.session.user != 'Guest' %}
             <div class='mt-4'>
                 <h4>Rate this Movie</h4>
                 <select id='rating' class='form-control w [Bootstrap classes for styling]
                 <option value='' selected disabled>Select Rating</option>
                 <option value='1'>1</option>
                 <option value='2'>2</option>
                 <option value='3'>3</option>
                 <option value='4'>4</option>
                 <option value='5'>5</option>
             </select>
             <button class='btn btn-primary mt-2' onclick='submit_rating("{{ name }}")'>Submit Rating</button>
             </div>
             {% else %}
             <p><a href='/login'>Log in</a> to rate this movie.</p>
             {% endif %}
         </div>
     </div>

     <script>
     function submit_rating(movie_name) {
         let rating = document.getElementById('rating').value;
         if (!rating) {
             frappe.msgprint('Please select a rating.');
             return;
         }
         frappe.call({
             method: 'movie_mate.api.submit_rating',
             args: {
                 movie: movie_name,
                 rating: rating
             },
             callback: function(r) {
                 if (r.message) {
                     frappe.msgprint('Rating submitted successfully!');
                     location.reload();
                 }
             }
         });
     }
     </script>
     {% endblock %}
     ```
   - **Explanation**:
     - Extends `web.html` for base styling.
     - Displays movie details and a form for logged-in users to submit ratings.
     - Uses JavaScript to call the `submit_rating` API.
---

3. **`movie_row.html`**:

     ```html
     <div class='py-8 row'>
         <div class='col-sm-2'>
             <img alt='{{ doc.title }}' src='{{ doc.poster_image }}' class="img-fluid rounded">
         </div>
         <div class='col'>
             <a class='font-size-lg font-weight-bold' href='{{ doc.route }}'>{{ doc.title }}</a>
             <p class='text-muted'>Genre: {{ doc.genre }}</p>
             <p>Year: {{ doc.release_year }}</p>
         </div>
     </div>
     ```
   - **Explanation**:
     - Shows a movie’s title, genre, and release year in the list view.
     - Links to the movie’s detail page via `doc.route`.
---

## Step 5: Create the Controller
The controller (`movie.py`) customizes the Movie Doctype’s behavior, including web view and list view logic.

1. **Create `movie.py`**:
   - Navigate to `frappe-bench/apps/movie_mate/movie_mate/doctype/movie/`.

     ```python
     import frappe
     from frappe.model.document import Document

     class Movie(Document):
         def get_page_info(self):
             """Return page info for web view."""
             context = frappe._dict()
             context.doc = self
             context.title = self.title
             context.name = self.name
             context.genre = self.genre
             context.release_year = self.release_year
             context.description = self.description
             context.poster_image = self.poster_image
             context.imdb_rating = self.imdb_rating
             context.director = self.director
             context.country = self.country
             context.status = self.status
             context.average_rating = self.get_average_rating()
             return context
         
         def get_context(self, context):
             """Optional: Extend context if needed."""
             context.average_rating = self.get_average_rating()
         
         def get_average_rating(self):
             """Get the average rating for this movie."""
             ratings = frappe.get_all('Review', filters={'movie': self.name}, fields=['rating'])
             if not ratings:
                 return None
             avg_rating = sum(float(r.rating) for r in ratings) / len(ratings)
             return round(avg_rating, 1)
         
         @staticmethod
         def get_list_context(context):
             """For list view (movie_row.html)."""
             context.get_list = get_movie_list

     def get_movie_list(doctype, txt, filters, limit_start, limit_page_length=20, order_by=None):
         """Fetch movies for list view."""
         frappe.cache().delete_keys("get_list:Movie:*")
         
         movies = frappe.get_list(
             "Movie",
             fields=["name", "title", "genre", "release_year", "poster_image", "route"],
             filters=filters,
             limit_start=limit_start,
             limit_page_length=limit_page_length,
             order_by=order_by,
             ignore_permissions=False
         )
         
         return movies
     ```
   - **Explanation**:
     - `get_page_info`: Prepares context for `movie.html` with all movie fields.
     - `get_average_rating`: Calculates the average user rating.
     - `get_list_context` and `get_movie_list`: Customize the list view data for `movie_row.html`.
     - Cache invalidation ensures fresh data.
---

## Step 6: Create the API
The API (`api.py`) handles rating submissions.

1. **Create `api.py`**:
   - Navigate to `frappe-bench/apps/movie_mate/movie_mate/api.py`.
   - Create `api.py`:
     ```python
     import frappe

     @frappe.whitelist()
     def submit_rating(movie, rating):
         """Submit a rating for a movie."""
         if not frappe.session.user or frappe.session.user == 'Guest':
             frappe.throw('You must be logged in to submit a rating.')
         
         existing_review = frappe.get_all('Review', filters={
             'movie': movie,
             'user': frappe.session.user
         })
         
         if existing_review:
             review = frappe.get_doc('Review', existing_review[0].name)
             review.rating = rating
             review.save()
         else:
             review = frappe.get_doc({
                 'doctype': 'Review',
                 'movie': movie,
                 'rating': rating,
                 'user': frappe.session.user
             })
             review.insert()
         
         frappe.cache().delete_keys("get_list:Movie:*")
         
         frappe.db.commit()
         return {'status': 'success'}
     ```
   - **Explanation**:
     - Checks if the user is logged in.
     - Updates or creates a Review document for the rating.
     - Invalidates the Movie list cache to refresh the list view.
---
## Step 7: Configure Permissions
Ensure users can interact with the app correctly.

1. **Movie Doctype Permissions**:
   - Go to `Desk > Customize > Doctype > Movie`.
   - Set permissions:
     - `System Manager`: `create`, `read`, `write`, `delete`.
     - `Website User`: `read`.

2. **Review Doctype Permissions**:
   - Go to `Desk > Customize > Doctype > Review`.
   - Set permissions:
     - `Website User`: `read`, `write`.

![Screenshot from 2025-04-26 20-00-35](https://github.com/user-attachments/assets/b9cf7d01-be4c-4de9-af3d-4067ad157b33)

---

## Step 8: Create the Movie
The app to ensure all features work as expected.

- Go to Doctype list > Movie > Go to Movie List

![Screenshot from 2025-04-26 19-57-04](https://github.com/user-attachments/assets/2da6179d-5c76-4982-b19b-d5174905e9f1)

---

6. **Clear Cache**:
   If changes don’t reflect:
   ```bash
   bench --site movie-mate.localhost clear-cache
   bench --site movie-mate.localhost clear-website-cache
   bench restart
   ```
---

## OUTPUT

![9029e70b-8eab-47f0-96a2-756fe67af133](https://github.com/user-attachments/assets/6dfec21c-a178-4698-9d83-be5d9c22a6a7)


## Step 9: Debugging Common Issues
If you encounter problems, try these:

1. **Templates Not Rendering**:
   - Verify template paths: `movie_mate/movie_mate/doctype/movie/templates/`.
   - Check `Has Web View` is enabled in the Movie Doctype.

2. **Average Rating Not Updating**:
   - Ensure `api.py` invalidates the cache.
   - Add debug logs in `movie.py`:
     ```python
     frappe.log_error(str(context), "Movie get_page_info")
     ```
     Check logs in `frappe-bench/logs/`.

3. **Permission Errors**:
   - Confirm `Website User` has correct permissions for Movie and Review Doctypes.
   - Check user roles in `Desk > Users`.

4. **Cache Issues**:
   - Run `redis-cli flushall` (if using Redis).
   - Check cache keys: `redis-cli keys "get_list:Movie:*"`.

---

For further learning, explore the [Frappe Framework Documentation](https://frappeframework.com/docs) or join the [Frappe Community](https://discuss.frappe.io/).
