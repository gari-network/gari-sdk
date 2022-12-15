const { startTransactions } = require('./api.js')
const { sdkValidate } = require('./sdkInitialize')

/**
 * 
 * @param {string} encodedTransaction - base64 string of transaction information
 * @param {string} token - jwt token for user information
 * @returns 
 */
async function initiateTransaction(encodedTransaction, token) {
    try {
        const validate = sdkValidate(`backend`)
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }
        const transactionResponse = await startTransactions(encodedTransaction, token)
        return transactionResponse.data.signature;
    } catch (error) {
        console.log('error while transactions', error)
        throw Error(error)
    }
}
module.exports = initiateTransaction