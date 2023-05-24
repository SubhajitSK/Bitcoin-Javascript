const axios = require('axios');

const address = 'bc1qprdf80adfz7aekh5nejjfrp3jksc8r929svpxk'; // Enter Your Malinnet Address Here

axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}?unspentOnly=true`)
    .then(response => {
        const utxos = response.data;
        console.log(utxos); // get UTXOs

        const balance = utxos.balance / 10 ** 8; // Convert from satoshis to BTC
        console.log('Balance:', balance); //Get Balance
    });
