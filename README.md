# タイピングゲーム

<img src="frontend/public/logo.png" width="300">

第 73 回駒場祭企画 ウ タイピングゲーム

[https://typing-game.onrender.com/](https://typing-game.onrender.com/)

## 環境構築

Node.js のインストール

```shell
git clone --recursive git@github.com:ut-code/typing-game.git
```

```shell
cd typing-game
```

```shell
npm run setup:env
```

`.env` ファイルに `DATABASE_URL="データベースのURL"` となるように書く。

```shell
npm run setup
```

## サーバの起動(ビルドも自動実行)

`typing-game` ディレクトリに移動

```shell
npm run backend:dev
```

Terminal をもう一つ開く

`typing-game` ディレクトリに移動

```shell
npm run frontend:dev
```

ブラウザで [`http://127.0.0.1:5173/`](http://127.0.0.1:5173/) にアクセスすると、表示されるはずです。

## 最新の状態に更新

```shell
npm run autoupdate
```

プルした後に動かなくなった場合はこれをすれば、直るかもしれません。

## ディレクトリ構成

- `/root`

  - `/frontend` フロントエンド関係

    - `/src`

      - `/pages`
        ホームページ

        - `/Basic`
          タイピングゲームの本体

        - `/Result`
          結果ページ

    - `/dist` ビルド時に自動で作られる。編集はしない。
    - `/keyboard-layout-maker` サブモジュール

  - `/backend` バックエンド関係
    - `main.js` メイン
    - `/prisma` Prisma のファイル
