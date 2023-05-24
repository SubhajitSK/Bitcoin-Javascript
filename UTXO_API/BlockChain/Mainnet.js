const axios = require('axios');

const address = 'bc1qprdf80adfz7aekh5nejjfrp3jksc8r929svpxk'; // Enter Your Mainnet Address Here

const getUnspentTransactions = async () => {
    const resp = await axios.get(`https://blockchain.info/unspent?active=${address}`);
    return resp.data.unspent_outputs;
};

(async () => {
    const utxos = await getUnspentTransactions();
    const balance = utxos.reduce((acc, utxo) => acc + (utxo.value / 10 ** 8), 0); // Convert from satoshis to BTC
    console.log(utxos);// get UTXOs
    console.log(`${balance} BTC`);//Get Balance
})();

