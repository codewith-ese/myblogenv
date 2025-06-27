import sqlite3

def get_db_connection():
    conn = sqlite3.connect('blog.db')
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_db_connection()

    # Create posts table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT NOT NULL,
            image TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Create comments table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id INTEGER,
            author TEXT NOT NULL,
            email TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
        )
    ''')

    # Create users table with admin flag
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            is_admin BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Create initial admin user if none exists
    admin_check = conn.execute('SELECT * FROM users WHERE is_admin = 1').fetchone()
    if not admin_check:
        from werkzeug.security import generate_password_hash
        default_password = generate_password_hash('ak')  # Change this in production!
        conn.execute(
            'INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)',
            ('admin', default_password, 1)
        )

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_tables()
    