require('dotenv').config({path:require('find-config')('.env')})
const {ethers} = require('ethers')
const contract = require('../artifacts/contracts/envioCliente.sol/envioClientes.json');

const {
    API_URL,
    PRIVATE_KEY ,
    PUBLIC_KEY ,
    ENVCLIENTE_ADDRESS 
} = process.env 

//console.log('ENVCLIENTE_ADDRESS:', ENVCLIENTE_ADDRESS);

async function createTransaction(provider, method, param){
    const etherInterface = new ethers.utils.Interface(contract.abi)
    const nonce = await provider.getTransactionCount(PUBLIC_KEY, 'latest')
    const gasPrice = await provider.getGasPrice();
    const network = await provider.getNetwork();
    const {chainId} = network;
    const transaction = {
        from: PUBLIC_KEY ,
        to: ENVCLIENTE_ADDRESS,
        nonce,
        chainId,
        gasPrice,
        data: etherInterface.encodeFunctionData(method,param)
    }
    return transaction
}

async function CreateCliente(nombreTienda, nombreEncargado, direccion) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const transaction = await createTransaction(provider, "addenvioCliente", [nombreTienda, nombreEncargado, direccion]);
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

async function getClientes(){
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const envCliente_contract = new ethers.Contract(
        ENVCLIENTE_ADDRESS,
        contract.abi,
        provider
    )
    const result = await envCliente_contract.getAllenvioCliente()
    var envCliente = []
    result.forEach((element) => {
        envCliente.push(formatCliente(element)); 
    });
    return envCliente; 
}


async function deleteCliente(envClienteId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const transaction = await createTransaction(provider, "deleteenvioCliente", [envClienteId]);
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
function formatCliente(info) {
    let chocolate = {
        nombreTienda: info.nombreTienda,
        nombreEncargado: info.nombreEncargado,
        direccion: info.direccion,
        envioClienteId: ethers.BigNumber.from(info.envioClienteId).toNumber()
    };
    return chocolate;
}

module.exports = {
    CreateCliente: CreateCliente,
    getClientes: getClientes,
    deleteCliente: deleteCliente,
};
