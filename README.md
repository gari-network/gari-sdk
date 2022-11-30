# gari-sdk
Infra service for easy migration to Web3

## 💡 Features 

- Create a wallet for a user
- Get wallet details and balance for a particular user
- Poll for wallet creation success
- Send tokens from one wallet to another
- Get instructions in an encoded format and a helper function to decode the same
- Poll for transaction success
- Get transaction history by wallet pub key
- Get transaction details by txn id
- Client can Airdrop tokens to multiple users

## ⚡ Quick Start

### Installation

```shell
npm install --save gari
```

```js
import * as gari from 'gari'
```
## Frontend Mtehods
### Initialize gari library
```js
gari.initialize(clientId:string,secerateKey:string)
```

### createWalletOrGetWallet
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

### transferGariToken
Send token from user to another user. This method will return encoded transaction which client has to send to its backend for validation and its backend will forward it to chingari for processing.

```js
gari.getSendTokenTransaction(token:string,toPublicKey:string, amount:lamports)

return :
{
transaction:’base64 Encoded Tranaction’
}
```

## Backend Mtehods
### airdrop
this method will give specific gari amount to users as a rewards, this method will use in backend service 
only

```js
gari.airdrop(publicKey:string,amount:number[lambports],privateKey:string[of backend application, eg: ludo])

Return sample:
{
id:’’,
signature:’asas’,
status:’draft|pending|success|failed’,
message:’’
}
```

### startTransaction 
This method is helper function to do validation on transaction before sending it to chingari to process
this method will use in backend service only

```js
gari.getDetailsFromEncodedTransaction(encodedTransaction:string)

return 
{
siganature:'asas'
}
```

### getTransactions
this method will give all transactions of clients. this method will use in backend service only

```js
gari.getTransactions(filter:object,skip:number,limit:number)

filter
[{
fromPublicKey:’’,
toPublicKey:’’,
Status:’’,
case:’’
}]

return
[{
id:’’,
signature:’asas’,
status:’draft|pending|success|failed’,
amount:number,
meta:string,
date:Date
}]
```

### getTransactionById
this method will return only transaction by their id. this method will use in backend service only


```js
gari.getTransactionById(id:string)

return
{
id:’’,
signature:’asas’,
status:’draft|pending|success|failed’,
amount:number,
meta:string,
date:Date
}
```

## 🌐 Demo
Checkout the [gari Demo](https://gari-sdk-front-end.vercel.app/) to see how gari can be used in your application.