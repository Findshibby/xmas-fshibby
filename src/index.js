window.onload = function() {
    const ethereumButton = document.querySelector('.enableEthereumButton');

    ethereumButton.addEventListener('click', () => {
        if (typeof window.ethereum !== 'undefined') {
            getAccount();
        } else {
            alert('Please install MetaMask');
        }
    });

    document.getElementById("eligible-link").style.display = 'none';
    document.getElementById("eligible-link-step").style.display = 'none';
    document.getElementById("buy-fshibby").style.display = 'none';
};

async function isAccountEligible(account) {
    let url = new URL('http://localhost:3000/getBalance'); // local environment
    // var url = new URL('placeholder for prod url'); // prod
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


// https://pancakeswap.finance/swap?outputCurrency=0x9a21477b4e9ea5f7946d75876a186a1194559828
// https://sweepwidget.com/view/45130-z7wiqt1j
//   //Smart contract functions
//   function registerSetInfo() {
//     info = $("#newInfo").val();
//     contract.methods.setInfo (info).send( {from: account}).then( function(tx) {
//       console.log("Transaction: ", tx);
//     });
//     $("#newInfo").val('');
//   }
  
//   function registerGetInfo() {
//     contract.methods.getInfo().call().then( function( info ) {
//       console.log("info: ", info);
//       document.getElementById('lastInfo').innerHTML = info;
//     });
//   }
