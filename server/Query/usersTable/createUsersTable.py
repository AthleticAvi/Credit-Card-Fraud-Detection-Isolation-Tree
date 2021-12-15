import psycopg2
DB_HOST = "localhost"
DB_NAME = "FraudDetection"
DB_USER = "postgres"
DB_PASS = "karamabumokh"


conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST)

print('connected to database successfully')
cur = conn.cursor()

cur.execute('''CREATE TABLE users (
            user_id int,
            cc_num VARCHAR(255) PRIMARY KEY
        )''')
# print(cur.fetchall())
conn.commit()
cur.close()
conn.close()

print('database disconnected successfully')
