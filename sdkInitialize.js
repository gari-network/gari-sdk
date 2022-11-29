const envConfig = require('./config.js')
/**
 * @description if using in backend, need to pass gariSecretKey
 * @param {string} gariClientId 
 * @param {string?} gariSecretKey 
 */
function sdkInitialize(gariClientId, gariSecretKey) {
    envConfig.setConfig(gariClientId, gariSecretKey)
    const configData1 = envConfig.getConfig()
    console.log('configData1', configData1)
}

function sdkValidate(type) {
    const configData = envConfig.getConfig()
    if (!configData.gariClientId) {
        return false
    }
    if (type == `backend` && !configData.secretKey) {
        return false
    }
    return true
}
module.exports = { sdkInitialize, sdkValidate }