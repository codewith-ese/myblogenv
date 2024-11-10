
import sqlite3
from time import strftime
from datetime import datetime

from werkzeug.security import generate_password_hash

from models import get_db_connection

# Example of creating a new user
def create_user(username, password):
    hashed_password = generate_password_hash(password)
    conn = get_db_connection()
    conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
    conn.commit()
    conn.close()
    

conn = sqlite3.connect('blog.db')
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS users
            (username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
conn.commit()
conn.close()




# date2 = datetime.now().strftime(f"%d-%m-%Y------- %H:%M:%S %p")  # Get current date

 
name = "Mondayeseinone2024"
pass_word = "eseMonday@24" # Mon@Ese12



# name = "eseinonecodehub@gmail.com"
# pass_word = "eseMonday@24"

            # savings = phone_ent.get()
conn = sqlite3.connect('blog.db')
c = conn.cursor()
# c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (name, pass_word))
c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (name, pass_word))
conn.commit()
conn.close()

#  Reading from my data base 
conn = sqlite3.connect('blog.db')
c = conn.cursor()
c.execute("SELECT * FROM users")
rows = c.fetchall()
conn.close()

for row in rows:
    print(row)
    
