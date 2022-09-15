# typing-game

駒場祭のタイピングゲーム

## Node のインストール

[ut.code(); Learn](https://learn.utcode.net/docs/web-servers/node-js/)を参照

### アップデート

#### Node のアップデート

```
nvm install --lts
```

#### npm のアップデート

```
npm install -g npm
```

## Git と GitHub のセットアップ

[ut.code(); Learn](https://learn.utcode.net/docs/web-servers/git-github/)を参照

## セットアップ

プロジェクトフォルダに移動

```
$ git clone git@github.com:ut-code/typing-game.git
```

```
$ cd typing-game/frontend
```

```
$ npm install
```

```
cd ../backend
```

```
$ npm install
```

```
$ touch .env
```

`.env` ファイルに `DATABASE_URL=データベースのURL` と書く。

```
$ npx prisma db push
```

## サーバの起動(ビルドも自動実行)

`typing-game` ディレクトリに移動

```
$ cd frontend
```

```
$ npm run dev
```

`Terminal` をもう一つ開く

`typing-game` ディレクトリに移動

```
$ cd frontend
```

```
$ npm run dev
```

ブラウザで `http://127.0.0.1:5173/` にアクセスすると、表示されるはずです。

## ディレクトリ構成

- `/root`
  - `/frontend` フロントエンド関係
    - `index.html`,`style.css`,`script.js`がメイン 基本的にはここをいじる。
    - `/dist` `$ npm run dev` を実行すると、自動で作られる。編集はしない。
  - `/backend` バックエンド関係
    - `main.js` メイン
    - `finished.ejs` 結果ページ
    - `/prisma` Prisma のファイル
  - `/keyboard`,`/keyboard-layout-maker` サブモジュール これらのフォルダの中は別のリポジトリになっている。
