import psycopg2
import csv

DB_HOST = "localhost"
DB_NAME = "FraudDetection"
DB_USER = "postgres"
DB_PASS = "karamabumokh"


conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST)

cur = conn.cursor()

print('connected to database successfully')
with open('users_id_cc_num.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        cc_num = row[1]
        user_id = int(row[2])

        cur.execute(f'''INSERT INTO users (
                user_id
                ,cc_num
            ) 
            VALUES (
                '{user_id}'
                ,'{cc_num}'
            )''', row
                    )


conn.commit()
cur.close()
conn.close()

print('database disconnected successfully')
