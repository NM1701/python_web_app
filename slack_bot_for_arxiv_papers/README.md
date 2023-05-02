## Posting arxiv-article automatically to slack
- 1日おきに最新の論文をランダムに3つ選び、その概要をslackに投稿する
- 50個取得してから3つを選ぶ
- 処理の大まかな流れは以下の通り

    Cloud Scheduler -> Pub/Sub -> Cloud Functions -> slack

### 準備
- slack bot設定(Slack API)
- OpenAI APIの取得
- Pythonプログラム作成（arxiv記事をランダムに取得後、slackに投稿するプログラム）
- GCPでの自動化設定（Cloud Functions, Cloud Scheduler）

### 参考
- [最新の論文をChatGPTで要約して毎朝Slackに共有してくれるbotを作る！](https://zenn.dev/ozushi/articles/ebe3f47bf50a86)
- [サーバーレス ＋ Pythonで定期的にスクレイピングを行う方法](https://gammasoft.jp/blog/schdule-running-python-script-by-serverless/)
- [【2021年版】slackAPIでメッセージ投稿するボットアプリ作成・設定(スコープ権限を詳細解説)](https://auto-worker.com/blog/?p=825#)
- [Slack API を使用してメッセージを投稿する](https://zenn.dev/kou_pg_0131/articles/slack-api-post-message)
- [Arxiv API](https://qiita.com/KMD/items/bd59f2db778dd4bf6ed2)
