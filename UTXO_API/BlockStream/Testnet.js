const axios = require('axios');

const address = 'mnqZv5YEk4Q334EceGgzr4J8EnMNxAShk1'; // Enter Your Testnet Address Here


axios.get(`https://blockstream.info/testnet/api/address/${address}/utxo`)
    .then(response => {
        const utxos = response.data;
        const balance = utxos.reduce((acc, utxo) => acc + (utxo.value / 10 ** 8), 0); // Convert from satoshis to BTC
        console.log(utxos); // get UTXOs
        console.log(`${balance} BTC`); //Get Balance
    })

