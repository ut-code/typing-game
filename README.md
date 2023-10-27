# タイピングゲーム

[![React](https://img.shields.io/badge/React-555.svg?logo=react)](https://github.com/facebook/react)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?logo=typescript&logoColor=white)](https://github.com/microsoft/TypeScript)
[![Vite](https://img.shields.io/badge/Vite-1e1e20.svg?logo=vite)](https://github.com/vitejs/vite)
[![CI](https://github.com/ut-code/typing-game/actions/workflows/ci.yml/badge.svg)](https://github.com/ut-code/typing-game/actions/workflows/ci.yml)
![license](https://img.shields.io/badge/license-MIT-informational.svg)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

<img src="frontend/public/logo.png" width="300">

第73回駒場祭企画 ウ タイピングゲーム

## 概要

これは、第73回駒場祭企画 ウ タイピングゲームです。

## 使い方

このWebアプリケーションを使用するには、[ここ](https://typing.utcode.net/)にアクセスしてください。

## 開発

### Dev Containersを用いない開発

#### 要件

- [npm](https://github.com/npm/cli)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

#### 環境構築

- このリポジトリをクローンしてから、プロジェクトのルートディレクトリに移動してください。

- `npm run setup`を実行してください。初期設定が行われます。

- `npm run dev`を実行してください。そうすると、開発環境が起動します。

- `backend/.env` に `backend/.env.sample` の内容をコピーしてください。

- 初回は、`cd backend`をしてから、`npm run db-push`をして、`npm run seed:develop`を実行してください。そうすると、データベースにテーブルが作成され、初期データが挿入されます。

- [http://localhost:5173/](http://localhost:5173/)でアプリケーションにアクセスできます。

### Dev Containersでの開発

#### 要件

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### 環境構築

- このリポジトリをクローンしてから、プロジェクトをVS Codeで開いてください。

- コマンドパレットから、`Dev Containers: Reopen in Container`を選択してください。そうすると、Dockerコンテナが起動して、開発環境が構築されます。初回は、コンテナのビルドにしばらく時間がかかります。

- 初回は、コンテナ上から`backend`ディレクトリに移動して、`npm run seed:develop`を実行してください。そうすると、初期データがデータベースに挿入されます。

- [http://localhost:5173/](http://localhost:5173/)でアプリケーションにアクセスできます。

<!-- ### その他の開発環境での開発

#### 要件

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

#### 環境構築

- このリポジトリをクローンしてから、プロジェクトのルートディレクトリに移動してください。

- `docker compose build`を実行してください。そうすると、Docker コンテナがビルドされます。初回は、コンテナのビルドにしばらく時間がかかります。

- `docker compose up`を実行してください。そうすると、Docker コンテナが起動して、開発環境が構築されます。

- 初回は、`docker compose exec backend bash -c "cd backend && npm run seed:develop"`を実行してください。そうすると、初期データがデータベースに挿入されます。

- [http://localhost:5173/](http://localhost:5173/)でアプリケーションにアクセスできます。 -->

### コミット前

コミット前には、以下のコマンドを実行して、コードスタイルと型のチェックを行ってください。

```shell
npm run lint && npm run type-check
```

## ライセンス

このソフトウェアは[MIT](./LICENSE)ライセンスのもとで公開されています。

Copyright © 2023 ut.code();.

## コントリビューション

IssueやPRなどはいつでも歓迎します。
