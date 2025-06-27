import sqlite3
from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from functools import wraps
import os
from models import get_db_connection

app = Flask(__name__)
app.secret_key = 'your_very_strong_secret_key_here'  # Change this!

# Configure the upload folder
app.config['UPLOAD_FOLDER'] = 'uploads/images'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Admin required decorator
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('is_admin'):
            flash('Admin access required', 'danger')
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
    if session.get('is_admin'):
        return redirect(url_for('admin'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()

        if not username or not password:
            flash('Both fields are required', 'danger')
            return redirect(url_for('admin_login'))

        try:
            conn = get_db_connection()
            user = conn.execute(
                'SELECT * FROM users WHERE username = ?',
                (username,)
            ).fetchone()
            conn.close()

            if user and check_password_hash(user['password'], password):
                if user['is_admin']:
                    session['user_id'] = user['id']
                    session['username'] = user['username']
                    session['is_admin'] = True
                    flash('Admin login successful!', 'success')
                    return redirect(url_for('admin'))
                else:
                    flash('You do not have admin privileges', 'danger')
            else:
                flash('Invalid credentials', 'danger')
        except Exception as e:
            flash('Login error occurred', 'danger')
            app.logger.error(f"Login error: {str(e)}")

    return render_template('admin_login.html')

@app.route('/admin')
@admin_required
def admin():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts ORDER BY created_at DESC').fetchall()
    users = conn.execute('SELECT id, username, created_at FROM users').fetchall()
    conn.close()
    
    return render_template('admin.html', posts=posts, users=users)

@app.route('/admin/logout')
def admin_logout():
    session.clear()
    flash('You have been logged out', 'success')
    return redirect(url_for('index'))

# Helper function to create users (for testing)
@app.route('/create_user', methods=['POST'])
def create_user():
    username = request.form.get('username')
    password = request.form.get('password')
    is_admin = bool(request.form.get('is_admin'))
    
    if not username or not password:
        return "Username and password required", 400
        
    hashed_password = generate_password_hash(password)
    conn = get_db_connection()
    try:
        conn.execute(
            'INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)',
            (username, hashed_password, is_admin)
        )
        conn.commit()
        return f"User {username} created successfully", 201
    except sqlite3.IntegrityError:
        return "Username already exists", 400
    finally:
        conn.close()
        

@app.route('/post/<int:post_id>', methods=['GET', 'POST'])
def post(post_id):
    conn = get_db_connection()
    post = conn.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()
    
    if request.method == 'POST':
        author = request.form['author']
        email = request.form['email']
        content = request.form['content']
        conn.execute('INSERT INTO comments (post_id, author, email, content) VALUES (?, ?, ?, ?)', (post_id, author.title(), email, content.lower()))
        conn.commit()
        return redirect(f'/post/{post_id}')
    
    comments = conn.execute('SELECT * FROM comments WHERE post_id = ?', (post_id,)).fetchall()
    conn.close()
    return render_template('post.html', post=post, comments=comments)

@app.route('/post', methods=['POST'])
def create_post():
    title = request.form['title']
    content = request.form['content']
    author = "Monday Esinone"  # To replace with actual name or retrieve from a user session if you implement user authentication

    # Handle image upload
    image = request.files.get('image')
    image_filename = None
    if image and allowed_file(image.filename):
        image_filename = secure_filename(image.filename)  # Secure the filename
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], image_filename))  # Save the image

    conn = get_db_connection()
    conn.execute('INSERT INTO posts (title, content, author, image) VALUES (?, ?, ?, ?)', (title, content, author, image_filename))
    conn.commit()
    conn.close()
    
    return redirect('/')

# new blog post page 
@app.route('/blogpost')
def blogpost():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts ORDER BY created_at DESC LIMIT 5').fetchall()
    conn.close()
    
    return render_template('blogpost.html', posts=posts)

@app.route('/olderpost')
def olderpost():  
    # rendering the older posts in new page page 
    conn = get_db_connection()
    old_posts = conn.execute('SELECT * FROM posts ORDER BY title DESC').fetchall()
    conn.close()
    
    return render_template("olderpost.html", old_posts=old_posts)

# new wood calculator route page 
@app.route('/wood_calculator')
def wood_calculator():
    # conn = get_db_connection()
    # posts = conn.execute('SELECT * FROM posts ORDER BY created_at DESC').fetchall()
    # conn.close()
    return render_template('wood_calculator.html')

@app.route('/table_cal')
def table_cal():
    # conn = get_db_connection()
    # posts = conn.execute('SELECT * FROM posts ORDER BY created_at DESC').fetchall()
    # conn.close()
    return render_template('table_cal.html')

@app.route('/wardrob_cal')
def wardrob_cal():
    
    return render_template("wardrob_cal.html")

@app.route('/book_shelves_cal')
def book_shelves_cal():
    
    return render_template("book_shelves_cal.html")

@app.route('/marble_cal')
def marble_cal():
    
    return render_template("marble_cal.html")
 
if __name__ == '__main__':
    # Ensure the upload directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)
  
  



# import os
# import sqlite3
# from datetime import timedelta
# from functools import wraps

# from flask import Flask, render_template, request, redirect, url_for, session, flash
# from werkzeug.security import check_password_hash, generate_password_hash
# from werkzeug.utils import secure_filename
# import magic  # type: ignore # python-magic-bin for Windows or python-magic for Unix

# # Initialize Flask app
# app = Flask(__name__)

# # Configuration
# class Config:
#     SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-change-me'  # Change in production
#     UPLOAD_FOLDER = 'uploads/images'
#     ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
#     MAX_CONTENT_LENGTH = 8 * 1024 * 1024  # 8MB upload limit
#     DATABASE = 'blog.db'
#     SESSION_COOKIE_SECURE = True
#     SESSION_COOKIE_HTTPONLY = True
#     SESSION_COOKIE_SAMESITE = 'Lax'
#     PERMANENT_SESSION_LIFETIME = timedelta(hours=1)

# app.config.from_object(Config)

# # Database functions
# def get_db_connection():
#     """Get a database connection with context manager support"""
#     conn = sqlite3.connect(app.config['DATABASE'])
#     conn.row_factory = sqlite3.Row
#     return conn

# # Security functions
# def allowed_file(filename):
#     """Check if file extension is allowed"""
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# def validate_file(file):
#     """Validate both filename and file content"""
#     filename = secure_filename(file.filename)
#     if not filename or not allowed_file(filename):
#         return False
    
#     # Check MIME type
#     mime = magic.Magic(mime=True)
#     file_type = mime.from_buffer(file.stream.read(2048))
#     file.stream.seek(0)
#     return file_type.split('/')[0] == 'image'

# # Authentication decorators
# def admin_required(f):
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         if not session.get('is_admin'):
#             flash('Admin access required', 'danger')
#             return redirect(url_for('admin_login'))
#         return f(*args, **kwargs)
#     return decorated_function

# def login_required(f):
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         if 'user_id' not in session:
#             flash('Please log in to access this page', 'danger')
#             return redirect(url_for('admin_login'))
#         return f(*args, **kwargs)
#     return decorated_function

# # Routes
# @app.route('/')
# def index():
#     """Home page"""
#     return render_template('index.html')

# # Authentication routes
# @app.route('/admin_login', methods=['GET', 'POST'])
# def admin_login():
#     """Admin login handler"""
#     if session.get('is_admin'):
#         return redirect(url_for('admin'))

#     if request.method == 'POST':
#         username = request.form.get('username', '').strip()
#         password = request.form.get('password', '').strip()

#         if not username or not password:
#             flash('Both fields are required', 'danger')
#             return redirect(url_for('admin_login'))

#         try:
#             with get_db_connection() as conn:
#                 user = conn.execute(
#                     'SELECT * FROM users WHERE username = ?',
#                     (username,)
#                 ).fetchone()

#             if user and check_password_hash(user['password'], password):
#                 if user['is_admin']:
#                     session.permanent = True
#                     session['user_id'] = user['id']
#                     session['username'] = user['username']
#                     session['is_admin'] = True
#                     flash('Admin login successful!', 'success')
#                     return redirect(url_for('admin'))
#                 flash('You do not have admin privileges', 'danger')
#             else:
#                 flash('Invalid credentials', 'danger')
#         except Exception as e:
#             app.logger.error(f"Login error: {str(e)}")
#             flash('Login error occurred', 'danger')

#     return render_template('admin_login.html')

# @app.route('/admin/logout')
# @login_required
# def admin_logout():
#     """Logout handler"""
#     session.clear()
#     flash('You have been logged out', 'success')
#     return redirect(url_for('index'))

# # Admin routes
# @app.route('/admin')
# @admin_required
# def admin():
#     """Admin dashboard"""
#     with get_db_connection() as conn:
#         posts = conn.execute('SELECT * FROM posts ORDER BY created_at DESC').fetchall()
#         users = conn.execute('SELECT id, username, created_at, is_admin FROM users').fetchall()
    
#     return render_template('admin.html', posts=posts, users=users)

# @app.route('/admin/create_user', methods=['GET', 'POST'])
# @admin_required
# def admin_create_user():
#     """Admin user creation"""
#     if request.method == 'POST':
#         username = request.form.get('username', '').strip()
#         password = request.form.get('password', '').strip()
#         is_admin = request.form.get('is_admin', 'n').lower() == 'y'

#         if not username or not password:
#             flash('Username and password required', 'danger')
#             return redirect(url_for('admin_create_user'))

#         if len(password) < 8:
#             flash('Password must be at least 8 characters', 'danger')
#             return redirect(url_for('admin_create_user'))

#         hashed_password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)
        
#         try:
#             with get_db_connection() as conn:
#                 conn.execute(
#                     'INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)',
#                     (username, hashed_password, int(is_admin)))
#                 conn.commit()
#             flash(f'User {username} created successfully!', 'success')
#             return redirect(url_for('admin'))
#         except sqlite3.IntegrityError:
#             flash('Username already exists', 'danger')
#         except Exception as e:
#             app.logger.error(f"User creation error: {str(e)}")
#             flash('Error creating user', 'danger')

#     return render_template('admin_create_user.html')

# # Blog routes
# @app.route('/blogpost')
# def blogpost():
#     """Main blog page"""
#     with get_db_connection() as conn:
#         posts = conn.execute('SELECT * FROM posts ORDER BY created_at DESC LIMIT 5').fetchall()
#     return render_template('blogpost.html', posts=posts)

# @app.route('/post/<int:post_id>', methods=['GET', 'POST'])
# def post(post_id):
#     """Single post view"""
#     with get_db_connection() as conn:
#         post = conn.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()
        
#         if request.method == 'POST':
#             author = request.form.get('author', '').strip()
#             email = request.form.get('email', '').strip().lower()
#             content = request.form.get('content', '').strip()
            
#             if not all([author, email, content]):
#                 flash('All comment fields are required', 'danger')
#             else:
#                 conn.execute(
#                     'INSERT INTO comments (post_id, author, email, content) VALUES (?, ?, ?, ?)',
#                     (post_id, author, email, content))
#                 conn.commit()
#                 return redirect(f'/post/{post_id}')
        
#         comments = conn.execute('SELECT * FROM comments WHERE post_id = ?', (post_id,)).fetchall()
    
#     return render_template('post.html', post=post, comments=comments)

# @app.route('/create_post', methods=['GET', 'POST'])
# @admin_required
# def create_post():
#     """Create new blog post"""
#     if request.method == 'POST':
#         title = request.form.get('title', '').strip()
#         content = request.form.get('content', '').strip()
#         author = session.get('username', 'Admin')  # Default to 'Admin' if not found
        
#         if not title or not content:
#             flash('Title and content are required', 'danger')
#             return redirect(url_for('create_post'))

#         image_filename = None
#         if 'image' in request.files:
#             image = request.files['image']
#             if image.filename != '' and validate_file(image):
#                 image_filename = secure_filename(image.filename)
#                 image.save(os.path.join(app.config['UPLOAD_FOLDER'], image_filename))
#             elif image.filename != '':
#                 flash('Invalid image file', 'danger')
#                 return redirect(url_for('create_post'))

#         try:
#             with get_db_connection() as conn:
#                 conn.execute(
#                     'INSERT INTO posts (title, content, author, image) VALUES (?, ?, ?, ?)',
#                     (title, content, author, image_filename))
#                 conn.commit()
#             flash('Post created successfully!', 'success')
#             return redirect('/')
#         except Exception as e:
#             app.logger.error(f"Post creation error: {str(e)}")
#             flash('Error creating post', 'danger')

#     return render_template('create_post.html')

# # Calculator routes
# @app.route('/wood_calculator')
# def wood_calculator():
#     return render_template('wood_calculator.html')

# @app.route('/table_cal')
# def table_cal():
#     return render_template('table_cal.html')

# @app.route('/wardrob_cal')
# def wardrob_cal():
#     return render_template("wardrob_cal.html")

# @app.route('/book_shelves_cal')
# def book_shelves_cal():
#     return render_template("book_shelves_cal.html")

# @app.route('/marble_cal')
# def marble_cal():
#     return render_template("marble_cal.html")

# # Initialize app
# if __name__ == '__main__':
#     # Ensure upload directory exists
#     os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
#     # Create database tables if they don't exist
#     with app.app_context():
#         with get_db_connection() as conn:
#             conn.execute('''
#                 CREATE TABLE IF NOT EXISTS users (
#                     id INTEGER PRIMARY KEY AUTOINCREMENT,
#                     username TEXT NOT NULL UNIQUE,
#                     password TEXT NOT NULL,
#                     is_admin BOOLEAN DEFAULT 0,
#                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#                 )
#             ''')
#             conn.execute('''
#                 CREATE TABLE IF NOT EXISTS posts (
#                     id INTEGER PRIMARY KEY AUTOINCREMENT,
#                     title TEXT NOT NULL,
#                     content TEXT NOT NULL,
#                     author TEXT NOT NULL,
#                     image TEXT,
#                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#                 )
#             ''')
#             conn.execute('''
#                 CREATE TABLE IF NOT EXISTS comments (
#                     id INTEGER PRIMARY KEY AUTOINCREMENT,
#                     post_id INTEGER,
#                     author TEXT NOT NULL,
#                     email TEXT NOT NULL,
#                     content TEXT NOT NULL,
#                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#                     FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
#                 )
#             ''')
#             conn.commit()
    
#     app.run(debug=True)
    
# if __name__ == '__main__':
#     # Ensure the upload directory exists
#     os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
#     app.run(debug=True)
  
  

