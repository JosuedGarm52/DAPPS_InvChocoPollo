async function main(){
    //const Chocolates = await ethers.getContractFactory('Chocolates');
    //const chocolates = await Chocolates.deploy()
    //const txHash = chocolates.deployTransaction.hash;
    const Pollos = await ethers.getContractFactory('Pollos');
    const pollos = await Pollos.deploy()
    const txHash = pollos.deployTransaction.hash;
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