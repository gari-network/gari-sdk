# gari-sdk
This SDK is an easy-to-use wallet service that a client can use to enable their users to have
their wallet within their application and do on-chain transactions within their app

## 💡 Features 

- Create a wallet for a user
- fetch their wallet details and balance for a particular user
- Send gari tokens from one wallet to another
- fetch their transaction details by txn id
- The Client can Airdrop gari tokens to its users

## ⚡ Quick Start

### Installation

```shell
npm install gari
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
Get a wallet or create a wallet for the user.

Token format supported:
[here](https://web3auth.io/docs/custom-authentication/byo-jwt-providers)

Note: web3 auth popup will occur initially for the user during wallet creation, next time this function will directly return data

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
Send a gari token to another user. This will return an encoded transaction that the client has to send to its backend for validation and will forward it to chingari for processing.

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
transaction:’base64 Encoded Transaction’
}
```

## Backend Methods

### Initialize gari library
```js
/**
 * @description if using in the backend, need to pass gariSecretKey
 * @param {string} clientId 
 * @param {string?} secerateKey 
 */
gari.sdkInitialize(clientId,secerateKey)
```

### airdrop
the client will airdrop gari tokens to its users as a reward. 
```js
/**
 * @param {string} publicKey 
 * @param {number} amount 
 * @param {string} token 
 * @param {string} fromWalletPrivateKey 
 * @returns 
 */
gari.airdrop(publicKey,amount,token,fromWalletPrivateKey)

return
{
id:’’,
signature:'EJ3FktdZhsNbDMamvSygi2wLfjBgisWzF1iNecdckQVmsdgEJ3FktdZhsNbDMamvSygi2wLfjBgisWzF1iNecdckQVm',
status:’draft|pending|success|failed’,
message:’’
}
```

### initiateTransaction 
This method will validate transaction details and return signatures.

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
this will give all client-related transactions to sdk Client. 

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
this will return a specific transaction by a particular id.


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
Check out the [gari Demo](https://demo-gari-sdk.vercel.app/) to see how gari can be used in your application.
Demo [Source code](https://github.com/gari-network/demo-gari-sdk)
