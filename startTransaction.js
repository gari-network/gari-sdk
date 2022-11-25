const { startTransactions } = require('./api.js')
const { sdkValidate } = require('./sdkInitialize')

/**
 * 
 * @param {string} encodedTransaction - base64 string of transaction information
 * @param {string} token - jwt token for user information
 * @param {string} gariClientId - gariClientId of the app
 * @returns 
 */
async function startTransaction(encodedTransaction, token) {
    try {
        const validate = sdkValidate(`backend`)
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }
        const data = await startTransactions(encodedTransaction, token)
        return data
    } catch (error) {
        console.log('error while transactions', error)
        throw Error(error)
    }
}
module.exports = startTransaction