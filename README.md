# typing-game

駒場祭のタイピングゲーム

### セットアップ

1. `$ npm install`

1. `.env` ファイルを設定

3. `$ npx prisma db push`

### サーバの起動(ビルドも自動実行)

1. `$ npm run demo`


### ディレクトリ構成
+ `/root`
  + `/client` フロントエンド関係
  + `/server` バックエンド関係
  + `/prisma` Prismaのファイル
  + `/dist` `$ npm run demo` を実行すると、自動で作られる。編集はしない。
