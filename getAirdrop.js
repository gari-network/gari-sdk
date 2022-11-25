const { getAirdrop } = require('./api.js')
const { sdkValidate } = require('./sdkInitialize')

/**
 * 
 * @param {string} publicKey - user publickey which we will give airdrop rewards 
 * @param {string} balance - amount of airdrop reward to user
 * @param {string} token - jwt token for user information
 * @returns 
 */
async function airDrop(publicKey, airdropAmount, token) {
    try {
        const validate = sdkValidate(`backend`)
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }
        const airDropdata = {
            publicKey, airdropAmount
        }
        const data = await getAirdrop(airDropdata, token)
        return data
    } catch (error) {
        console.log('getting error while airDrop', error)
        throw Error(error)
    }
}
module.exports = airDrop