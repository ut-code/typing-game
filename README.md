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

1. プロジェクトフォルダに移動

1. `$ git clone git@github.com:ut-code/typing-game.git`

1. `$ cd typing-game`

1. `$ npm install`

1. `$ touch .env`

1. `.env` ファイルを設定

1. `$ npx prisma db push`

## サーバの起動(ビルドも自動実行)

1. `$ npm run demo`

## ディレクトリ構成

- `/root`
  - `/client` フロントエンド関係
    - `index.html`,`style.css`,`script.js`がメイン 基本的にはここをいじる。
  - `/server` バックエンド関係
    - `main.js` メイン
    - `finished.ejs` 結果ページ
  - `/prisma` Prisma のファイル
  - `/dist` `$ npm run demo` を実行すると、自動で作られる。編集はしない。
  - `/keyboard`,`/keyboard-layout-maker` サブモジュール これらのフォルダの中は別のリポジトリになっている。
