import json
from webserver import openDB, closeDB


def login(server):

    content_len = int(server.headers.get('Content-Length'))
    data = json.loads(server.rfile.read(content_len))
    print(data)
    # -----------------------------------
    # database
    cur, conn = openDB()

    cur.execute(
        f'''SELECT * FROM users WHERE user_id = '{int(data['id'])}' AND cc_num = '{int(data['card'])}' ''')

    content = cur.fetchall()

    closeDB(cur, conn)
    # ------------------------------------
    print(content)
    resp = None
    if len(content) == 0:
        resp = {'correct': False}
    else:
        resp = {'correct': True}

    server.send_response(200)  # file has been found
    # message to be displayed on webpage
    server.send_header('content-type', 'application/json')
    server.send_header('Access-Control-Allow-Origin', '*')
    server.end_headers()

    # self._set_headers()
    server.wfile.write(json.dumps(
        resp).encode("utf-8"))
