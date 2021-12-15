import json
from webserver import openDB, closeDB
import pandas as pd


def transactions(server):
    content_len = int(server.headers.get('Content-Length'))
    data = json.loads(server.rfile.read(content_len))
    print(data)
    # -----------------------------------
    # database
    cur, conn = openDB()

    cur.execute(
        f'''SELECT * FROM Transactions WHERE cc_num LIKE {data['card']}::VARCHAR AND is_fraud = {data['is_fraud']}::INTEGER ORDER BY serial_num DESC''')

    content = cur.fetchall()

    closeDB(cur, conn)
    # ------------------------------------

    df = pd.DataFrame(columns=['user_id', 'cc_num', 'trans_num', 'last', 'first', 'amt', 'unix_time', 'merch_lat',
                               'merch_long', 'is_fraud', 'minutes_from_midnight', 'hours_from_month_start', 'transactionDate', 'date', 'time', 'merchant', 'category', 'serial_num'])

    first50 = content[:50]
    print(first50[:5])

    # first50['date'] = first50['date'].apply(
    #     lambda x: datetime.strftime(x, '%Y-%m-%d'))
    for row in first50:
        df.loc[len(df)] = list(row)

    # creating the history array
    history = []
    i = -1
    dates = df['date'].unique()

    for date in dates:
        i = i+1
        transactions = df[df['date'] == str(date)]
        history.append({'day': str(date), 'transactions': []})
        for ind in transactions.index:
            history[i]['transactions'].append(
                {
                    'category': transactions['category'][ind],
                    'merchant': transactions['merchant'][ind],
                    'price': transactions['amt'][ind],
                    'time': str(transactions['time'][ind]),
                    'date': str(transactions['date'][ind]),
                    'show': False,
                    'id': transactions['trans_num'][ind]
                }
            )

    server.send_response(200)  # file has been found
    # message to be displayed on webpage
    server.send_header('content-type', 'application/json')
    server.send_header('Access-Control-Allow-Origin', '*')
    server.end_headers()

    # server._set_headers()
    server.wfile.write(json.dumps(
        {'history': history}).encode("utf-8"))
