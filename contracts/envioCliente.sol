// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.0 < 0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract envioClientes is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _envioClienteIds;
    struct envioCliente {
        string nombreTienda;
        string nombreEncargado;
        string direccion;
        uint256 envioClienteId;
    }
    mapping(uint256 => envioCliente) public envCliente;

    // (POST)
    function addenvioCliente(string memory nombreTienda, string memory nombreEncargado, string memory direccion) public onlyOwner returns (uint256) {
        _envioClienteIds.increment();
        uint256 newenvioClienteId = _envioClienteIds.current();
        envioCliente memory newenvioCliente = envioCliente(nombreTienda,nombreEncargado, direccion, newenvioClienteId);
        envCliente[newenvioClienteId] = newenvioCliente;
        return newenvioClienteId;
    }

    // (DELETE)
    function deleteenvioCliente(uint256 clienteId) public onlyOwner {
        require(clienteId <= _envioClienteIds.current(), "envioCliente ID does not exist");
        delete envCliente[clienteId];
    }

    // (GET)
    function getAllenvioCliente() public view returns (envioCliente[] memory) {
        envioCliente[] memory envClienteArray = new envioCliente[](_envioClienteIds.current());
        for (uint256 i = 0; i < _envioClienteIds.current(); i++) {
            if (envCliente[i + 1].envioClienteId != 0) { 
                envClienteArray[i] = envCliente[i + 1];
            }
        }
        return envClienteArray;
    }
}