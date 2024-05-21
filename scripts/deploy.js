async function main(){
    //const Chocolates = await ethers.getContractFactory('Chocolates');
    //const chocolates = await Chocolates.deploy()
    //const txHash = chocolates.deployTransaction.hash;
    const Cliente = await ethers.getContractFactory('envioClientes');
    const clientes = await Cliente.deploy()
    const txHash = clientes.deployTransaction.hash;
    const txReceipt = await ethers.provider.waitForTransaction(txHash);
    console.log("Contract deployed to Address ", txReceipt.contractAddress);
}
main()
    .then(() => {
        console.log("El programa se ejecutó correctamente.");
        process.exit(0);
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });