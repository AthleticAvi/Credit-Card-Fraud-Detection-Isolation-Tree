import psycopg2
DB_HOST = "localhost"
DB_NAME = "FraudDetection"
DB_USER = "postgres"
DB_PASS = "karamabumokh"


conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST)

print('connected to database successfully')
cur = conn.cursor()

cur.execute('''CREATE TABLE TestTransactions (
    user_id int,
    cc_num varchar(255),
    trans_num varchar(255),
    last varchar(255),
    first varchar(255),
    amt float,
    unix_time int,
    merch_lat float,
    merch_long float,
    is_fraud int,
    minutes_from_midnight int,
    hours_from_month_start int,
    transactionDate varchar(255),
    date varchar(255),
    time varchar(255),
    merchant varchar(255),
    category varchar(255),
    serial_num int
);''')
conn.commit()
cur.close()
conn.close()

print('database disconnected successfully')
