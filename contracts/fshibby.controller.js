const logger = require('loglevel');
const fshibby = require('./fshibby');
const constants = require('../constants/constants');

const allowSignUp = {
    isEligible: false,
    sweepLink: " "
};

async function getBalance(tokenHolderAddress) {
    logger.info('Token holder address: ' + tokenHolderAddress);
    try {
        let balance = await fshibby.checkTokenBalance(tokenHolderAddress);
        allowSignUp.isEligible = isAddressEligible(balance);

        if (allowSignUp.isEligible) {
            allowSignUp.sweepLink = "https://sweepwidget.com/view/45130-z7wiqt1j";
        } else {
            allowSignUp.sweepLink = "https://pancakeswap.finance/swap?outputCurrency=0x9a21477b4e9ea5f7946d75876a186a1194559828";
        }

        return allowSignUp;
    } catch (e) {
        logger.warn('checkTokenBalance method called has thrown and error');
        console.log('There has been an issue: ' + e.message);
    }
};

function isAddressEligible(balance) {
    let isEligible = false;

    if (balance >= constants.BALANCETRESHOLD) {
        return isEligible = true;
    } else {
        return isEligible;
    }
}

module.exports = { getBalance };