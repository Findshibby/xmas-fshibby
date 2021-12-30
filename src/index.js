window.onload = function() {
    document.getElementById("eligible-link").style.display = 'none';
    document.getElementById("eligible-link-step").style.display = 'none';
    document.getElementById("buy-fshibby").style.display = 'none';

    const ethereumButton = document.querySelector('.enableEthereumButton');

    ethereumButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            await getAccount();
            document.querySelector('.stepOneText').classList.add('stepDone');
            ethereumButton.classList.add('connectedEthereumButton');
            ethereumButton.innerText = 'Wallet Connected!';
            document.querySelector('.steps').classList.remove('stepsBackgroundFirstStep');
            document.querySelector('.steps').classList.add('stepsBackgroundSecondStep');
        } else {
            alert('Please install MetaMask');
        }
    });

};

async function isAccountEligible(account) {
    
    let url = new URL('https://xmas-fshibby-vg5sg.ondigitalocean.app/getBalance'); // prod
    let params = {addressToCheck:account};

    url.search = new URLSearchParams(params).toString();

    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function getAccount() {
    const showAccount = document.querySelector('.showAccount');
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    showAccount.innerHTML = account;

    

    let allowSignUp = await isAccountEligible(account);

    if (allowSignUp.isEligible) {
        document.querySelector(".sweep-link").href = allowSignUp.sweepLink;
        document.getElementById("eligible-link").style.display = 'block';
        document.getElementById("eligible-link-step").style.display = 'block';
    } else {
        document.querySelector(".sweep-link").href = allowSignUp.sweepLink;
        document.getElementById("buy-fshibby").style.display = 'block';
    }
};

