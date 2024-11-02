import sqlite3

def get_db_connection():
    conn = sqlite3.connect('blog.db')
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT NOT NULL,
            image TEXT,  -- New image field
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
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
    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_tables()
    

# import sqlite3

# def get_db_connection():
#     conn = sqlite3.connect('blog.db')
#     conn.row_factory = sqlite3.Row
#     return conn

# def create_tables():
#     conn = get_db_connection()
#     conn.execute('''
#         CREATE TABLE IF NOT EXISTS posts (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             title TEXT NOT NULL,
#             content TEXT NOT NULL,
#             author TEXT NOT NULL,  -- New author field
#             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#         )
#     ''')
#     conn.execute('''
#         CREATE TABLE IF NOT EXISTS comments (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             post_id INTEGER,
#             author TEXT NOT NULL,
#             email TEXT NOT NULL,  -- New email field
#             content TEXT NOT NULL,
#             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#             FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
#         )
#     ''')
#     conn.commit()
#     conn.close()

# if __name__ == '__main__':
#     create_tables()
