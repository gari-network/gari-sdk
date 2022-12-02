# gari-sdk
Infra service for easy migration to Web3

## 💡 Features 

- Create a wallet for a user
- fetch wallet details and balance for a particular user
- Send tokens from one wallet to another
- fetch transaction history by wallet pub key
- fetch transaction details by txn id
- Client can Airdrop tokens to multiple users

## ⚡ Quick Start

### Installation

```shell
npm install --save gari
```

```js
import * as gari from 'gari'
```

### Method List
- sdkInitialize
- createWalletOrGetWallet
- transferGariToken
- airdrop
- initiateTransaction
- getTransactions
- getTransactionById

## Frontend Methods
### Initialize gari library
```js
/**
 * @description 
 * @param {string} clientId 
 */
gari.sdkInitialize(clientId)
```

### createWallet Or GetWallet
Get wallet/ create wallet for user.

Token format supported:
[here](https://web3auth.io/docs/custom-authentication/byo-jwt-providers)

Note: web3 auth popup will come first time for user while wallet creation, from next time this function will directly return data

```js
/**
 * @param {string} token
 */
gari.createWalletOrGetWallet(token)
 
return {
publicKey:’sample publickey’,
balance:0
} 
```

### transferGariToken
Send token from user to another user. This method will return encoded transaction which client has to send to its backend for validation and its backend will forward it to chingari for processing.

```js
/**
 * @param {string} token
 * @param {string} toPublicKey
 * @param {number} amount
 * @returns 
 */
gari.transferGariToken(token,toPublicKey, amount)

return
{
transaction:’base64 Encoded Tranaction’
}
```

## Backend Methods

### Initialize gari library
```js
/**
 * @description if using in backend, need to pass gariSecretKey
 * @param {string} clientId 
 * @param {string?} secerateKey 
 */
gari.sdkInitialize(clientId,secerateKey)
```

### airdrop
this method will give specific gari amount to users as a rewards. 
```js
/**
 * @param {string} publicKey 
 * @param {number} amount 
 * @param {string} token 
 * @returns 
 */
gari.airdrop(publicKey,amount,token)

return
{
id:’’,
signature:'EJ3FktdZhsNbDMamvSygi2wLfjBgisWzF1iNecdckQVmsdgEJ3FktdZhsNbDMamvSygi2wLfjBgisWzF1iNecdckQVm',
status:’draft|pending|success|failed’,
message:’’
}
```

### initiateTransaction 
This method will validate transaction details and return siganture that will pass to blockchain.

```js
/**
 * @param {string} encodedTransaction 
 * @param {string} token 
 */
gari.initiateTransaction(encodedTransaction,token)

return 
{
siganature:'EJ3FktdZhsNbDMamvSygi2wLfjBgisWzF1iNecdckQVmsdgEJ3FktdZhsNbDMamvSygi2wLfjBgisWzF1iNecdckQVm'
}
```

### getTransactions
this method will give all transactions of clients. 

```js
/**
 * @param {object} filter 
 * @param {number} skip 
 * @param {number} limit 
 * @param {string} sorting 
 * @param {string} token 
 * @returns 
 */
gari.getTransactions(filter,skip,limit,sorting,token)

filter
{
fromPublicKey:’’,
toPublicKey:’’,
Status:’’,
case:’’
}

return
[{
id:’’,
signature:'EJ3FktdZhsNbDMamvSygi2wLfjBgisWzF1iNecdckQVmsdgEJ3FktdZhsNbDMamvSygi2wLfjBgisWzF1iNecdckQVm',
status:’draft|pending|success|failed’,
amount:number,
meta:string,
date:Date
}]
```

### getTransactionById
this method will return only transaction by their id.


```js
/**
 * @param {string} transactionId 
 * @param {string} token
 * @returns 
 */
gari.getTransactionById(transactionId,token)

return
{
id:’’,
signature:'EJ3FktdZhsNbDMamvSygi2wLfjBgisWzF1iNecdckQVmsdgEJ3FktdZhsNbDMamvSygi2wLfjBgisWzF1iNecdckQVm',
status:’draft|pending|success|failed’,
amount:number,
meta:string,
date:Date
}
```

## 🌐 Demo
Checkout the [gari Demo](https://gari-sdk-front-end.vercel.app/) to see how gari can be used in your application.