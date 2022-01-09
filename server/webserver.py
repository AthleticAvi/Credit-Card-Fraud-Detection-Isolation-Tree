import psycopg2
from http.server import HTTPServer, BaseHTTPRequestHandler


DB_HOST = "localhost"
DB_NAME = "FraudDetection"
DB_USER = "postgres"
DB_PASS = "karamabumokh"


conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST)

print('connected to database successfully')
cur = conn.cursor()

#cur.execute("INSERT INTO login (id,card) values(%s, %s )", ('1234', '1111'))
# print(cur.fetchall())
# conn.commit()
cur.close()
conn.close()

print('database disconnected successfully')


def openDB():

    conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER,
                            password=DB_PASS, host=DB_HOST)

    print('connected to database successfully')
    cur = conn.cursor()
    return cur, conn


def closeDB(cur, conn):
    cur.close()
    conn.close()

    print('database disconnected successfully')


class reqHandler(BaseHTTPRequestHandler):

    # def do_OPTIONS(self):
    #     self.send_response(200, "ok")
    #     self.send_header('Access-Control-Allow-Origin',
    #                      '*')
    #     self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    #     self.send_header("Access-Control-Allow-Headers",
    #                      "Authorization, Content-Type")
    #     self.end_headers()

    def do_POST(self):

        # getting transactions from the database to present them
        if self.path.endswith('transactions'):
            from Controllers.Transactions import transactions
            transactions(self)

        # getting fraud/legitimate transaction from database to simulate the buying process
        if self.path.endswith('developers'):
            from Controllers.Developers import getTransactionToTest
            getTransactionToTest(self)

        # verify the inserted data to login
        if self.path.endswith('login'):
            from Controllers.Login import login
            login(self)

        # change status of transaction to be not fraud
        if self.path.endswith('moveToLegit'):
            from Controllers.Leget import legit
            legit(self)


def main():
    PORT = 8001
    server = HTTPServer(('', PORT), reqHandler)
    print('Server is running on port %s' % PORT)
    server.serve_forever()


if __name__ == '__main__':
    main()
