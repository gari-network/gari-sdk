const { startTransactions } = require('./api.js')
const { sdkValidate } = require('./sdkInitialize')

/**
 * 
 * @param {string} encodedTransaction - base64 string of transaction information
 * @param {transactionData} transactionData - sender/receiver publickeys and amountToTransfer and tokenToTransfer
 * @param {string} jwtToken - jwt token for user information
 * @returns 
 */
async function initiateTransaction(encodedTransaction, transactionData, jwtToken) {
    try {
        const validate = sdkValidate(`backend`)
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }
        const transactionResponse = await startTransactions(encodedTransaction, transactionData, jwtToken)
        return transactionResponse.data.data;
    } catch (error) {
        console.log('error while transactions', error)
        throw Error(error)
    }
}
module.exports = initiateTransaction