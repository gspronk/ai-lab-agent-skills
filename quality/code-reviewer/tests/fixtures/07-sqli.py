# TEST FIXTURE 07 — SQL injection in Python
# Expected: SQL injection found with Python-specific fix (not TypeScript)

from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)


@app.route('/api/users', methods=['GET'])
def get_user():
    username = request.args.get('username', '')
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    # SQL injection: user input interpolated directly into query string
    query = f"SELECT id, email, role FROM users WHERE username = '{username}'"
    cursor.execute(query)
    user = cursor.fetchone()
    conn.close()
    if user:
        return jsonify({'id': user[0], 'email': user[1], 'role': user[2]})
    return jsonify({'error': 'User not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)
