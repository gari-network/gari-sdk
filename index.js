const getTransactionsByID = require('./getTransactionById.js')
const getTransactions = require('./getTransactions.js')
const createWalletOrGetWallet = require('./getWalletDetails.js')
const airDrop = require('./getAirdrop.js')
const startTransaction = require('./startTransaction.js')
const transferGariToken = require('./transferGariToken.js')
const { sdkInitialize } = require('./sdkInitialize.js')

module.exports = {
    // backend and frontend common methods
    sdkInitialize,

    // backend methods
    airDrop,
    startTransaction,
    getTransactionsByID,
    getTransactions,

    // frontend methods
    createWalletOrGetWallet,
    transferGariToken,
}