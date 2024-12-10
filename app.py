from sqlite3 import connect
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.security import check_password_hash
from werkzeug.utils import secure_filename
import os
from models import get_db_connection

from flask import Flask, redirect, url_for, render_template, request, session, flash

from werkzeug.security import generate_password_hash



# Example of creating a new user
def create_user(username, password):
    hashed_password = generate_password_hash(password)
    conn = get_db_connection()
    conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
    conn.commit()
    conn.close()
    
    
app = Flask(__name__)
app.secret_key = 'codehub_secret_key_ese'  # Change this to a random secret key

# Configure the upload folder
app.config['UPLOAD_FOLDER'] = 'uploads/images'  # Directory to save uploaded images
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif','webp'}  # Allowed image extensions

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/')
def index():

    return render_template('index.html')

@app.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
        conn.close()

        if user and check_password_hash(user['password'], password):
        
            session['user_id'] = user['id']  # Store user ID in session
            flash('Login successful!', 'success')
            return redirect(url_for('admin'))  # Redirect to admin page
        else:
            flash('Invalid username or password', 'danger')

    return render_template('admin_login.html')


@app.route('/admin')
def admin():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts ORDER BY created_at DESC').fetchall()
    conn.close()
    return render_template('admin.html')


@app.route('/post/<int:post_id>', methods=['GET', 'POST'])
def post(post_id):
    conn = get_db_connection()
    post = conn.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()
    
    if request.method == 'POST':
        author = request.form['author']
        email = request.form['email']
        content = request.form['content']
        conn.execute('INSERT INTO comments (post_id, author, email, content) VALUES (?, ?, ?, ?)', (post_id, author.title(), email, content.title()))
        conn.commit()
        return redirect(f'/post/{post_id}')
    
    comments = conn.execute('SELECT * FROM comments WHERE post_id = ?', (post_id,)).fetchall()
    conn.close()
    return render_template('post.html', post=post, comments=comments)

@app.route('/post', methods=['POST'])
def create_post():
    title = request.form['title']
    content = request.form['content']
    author = "Monday Esinone"  # Replace with your actual name or retrieve from a user session if you implement user authentication

    # Handle image upload
    image = request.files.get('image')
    image_filename = None
    if image and allowed_file(image.filename):
        image_filename = secure_filename(image.filename)  # Secure the filename
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], image_filename))  # Save the image

    conn = get_db_connection()
    conn.execute('INSERT INTO posts (title, content, author, image) VALUES (?, ?, ?, ?)', (title.title(), content, author, image_filename))
    conn.commit()
    conn.close()
    
    return redirect('/')

# new blog post page 
@app.route('/blogpost')
def blogpost():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts ORDER BY created_at DESC').fetchall()
    conn.close()
    return render_template('blogpost.html', posts=posts)

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

@app.route('/marble_cal')
def marble_cal():
    
    return render_template("marble_cal.html")
 
if __name__ == '__main__':
    # Ensure the upload directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)
    

