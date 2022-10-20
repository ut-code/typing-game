# typing-game

<img src="frontend/src/components/logo.png" width="300">  
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
git clone --recursive git@github.com:ut-code/typing-game.git
```

```shell
cd typing-game
```

```shell
npm run setup:env
```

`.env` ファイルに `DATABASE_URL="データベースのURL"` と書く。

```shell
npm run setup
```

## サーバの起動(ビルドも自動実行)

`typing-game` ディレクトリに移動

```shell
npm run backend:dev
```

`Terminal` をもう一つ開く

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
    - `src`
      - `pages`
        - `Home`
          - `Home.tsx` , `script.js` , `style.css` を編集する。
          - `Basic`
            - `Home.tsx` , `script.js` , `style.css` を編集する。
    - `/dist` `$ npm run build` を実行すると、自動で作られる。編集はしない。
  - `/backend` バックエンド関係
    - `main.js` メイン
    - `finished.ejs` 結果ページ
    - `/prisma` Prisma のファイル
  - `/keyboard-layout-maker` サブモジュール これらのフォルダの中は別のリポジトリになっている。
