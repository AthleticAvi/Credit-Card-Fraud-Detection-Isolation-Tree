from datetime import datetime
import psycopg2
import csv
DB_HOST = "localhost"
DB_NAME = "FraudDetection"
DB_USER = "postgres"
DB_PASS = "karamabumokh"

conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST)

print('connected to database successfully')
cur = conn.cursor()

with open('usersTest.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        trans_date_trans_time = row[2]
        cc_num = row[3]
        category = row[4]
        amt = float(row[5])
        first = row[6]
        last = row[7]
        trans_num = row[8]
        unix_time = int(row[9])
        merch_lat = float(row[10])
        merch_long = float(row[11])
        is_fraud = int(row[12])
        minutes_from_midnight = int(float(row[13]))
        hours_from_month_start = int(float(row[14]))
        merchant = row[15]
        date = row[16]
        time = row[17]
        serial_num = int(row[18])
        user_id = int(row[19])

        cur.execute(f'''INSERT INTO TestTransactions (
            transactionDate
            ,cc_num
            ,amt
            ,first
            ,last
            ,trans_num
            ,unix_time
            ,merch_lat
            ,merch_long
            ,is_fraud
            ,minutes_from_midnight
            ,hours_from_month_start
            ,user_id
            ,date
            ,time
            ,merchant
            ,category
            ,serial_num) VALUES (
                to_timestamp('{trans_date_trans_time}','YYYY-MM-DD HH24:MI:SS')
                ,'{cc_num}'
                ,'{amt}'
                ,'{first}'
                ,'{last}'
                ,'{trans_num}'
                ,'{unix_time}'
                ,'{merch_lat}'
                ,'{merch_long}'
                ,'{is_fraud}'
                ,'{minutes_from_midnight}'
                ,'{hours_from_month_start}'
                ,'{user_id}'
                ,'{date}'
                ,'{time}'
                ,'{merchant}'
                ,'{category}'
                ,'{serial_num}'
                )''',
                    row
                    )


conn.commit()
cur.close()
conn.close()

print('database disconnected successfully')
