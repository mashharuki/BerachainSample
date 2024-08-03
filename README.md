# BearchainSample

Bearchain で開発するための学習用リポジトリです。

## 動かし方

```bash
cd backend
```

- 初期設定

  ```bash
  npx hardhat resetContractAddressesJson --network artio_testnet
  ```

- テスト

  ```bash
  yarn test
  ```

- デプロイ

  ```bash
  yarn deploy:artio_testnet
  ```

  ```bash
  unlockTime: 1712931810
  Lock with 0.001ETH and unlock timestamp 1712931810 deployed to 0x2B5914De5D5166eBaa423C92BAb8518c85EAA0cb
  ✨  Done in 15.58s.
  ```

- Verify

  ```bash
  verify:artio_testnet
  ```

  ```bash

  ```

  Verify 済みコントラクト

  [0x2B5914De5D5166eBaa423C92BAb8518c85EAA0cbå](https://artio.beratrail.io/address/0x2B5914De5D5166eBaa423C92BAb8518c85EAA0cb/contract/80085/code)

- task の動かし方

  ```bash
  npx hardhat getOwner --network artio_testnet
  ```

  ```bash
  ========================================== [START] ==========================================
  owner address: 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072
  ========================================== [END] ==========================================
  ```

### 参考文献

1. [公式サイト](https://www.berachain.com/)
2. [Create HelloWorld Contract](https://docs.berachain.com/developers/guides/create-helloworld-contract-using-hardhat)
3. [EVM 互換の新 L1 ブロックチェーン「Berachain」、SAFT で約 56 億円を調達](https://coinpost.jp/?p=453990)
4. [ベラチェーンとは何ですか?](https://www.gate.io/ja/learn/articles/what-is-berachain/315)
5. [Berachain ってどんなチェーン？](https://note.com/viwashi_/n/ndda701e1605b)
6. [プログラム取引に挑戦 🐻⛓Berachain トランザクションハンズオン 🙌](https://cosmosjapan.notion.site/Berachain-361cd7b5df824c1bb3bcdcd5721bfbd5)
