const bitcore = require("bitcore-lib");
const axios = require("axios");
require('dotenv').config();

const sourceAddress = process.env.SOURCE_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const receiverAddress = process.env.RECEIVER_ADDRESS;
const minimumbalance = 0.00000257;

(async () => {
    try {
        const resp = await axios.get(`https://blockstream.info/api/address/${sourceAddress}/utxo?unconfirmedOnly=true`);
        const utxos = resp.data;
        const balance = utxos.reduce((acc, utxo) => acc + utxo.value, 0) / 10 ** 8;
        if (balance >= minimumbalance) {
            const satoshiToSend = Math.floor(balance * 10 ** 8);
            let fee = 0;
            let inputCount = 0;
            let outputCount = 2;

            const transaction = new bitcore.Transaction();
            let totalAmountAvailable = 0;

            let inputs = [];

            for (const utxo of utxos) {
                let input = {};
                input.satoshis = utxo.value;
                input.script = bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex();
                input.address = sourceAddress;
                input.txId = utxo.txid;
                input.outputIndex = utxo.vout;
                totalAmountAvailable += utxo.value;
                inputCount += 1;
                inputs.push(input);
            }

            const transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount;

            fee = transactionSize * 1;

            const totalAmountToSend = satoshiToSend - fee;
            if (totalAmountAvailable < totalAmountToSend) {
                throw new Error("Balance is too low for this transaction");
            }
            transaction.from(inputs);
            transaction.to(receiverAddress, satoshiToSend - Math.round(fee));
            transaction.fee(Math.round(fee));
            transaction.sign(privateKey);
            const serializedTransaction = transaction.serialize();

            const result = await axios.post(`https://blockstream.info/api/tx`, serializedTransaction);

            console.log(result.data);
        } else {
            console.log(`Balance is too low (${balance} BTC) for this transaction.`);
        }
    } catch (error) {
        console.log(error.message);
    }
})();