
const web3 = require('@solana/web3.js')
const { findThisPublicKey, } = require('./api.js')
const { sdkValidate } = require('./sdkInitialize.js')

/**
 * 
 * @param {string} encodedTransction - base64 string of transaction instruction
 * @returns 
 */
function getDecodedTransction(encodedTransction) {
    let encodedTransctionInBuffer = Buffer.from(encodedTransction, 'base64'); // get encoded buffer
    return web3.Transaction.from(encodedTransctionInBuffer);
}

/**
 * 
 * @param {string} transactionDetails - base64 string of transaction
 * @param {string} privateKey - privateKey of user : it should be in hex format 
 * @param {feepayerWalletPrivateKey} feepayerWalletPrivateKey - feepayer wallet for final signature on transaction
 * @returns 
 */
function partialSign(transactionDetails, privateKey, feepayerWalletPrivateKey=undefined) {

    // hex is used bcoz web3auth provides privatekey in hex format
    let signerWallet = web3.Keypair.fromSecretKey(Buffer.from(privateKey, "hex"));
    transactionDetails.partialSign(...[signerWallet]);

    if(feepayerWalletPrivateKey) {
        let feepayerWallet = web3.Keypair.fromSecretKey(Buffer.from(feepayerWalletPrivateKey, "hex"));
        transactionDetails.partialSign(...[feepayerWallet]);
    }

    const wireTransaction = transactionDetails.serialize({
        requireAllSignatures: true,
        verifySignatures: false,
    });

    return wireTransaction.toString('base64');
}

/**
 * 
 * @param {string} publickey - publickey of the user which we need to verify  
 * @returns 
 */
async function verifyPublicKey(publicKey, jwtToken) {
    try {
        const validate = sdkValidate()
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }

        let receiverPublicKey;
        const {data} = await findThisPublicKey(publicKey, jwtToken);
        if(data.data && data.data.publicKey) {
            receiverPublicKey =  data.data.publicKey;
        }
        return receiverPublicKey;
    } catch (error) {
        console.log('error in verify publickey function', error);
    }
}

module.exports = { partialSign, getDecodedTransction, verifyPublicKey }

