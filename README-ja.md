# Prox server for Nature Remo Local API

[Nature Remo](https://nature.global/nature-remo/) の [Local API](https://local-swagger.nature.global/)
には以下の問題があります。

* HTTP OPTIONS メソッドに応答しない
* リクエストに多くの HTTP ヘッダがあると応答しない

したがって、fetch API などから Remo の Local API を呼ぶためには、HTTP OPTIONS メソッドに応答し、リクエストヘッダを減らしてから API を呼ぶようなプロキシサーバーが必要になります。このアプリケーションはこれを実現するプロキシサーバーです。

## 使い方

まず、必要なモジュールをインストールします。

```sh
npm ci
```

次に、`config/default.json` をコピーして `config/production.json` を作成します。そして、必要に応じて `config/production.json` の設定値を変更します。設定値の意味は以下のとおりです。

名前 | 型 | 説明
--- | --- | ---
`httpServer.port` | `number` | プロキシサーバーが利用するポート番号
`httpServer.accessControlAllowOrigin` | `string` | CORS リクエストが応答するオリジン。指定した値がレスポンスヘッダの `access-control-allow-origin` に設定される。
`remoLocalApiOrigin` | `string` | Remo Local API のオリジン。（例: `'http://192.168.1.10'`）

> 参考: `config/default.json` と同じ内容であれば当該の項目は `config/production.json` になくても構いません。

設定したら、以下のコマンドでプロキシサーバーが起動します。

```sh
NODE_ENV=production node index.js
```

これで Remo Local API に対するリクエストをこのサーバーの指定したポートに対するリクエストでプロキシすることができます。
