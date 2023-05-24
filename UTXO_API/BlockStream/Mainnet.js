const axios = require('axios');

const address = 'bc1qprdf80adfz7aekh5nejjfrp3jksc8r929svpxk'; // Enter Your Malinnet Address Here

// get UTXOs
axios.get(`https://blockstream.info/api/address/${address}/utxo`)
    .then(response => {
        const utxos = response.data;
        const balance = utxos.reduce((acc, utxo) => acc + (utxo.value / 10 ** 8), 0);
        console.log(utxos);
        console.log(`${balance} BTC`);
    })

