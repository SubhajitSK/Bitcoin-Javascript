const axios = require('axios');

const address = 'mgtvqUcBFqEZBqXrTeEYbmZjH5q8q6UDrk'; // Enter Your Testnet Address Here

// get UTXOs
axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}?unspentOnly=true`)
    .then(response => {
        const utxos = response.data;
        console.log(utxos); // get UTXOs

        const balance = utxos.balance / 10 ** 8; // Convert from satoshis to BTC
        console.log('Balance:', balance); //Get Balance
    });


