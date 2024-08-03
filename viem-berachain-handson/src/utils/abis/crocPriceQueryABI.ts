export const crocPriceQueryABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "base",
        "type": "address"
      },
      {
        "name": "quote",
        "type": "address"
      },
      {
        "name": "poolIdx",
        "type": "uint256"
      }
    ],
    "name": "queryPrice",
    "outputs": [
      {
        "name": "",
        "type": "uint128"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];