from flask import Flask, render_template, request, jsonify, redirect, url_for
from models import db, User
import bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///game.db'
db.init_app(app)

# 创建数据库表
with app.app_context():
    db.create_all()


@app.route('/')
def index():
    return redirect(url_for('login_register'))


@app.route('/login_register', methods=['GET', 'POST'])
def login_register():
    if request.method == 'POST':
        action = request.form.get('action')
        if action == 'login':
            username = request.form['username']
            password = request.form['password'].encode('utf-8')
            user = User.query.filter_by(username=username).first()
            if user and bcrypt.checkpw(password, user.password):
                return redirect(url_for('game'))
            else:
                return render_template('login_register.html', error='用户名或密码错误', show_login=True, show_register=True)
        elif action =='register':
            username = request.form['username']
            password = request.form['password'].encode('utf-8')
            hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
            new_user = User(username=username, password=hashed_password)
            try:
                db.session.add(new_user)
                db.session.commit()
                return redirect(url_for('game'))
            except:
                return render_template('login_register.html', error='用户名已存在', show_login=True, show_register=True)
        elif action == 'query_score':
            username = request.form['query_username']
            user = User.query.filter_by(username=username).first()
            if user:
                return render_template('login_register.html', last_score=user.last_score, show_login=True, show_register=True)
            else:
                return render_template('login_register.html', error='玩家不存在', show_login=True, show_register=True)
    return render_template('login_register.html', show_login=True, show_register=True)


@app.route('/game')
def game():
    return render_template('index.html')


@app.route('/record_score', methods=['POST'])
def record_score():
    try:
        data = request.get_json()
        username = data.get('username')
        score = data.get('score')
        user = User.query.filter_by(username=username).first()
        if user:
            user.update_last_score(score)
            db.session.commit()
            return jsonify({"message": "分数记录成功"}), 200
        return jsonify({"message": "玩家不存在"}), 404
    except Exception as e:
        print(f"记录分数时出现数据库操作异常: {e}") 
        return jsonify({"message": "分数记录失败，请稍后再试"}), 500


if __name__ == '__main__':
    app.run(debug=True)