from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    last_score = db.Column(db.Integer)  

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def update_last_score(self, score):
        """
        用于更新用户的上一次游戏得分
        """
        self.last_score = score
        db.session.commit()

