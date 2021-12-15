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

with open('users.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row.
    for row in reader:
        trans_date_trans_time = row[1]
        cc_num = row[2]
        amt = float(row[3])
        first = row[4]
        last = row[5]
        trans_num = row[6]
        unix_time = int(row[7])
        merch_lat = float(row[8])
        merch_long = float(row[9])
        is_fraud = int(row[10])
        minutes_from_midnight = int(float(row[11]))
        hours_from_month_start = int(float(row[12]))
        user_id = int(row[13])
        merchant = row[14]
        category = row[15]
        date = row[16]
        time = row[17]
        serial_num = int(row[18])
        # date = datetime.strptime(row[16], '%Y-%m-%d')
        # time = datetime.strptime(row[17], '%H:%M:%S')

        cur.execute(f'''INSERT INTO Transactions (
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
