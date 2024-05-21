// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.0 < 0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pollos is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _polloIds;
    struct Pollo {
        string color;
        string size;
        string sexo;
        uint256 precio;
        uint256 cantidadExistencia;
        uint256 PolloId;
    }
    mapping(uint256 => Pollo) public pollos;

    // (POST)
    function addPollo(string memory color, string memory size, string memory sexo, uint256 precio, uint256 cantidadExistencia) public onlyOwner returns (uint256) {
        _polloIds.increment();
        uint256 newPolloId = _polloIds.current();
        Pollo memory newPollo = Pollo(color, size, sexo, precio, cantidadExistencia, newPolloId);
        pollos[newPolloId] = newPollo;
        return newPolloId;
    }

    //(GET)
    function getPolloById(uint256 polloId) public view returns (Pollo memory) {
        return pollos[polloId];
    }

    //(PUT)
    function updatePollo(uint256 polloId, string memory color, string memory size, string memory sexo, uint256 precio, uint256 cantidadExistencia) public onlyOwner {
        require(polloId <= _polloIds.current(), "Pollo ID does not exist");
        Pollo storage pollo = pollos[polloId];
        pollo.color = color;
        pollo.size = size;
        pollo.sexo = sexo;
        pollo.precio = precio;
        pollo.cantidadExistencia = cantidadExistencia;
    }

    // (DELETE)
    function deletePollo(uint256 polloId) public onlyOwner {
        require(polloId <= _polloIds.current(), "Pollo ID does not exist");
        delete pollos[polloId];
    }

    // (GET)
    function getAllPollo() public view returns (Pollo[] memory) {
        Pollo[] memory pollosArray = new Pollo[](_polloIds.current());
        for (uint256 i = 0; i < _polloIds.current(); i++) {
            if (pollos[i + 1].PolloId != 0) { 
                pollosArray[i] = pollos[i + 1];
            }
        }
        return pollosArray;
    }
}