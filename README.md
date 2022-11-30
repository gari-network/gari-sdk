# gari-sdk
Infra service for easy migration to Web3

## 📖 Documentation


## ⚡ Quick Start

### Installation

```shell
npm install gari
```

```js
import * as gari from 'gari'

```

### Initialize gari library
```js
gari.initialize(clientId:string)

```

### importing gari functions
Get wallet/ create wallet for user.

Token format supported:
[here](https://web3auth.io/docs/custom-authentication/byo-jwt-providers)

Note: web3 auth popup will come first time for user while wallet creation, from next time this function will directly return data

```js
gari.createWalletOrGetWallet(token:string)
 
return {
publicKey:’sample publickey’,
balance:0
} 

```




## 🌐 Demo
Checkout the [gari Demo]() to see how Web3Auth can be used in your application.