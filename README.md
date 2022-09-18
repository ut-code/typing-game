# typing-game

駒場祭のタイピングゲーム

## Node のインストール

[ut.code(); Learn](https://learn.utcode.net/docs/web-servers/node-js/)を参照

### アップデート

#### Node のアップデート

```shell
nvm install --lts
```

#### npm のアップデート

```shell
npm install -g npm
```

## Git と GitHub のセットアップ

[ut.code(); Learn](https://learn.utcode.net/docs/web-servers/git-github/)を参照

## セットアップ

プロジェクトフォルダに移動

```shell
git clone git@github.com:ut-code/typing-game.git
```

```shell
git submodule update --init --recursive
```

```shell
cd typing-game/frontend
```

```shell
npm install
```

```shell
cd ../backend
```

```shell
npm install
```

```shell
echo 'DATABASE_URL=""' > .env
```

`.env` ファイルに `DATABASE_URL="データベースのURL"` と書く。

```shell
npx prisma db push
```

## サーバの起動(ビルドも自動実行)

`typing-game` ディレクトリに移動

```shell
cd backend
```

```shell
npm run dev
```

`Terminal` をもう一つ開く

`typing-game` ディレクトリに移動

```shell
cd frontend
```

```shell
npm run dev
```

ブラウザで [`http://127.0.0.1:5173/`](http://127.0.0.1:5173/) にアクセスすると、表示されるはずです。

## ディレクトリ構成

- `/root`
  - `/frontend` フロントエンド関係
    - `index.html`,`style.css`,`script.js`がメイン 基本的にはここをいじる。
    - `/dist` `$ npm run dev` を実行すると、自動で作られる。編集はしない。
    - `/src` React 用のフォルダ ここからサブモジュールに追加したキーボードを読み込んでいる。
  - `/backend` バックエンド関係
    - `main.js` メイン
    - `finished.ejs` 結果ページ
    - `/prisma` Prisma のファイル
  - `/keyboard`,`/keyboard-layout-maker` サブモジュール これらのフォルダの中は別のリポジトリになっている。
