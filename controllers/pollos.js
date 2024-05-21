require('dotenv').config({path:require('find-config')('.env')})
const {ethers} = require('ethers')
const contract = require('../artifacts/contracts/Pollo.sol/Pollos.json');


const {
    API_URL,
    PRIVATE_KEY ,
    PUBLIC_KEY ,
    POLLO_ADDRESS 
} = process.env 

//console.log('POLLO_ADDRESS:', POLLO_ADDRESS);

async function createTransaction(provider, method, param){
    const etherInterface = new ethers.utils.Interface(contract.abi)
    const nonce = await provider.getTransactionCount(PUBLIC_KEY, 'latest')
    const gasPrice = await provider.getGasPrice();
    const network = await provider.getNetwork();
    const {chainId} = network;
    const transaction = {
        from: PUBLIC_KEY ,
        to: POLLO_ADDRESS,
        nonce,
        chainId,
        gasPrice,
        data: etherInterface.encodeFunctionData(method,param)
    }
    return transaction
}

async function CreatePollo(color, size, sexo, precio, cantidadExistencia) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const transaction = await createTransaction(provider, "addPollo", [color, size, sexo, precio, cantidadExistencia]);
    const estimateGas = await provider.estimateGas(transaction);
    transaction["gasLimit"] = estimateGas;
    const singedTx = await wallet.signTransaction(transaction);
    const transactionReceipt = await provider.sendTransaction(singedTx)
    await transactionReceipt.wait()
    const hash = transactionReceipt.hash;
    console.log("Transaction hash",hash)
    const receipt = await provider.getTransactionReceipt(hash)
    return receipt;
}

async function getPollos(){
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const pollos_contract = new ethers.Contract(
        POLLO_ADDRESS,
        contract.abi,
        provider
    )
    const result = await pollos_contract.getAllPollo()
    var pollo = []
    result.forEach((element) => {
        pollo.push(formatPollo(element)); 
    });
    return pollo; 
}

async function getPollo(polloId){
    const provider = new ethers.providers.JsonRpcProvider(API_URL)
    const polloContract = new ethers.Contract(
        CHOCOLATE_ADDRESS,
        contract.abi,
        provider
    )
    const result = await polloContract.getPolloById(polloId);
    return formatPollo(result)
}

async function updatePollo(polloId, color, size, sexo, precio, cantidadExistencia) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const transaction = await createTransaction(provider, "updatePollo", [polloId, color, size, sexo, precio, cantidadExistencia]);
    const estimateGas = await provider.estimateGas(transaction);
    transaction["gasLimit"] = estimateGas;
    const signedTx = await wallet.signTransaction(transaction);
    const transactionReceipt = await provider.sendTransaction(signedTx);
    await transactionReceipt.wait();
    const hash = transactionReceipt.hash;
    console.log("Transaction hash", hash);
    const receipt = await provider.getTransactionReceipt(hash);
    return receipt;
}


async function deletePollo(polloId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const transaction = await createTransaction(provider, "deletePollo", [polloId]);
    const estimateGas = await provider.estimateGas(transaction);
    transaction["gasLimit"] = estimateGas;
    const signedTx = await wallet.signTransaction(transaction);
    const transactionReceipt = await provider.sendTransaction(signedTx);
    await transactionReceipt.wait();
    const hash = transactionReceipt.hash;
    console.log("Transaction hash", hash);
    const receipt = await provider.getTransactionReceipt(hash);
    return receipt;
}
function formatPollo(info) {
    let chocolate = {
        color: info.color,
        size: info.size,
        sexo: info.sexo,
        precio: ethers.BigNumber.from(info.precio).toNumber(),
        cantidadExistencia: ethers.BigNumber.from(info.cantidadExistencia).toNumber(),
        PolloId: ethers.BigNumber.from(info.PolloId).toNumber()
    };
    return chocolate;
}


module.exports = {
    CreatePollo: CreatePollo,
    getPollos: getPollos,
    getPollo: getPollo,
    updatePollo: updatePollo,
    deletePollo: deletePollo
};
