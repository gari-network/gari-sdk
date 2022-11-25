const { getTransaction } = require('./api.js')
const { sdkValidate } = require('./sdkInitialize')

/**
 * 
 * @param {object} filter 
 * @param {number} skip 
 * @param {number} limit 
 * @param {string} sorting 
 * @param {string} token 
 * @returns 
 */
async function getTransactions(filter, skip, limit, sorting, token) {
    try {
        const validate = sdkValidate(`backend`)
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }
        paginationData = {
            filter, skip, limit, sorting
        }
        const data = await getTransaction(paginationData, token)
        return data
    } catch (error) {
        console.log('error getting transactions', error)
        throw Error(error)
    }

}
module.exports = getTransactions