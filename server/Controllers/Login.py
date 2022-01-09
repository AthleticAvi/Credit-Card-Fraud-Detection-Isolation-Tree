import json
from webserver import openDB, closeDB


def login(server):

    content_len = int(server.headers.get('Content-Length'))
    data = json.loads(server.rfile.read(content_len))
    # -----------------------------------
    # database
    cur, conn = openDB()

    cur.execute(
        f'''SELECT * FROM users WHERE user_id = '{int(data['id'])}' AND cc_num LIKE '%{int(data['card'])}' ''')

    content = cur.fetchall()

    closeDB(cur, conn)
    # ------------------------------------
    resp = None
    if len(content) == 0 and len(data['card']) != 4:
        resp = {'correct': False}
    else:
        resp = {'correct': True, 'cc_num': content[0][1]}

    server.send_response(200)  # file has been found
    # message to be displayed on webpage
    server.send_header('content-type', 'application/json')
    server.send_header('Access-Control-Allow-Origin', '*')
    server.end_headers()

    # self._set_headers()
    server.wfile.write(json.dumps(
        resp).encode("utf-8"))
