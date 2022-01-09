

import json
from webserver import openDB, closeDB


def getTransactionToTest(server):

    content_len = int(server.headers.get('Content-Length'))
    data = json.loads(server.rfile.read(content_len))
    # -----------------------------------
    # database
    cur, conn = openDB()

    cur.execute(
        f'''SELECT category, merchant, amt, time, date, trans_num, unix_time, merch_lat, merch_long, minutes_from_midnight, hours_from_month_start FROM TestTransactions WHERE user_id = '{int(data['id'])}' AND is_fraud = {int(data['isFraud'])}''')

    content = cur.fetchall()

    closeDB(cur, conn)
    # ------------------------------------

    if len(content) == 0:
        server.send_response(200)  # file has been found
        # message to be displayed on webpage
        server.send_header('content-type', 'application/json')
        server.end_headers()

        server.wfile.write(json.dumps(
            {'available': False}).encode("utf-8"))

    else:
        firstOne = content[0]

        transaction = {
            'category': firstOne[0],
            'merchant': firstOne[1],
            'price': firstOne[2],
            'time': str(firstOne[3]),
            'date': str(firstOne[4]),
            'show': False,
            'id': firstOne[5]
        }

        # -----------------------------------
        # get the transaction from the test set in the database
        cur, conn = openDB()

        cur.execute(
            f'''SELECT * FROM TestTransactions WHERE trans_num = '{transaction['id']}' ''')

        content = cur.fetchall()

        closeDB(cur, conn)

        # ------------------------------------
        # get the serial number of the transaction

        cur, conn = openDB()

        cur.execute(
            f'''SELECT COUNT(*) FROM transactions WHERE user_id = '{int(data['id'])}' ''')

        serial_num = int(cur.fetchall()[0][0])

        closeDB(cur, conn)

        # ------------------------------------
        row = content[0]

        user_id = int(row[0])
        cc_num = row[1]
        trans_num = row[2]
        last = row[3]
        first = row[4]
        amt = float(row[5])
        unix_time = int(row[6])
        merch_lat = float(row[7])
        merch_long = float(row[8])
        is_fraud = int(row[9])
        minutes_from_midnight = row[10]
        hours_from_month_start = int(float(row[11]))
        trans_date_trans_time = row[12]
        date = row[13]
        time = row[14]
        merchant = row[15]
        category = row[16]

        # ------------------------------------------------------------
        # delete the transaction from the test set in the database
        cur, conn = openDB()

        cur.execute(
            f'''DELETE FROM TestTransactions WHERE trans_num = '{transaction['id']}' ''')
        conn.commit()

        closeDB(cur, conn)

        # -----------------------------------

        import pickle
        # Load from file
        fileName = int(data['id'])
        with open(f'models123/{fileName}.pkl', 'rb') as file:
            model = pickle.load(file)

        amt = transaction['price']
        unix_time = firstOne[6]
        merch_lat = firstOne[7]
        merch_long = firstOne[8]
        minutes_from_midnight = firstOne[9]
        hours_from_month_start = firstOne[10]

        '''
        prediction : -1 means its fraud
        prediction : 1 means its legitimate
        '''
        # predicting if this transaction is a fraud or not
        prediction = model.predict(
            [[amt, unix_time, merch_lat, merch_long, minutes_from_midnight, hours_from_month_start]])

        if(prediction[0] == -1):
            is_fraud = 1
        else:
            is_fraud = 0

        # --------------------------------
        # set the tested transaction in the transaction table
        cur, conn = openDB()
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
                )''')
        conn.commit()
        closeDB(cur, conn)
        # -----------------------------------

        server.send_response(200)  # file has been found
        # message to be displayed on webpage
        server.send_header('content-type', 'application/json')
        server.send_header('Access-Control-Allow-Origin', '*')
        server.end_headers()

        # self._set_headers()
        server.wfile.write(json.dumps(
            {'transaction': transaction, 'prediction': int(prediction[0]), 'available': True}).encode("utf-8"))
