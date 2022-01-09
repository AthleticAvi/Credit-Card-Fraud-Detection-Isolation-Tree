'''
this file is to handle the request that want to update the status of a fraud transaction to legitimate transaction
'''

import json
from webserver import openDB, closeDB


def legit(server):

    content_len = int(server.headers.get('Content-Length'))
    data = json.loads(server.rfile.read(content_len))

    # -----------------------------------
    # database
    cur, conn = openDB()

    cur.execute(
        f'''UPDATE Transactions SET is_fraud = {0} WHERE trans_num = '{data['transId']}'; ''')
    conn.commit()
    closeDB(cur, conn)
    # ------------------------------------

    server.send_response(200)  # file has been found
    # message to be displayed on webpage
    server.send_header('content-type', 'application/json')
    server.send_header('Access-Control-Allow-Origin', '*')
    server.end_headers()

    # self._set_headers()
    server.wfile.write(json.dumps(
        {'success': True}).encode("utf-8"))
