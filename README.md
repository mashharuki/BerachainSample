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

### 参考文献

1. [公式サイト](https://www.berachain.com/)
2. [Create HelloWorld Contract](https://docs.berachain.com/developers/guides/create-helloworld-contract-using-hardhat)
