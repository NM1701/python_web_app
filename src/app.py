import json

from flask import Flask, render_template, request, jsonify
from gensim.models import Word2Vec

app = Flask(__name__)

# モデル読み込み
model_path = './model/word2vec.gensim.model'
model = Word2Vec.load(model_path)

# ﾄｯﾌﾟﾍﾟｰｼﾞの表示
@app.route("/")
def index():
    return render_template('index.html')

# post_dataは単語計算式をPOSTで受け取り、計算結果を返す
@app.route("/data", methods=["POST"])
def post_data():
    sentence = request.form["sentence"]
    sentence_list = sentence.split(" ")
    sentence_list.remove('')
    result = calc(sentence_list)
    print(result)
    return jsonify(ResultSet = json.dumps(result))

# calcは単語の分散表現を獲得して計算実行
def calc(word_list):
    positive = []
    negative = []
    for i in range(len(word_list)-3):
        if i == 0: # 初回は必ずpositive(+)
            positive.append(word_list[i])

        if word_list[i+1] == "-":
            negative.append(word_list[i+2])
        elif word_list[i+1] == "+":
            positive.append(word_list[i+2])

    return model.most_similar(positive = positive, negative = negative)

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 5000, debug = True)
