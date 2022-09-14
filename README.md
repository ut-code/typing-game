# typing-game

駒場祭のタイピングゲーム

### Nodeのインストール

[ut.code(); Learn](https://learn.utcode.net/docs/web-servers/node-js/)を参照

### Nodeのアップデート

```
nvm install --lts
```

### npmのアップデート

```
npm install -g npm
```

### セットアップ

1. プロジェクトフォルダに移動

1. `$ git clone git@github.com:ut-code/typing-game.git`

1. `$ cd typing-game`

1. `$ npm install`

1. `.env` ファイルを設定

1. `$ npx prisma db push`

### サーバの起動(ビルドも自動実行)

1. `$ npm run demo`

### ディレクトリ構成

- `/root`
  - `/client` フロントエンド関係
  - `/server` バックエンド関係
  - `/prisma` Prisma のファイル
  - `/dist` `$ npm run demo` を実行すると、自動で作られる。編集はしない。
