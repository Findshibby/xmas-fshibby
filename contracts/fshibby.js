const logger = require('loglevel');
const constants = require('../constants/constants');
const Web3 = require('web3');

const web3 = new Web3(constants.BSCMAINNET); //BSC Mainnet 
const Contract = new web3.eth.Contract(constants.ABI, constants.CONTRACTADDRESS); //Token FindShibby

async function checkTokenBalance(addressToCheck) {
    logger.info('calling contract method balanceOf to verify the balance held on: ' + addressToCheck);
    let tokenBalance = await Contract.methods.balanceOf(addressToCheck).call();

    if (tokenBalance === null || tokenBalance === undefined) {
        logger.warn('contract call balanceOf returned either null or undefined');
        throw new Error('Contract call to get balanceOf ' + addressToCheck + ' has failed.');
    }

    tokenBalance = tokenBalance / (10**18);
    logger.info('Current token balance of ' + addressToCheck + ' is: ' + tokenBalance);
    return tokenBalance
}

module.exports = { checkTokenBalance };