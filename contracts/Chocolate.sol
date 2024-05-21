// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.0 < 0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Chocolates is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _chocoIds;
    struct Chocolate {
        string nombre;
        string tipo;
        string descripcion;
        uint256 precio;
        uint256 cantidadExistencia;
        uint256 ChocoId;
    }
    mapping(uint256 => Chocolate) public chocos;

    // Añadir un nuevo chocolate (POST)
    function addChocolate(string memory nombre, string memory tipo, string memory descripcion, uint256 precio, uint256 cantidadExistencia) public onlyOwner returns (uint256) {
        _chocoIds.increment();
        uint256 newChocoId = _chocoIds.current();
        Chocolate memory newChoco = Chocolate(nombre, tipo, descripcion, precio, cantidadExistencia, newChocoId);
        chocos[newChocoId] = newChoco;
        return newChocoId;
    }

    // Obtener información de un chocolate por su ID (GET)
    function getChocolateById(uint256 chocoId) public view returns (Chocolate memory) {
        return chocos[chocoId];
    }

    // Actualizar información de un chocolate existente (PUT)
    function updateChocolate(uint256 chocoId, string memory nombre, string memory tipo, string memory descripcion, uint256 precio, uint256 cantidadExistencia) public onlyOwner {
        require(chocoId <= _chocoIds.current(), "Chocolate ID does not exist");
        Chocolate storage choco = chocos[chocoId];
        choco.nombre = nombre;
        choco.tipo = tipo;
        choco.descripcion = descripcion;
        choco.precio = precio;
        choco.cantidadExistencia = cantidadExistencia;
    }

    // Eliminar un chocolate por su ID (DELETE)
    function deleteChocolate(uint256 chocoId) public onlyOwner {
        require(chocoId <= _chocoIds.current(), "Chocolate ID does not exist");
        delete chocos[chocoId];
    }

    // Obtener todos los chocolates (opcional, similar al getUsers en el otro contrato)
    function getAllChocolates() public view returns (Chocolate[] memory) {
        Chocolate[] memory chocolatesArray = new Chocolate[](_chocoIds.current());
        for (uint256 i = 0; i < _chocoIds.current(); i++) {
            if (chocos[i + 1].ChocoId != 0) { // Checking if chocolate exists
                chocolatesArray[i] = chocos[i + 1];
            }
        }
        return chocolatesArray;
    }
}