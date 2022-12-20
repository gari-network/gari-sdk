const { getAirdrop, getEncodeTransactionAirdrop } = require('./api.js')
const { sdkValidate } = require('./sdkInitialize')
const { getDecodedTransction, partialSign, } = require('./gariHelper')

/**
 * 
 * @param {string} publicKey - user publickey which we will give airdrop rewards 
 * @param {string} airdropAmount - amount of airdrop reward to user
 * @param {string} token - jwt token for user information
 * @param {string} fromWalletPrivateKey - private key of app 
 * @returns 
 */
async function airDrop(publicKey, airdropAmount, token, fromWalletPrivateKey) {
    try {
        const validate = sdkValidate(`backend`)
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }

        const airDropdata = {
            publicKey, airdropAmount
        }

        // first get encoded transaction details in toString('base64)
        const encodeTransactionInstruction = await getEncodeTransactionAirdrop(
            airDropdata,
            token
        );

        // decode transaction data :
        const transactionDetailsWithoutSignatures = getDecodedTransction(
            encodeTransactionInstruction.data.data
        );

        // gari clients partial sign 
        const partialSignedTransaction = await partialSign(transactionDetailsWithoutSignatures, fromWalletPrivateKey)

        const airdropResponse = await getAirdrop(publicKey, airdropAmount, partialSignedTransaction, token);
        return airdropResponse.data.data;
    } catch (error) {
        console.log('getting error while airDrop', error)
        throw Error(error)
    }
}
module.exports = airDrop