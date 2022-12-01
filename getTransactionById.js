const { getTransactionByid } = require('./api.js')
const { sdkValidate } = require('./sdkInitialize')


/**
 * 
 * @param {string} transactionId - id of the transaction 
 * @param {string} token - jwt token for user information
 * @returns 
 */
async function getTransactionsByID(transactionId, token) {
    try {
        const validate = sdkValidate(`backend`)
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }
        const data = await getTransactionByid(transactionId, token)
        return data
    }
    catch (err) {
        console.log("error in getTransactionsById function ", err);
        throw Error(err)
    }
}
module.exports = getTransactionsByID