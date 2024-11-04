from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
from models import get_db_connection

app = Flask(__name__)

# Configure the upload folder
app.config['UPLOAD_FOLDER'] = 'uploads/images'  # Directory to save uploaded images
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif','webp'}  # Allowed image extensions

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/')
def index():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts ORDER BY created_at DESC').fetchall()
    conn.close()
    return render_template('index.html', posts=posts)

@app.route('/admin')
def addmin():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts ORDER BY created_at DESC').fetchall()
    conn.close()
    return render_template('admin.html', posts=posts)


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
    conn.execute('INSERT INTO posts (title, content, author, image) VALUES (?, ?, ?, ?)', (title.title(), content.title(), author, image_filename))
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

if __name__ == '__main__':
    # Ensure the upload directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)
    

