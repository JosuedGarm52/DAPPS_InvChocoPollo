require('dotenv').config({path:require('find-config')('.env')})
const {ethers} = require('ethers')
const contract = require('../artifacts/contracts/Chocolate.sol/Chocolates.json');


const {
    API_URL,
    PRIVATE_KEY ,
    PUBLIC_KEY ,
    CHOCOLATE_ADDRESS 
} = process.env 

//console.log('API_URL:', API_URL);
//console.log('PRIVATE_KEY:', PRIVATE_KEY);
//console.log('PUBLIC_KEY:', PUBLIC_KEY);
//console.log('CHOCOLATE_ADDRESS:', CHOCOLATE_ADDRESS);

async function createTransaction(provider, method, param){
    const etherInterface = new ethers.utils.Interface(contract.abi)
    const nonce = await provider.getTransactionCount(PUBLIC_KEY, 'latest')
    const gasPrice = await provider.getGasPrice();
    const network = await provider.getNetwork();
    const {chainId} = network;
    const transaction = {
        from: PUBLIC_KEY ,
        to: CHOCOLATE_ADDRESS,
        nonce,
        chainId,
        gasPrice,
        data: etherInterface.encodeFunctionData(method,param)
    }
    return transaction
}

async function CreateChocolate(nombre, tipo, descripcion, precio, cantidadExistencia) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const transaction = await createTransaction(provider, "addChocolate", [nombre, tipo, descripcion, precio, cantidadExistencia]);
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

async function getChocolates(){
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const chocolates_contract = new ethers.Contract(
        CHOCOLATE_ADDRESS,
        contract.abi,
        provider
    )
    const result = await chocolates_contract.getAllChocolates()
    var choco = []
    result.forEach((element) => {
        choco.push(formatChocolate(element)); 
    });
    return choco; 
}

async function getChocolate(chocoId){
    const provider = new ethers.providers.JsonRpcProvider(API_URL)
    const chocoContract = new ethers.Contract(
        CHOCOLATE_ADDRESS,
        contract.abi,
        provider
    )
    const result = await chocoContract.getChocolateById(chocoId);
    return formatChocolate(result)
}

async function updateChocolate(chocoId, nombre, tipo, descripcion, precio, cantidadExistencia) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const transaction = await createTransaction(provider, "updateChocolate", [chocoId, nombre, tipo, descripcion, precio, cantidadExistencia]);
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


async function deleteChocolate(chocoId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const transaction = await createTransaction(provider, "deleteChocolate", [chocoId]);
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
function formatChocolate(info) {
    let chocolate = {
        nombre: info.nombre,
        tipo: info.tipo,
        descripcion: info.descripcion,
        precio: ethers.BigNumber.from(info.precio).toNumber(),
        cantidadExistencia: ethers.BigNumber.from(info.cantidadExistencia).toNumber(),
        chocoId: ethers.BigNumber.from(info.ChocoId).toNumber()
    };
    return chocolate;
}


module.exports = {
    getChocolates: getChocolates,
    getChocolate: getChocolate,
    CreateChocolate: CreateChocolate,
    updateChocolate: updateChocolate,
    deleteChocolate: deleteChocolate
};