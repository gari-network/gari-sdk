const { getAirdrop, getEncodeTransactionAirdrop } = require('./api.js')
const { sdkValidate } = require('./sdkInitialize')
const { getDecodedTransction, partialSign, } = require('./gariHelper')

/**
 * 
 * @param {airdropData} airdropData - contains publickeys and tokenAmount and tokenToTransfer
 * @param {string} senderWalletPrivateKey - for partial signing on transaction 
 * @param {string} feepayerWalletPrivateKey - wallet for paying fee for airdrop transaction 
 * @param {string} jwtToken - jwt token for user information
 * @returns 
 */
async function airDrop(airdropData, senderWalletPrivateKey, feepayerWalletPrivateKey, jwtToken) {
    try {
        const validate = sdkValidate(`backend`)
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }

        // first get encoded transaction details in toString('base64)
        const encodeTransactionInstruction = await getEncodeTransactionAirdrop(
            airdropData,
            jwtToken
        );

        const transactionDetailsWithoutSignatures = getDecodedTransction(
            encodeTransactionInstruction.data.data
        );

        // sign transaction 
        const completeSignedTransaction = await partialSign(transactionDetailsWithoutSignatures, senderWalletPrivateKey, feepayerWalletPrivateKey);

        const airdropResponse = await getAirdrop(airdropData, completeSignedTransaction, jwtToken);
        return airdropResponse.data.data;
    } catch (error) {
        console.log('getting error while airDrop', error)
        throw Error(error)
    }
}
module.exports = airDrop