window.onload = function() {
    document.getElementById("eligible-link").style.display = 'none';
    document.getElementById("eligible-link-step").style.display = 'none';
    document.getElementById("buy-fshibby").style.display = 'none';

    const modal = document.getElementById("no-metamask");
    const span = document.getElementsByClassName("close-modal")[0];
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
            modal.style.display = "block";
        }
    });

    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};


async function isAccountEligible(account) {
    // let url = new URL('http://localhost:8080/getBalance'); // local environment
    let url = new URL('https://win.findshibby.cash/getBalance'); // prod
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
        document.getElementById("eligible-link").style.display = 'block';
        document.getElementById("eligible-link-step").style.display = 'block';
        document.querySelector(".sweep-link").href = allowSignUp.sweepLink;
    } else {
        document.getElementById("buy-fshibby").style.display = 'block';
        document.querySelector(".buy-fshibby-link").href = allowSignUp.sweepLink;
    }
};

