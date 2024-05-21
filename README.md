# InvChocoPollo
## Explicación de la aplicación  

 

## Explicación de cada contrato en el proyecto  

### CHOCOLATE  

Este contrato guarda los chocolates que están en el inventario. 

Datos 

nombre – este atributo guarda el nombre del chocolate o su marca 

tipo – este atributo guarda el tipo de chocolate (Blanco, negro, cookie) 

descripción - este atributo guarda una descripción del chocolate 

precio – valor numérico que representa su costo individual 

cantidadExistencia – valor numérico que guarda la cantidad almacenada en el inventario. 

ChocoId – este valor numérico representa un identificador del chocolate individual. 

 

### POLLO 

Este contrato guarda los pollos que están en el inventario. 

Datos  

color – este atributo guarda el color que tiene el pollo. 

size – este atributo guarda su tamaño (pequeño, mediano, grande). 

sexo - este atributo guarda si es masculino o femenino. 

precio – valor numérico que representa el valor del pollo  

PolloId – este valor numérico representa un identificador del pollo. 

 

### ENVIOCLIENTES 

Este contrato es un registro de las tiendas donde se harán las entregas del producto que soliciten. 

Datos 

nombreTienda – este atributo guarda el nombre de la tienda donde se hacen entregas. 

nombreEncargado – este atributo guarda el nombre del encargado al que buscar cuando se entregue la mercancía. 

dirección – este atributo guarda la ubicación y calle donde se debe entregar la mercancía. 

envioClienteId – este valor numérico representa el identificador de la tienda 

 

 

 

 

## Dirección de cada contrato 

Direccion del deploy: 

### CHOCOLATE 

.\InvChocoPollo\scripts\deployChoco.js 

### POLLO 

.\InvChocoPollo\scripts\deployPollo.js 

### ENVCLIENTE 

.\InvChocoPollo\scripts\deployenvCliente.js 

 

## Explicación de cada función de cada contrato  

### Funciones Chocolate 

AddChocolate - añade un nuevo chocolate pidiendo los datos: nombre, tipo, descripción, precio y cantidad existencia. 

GetChocolateById – espera el chocoId que representa el identificador del chocolate que esperas obtener. 

UpdateChocolate – espera los datos: nombre, tipo, descripción, precio y cantidad existencia; para cambiar los datos de un chocolate en específico del dato chocoId que lo identifica. 

DeleteChocolate – espera el identificador del chocolate que espera borrar. 

GetAllChocolotes – obtienes una lista de todos los chocolates del inventario. 

 

### Funciones Pollo 

AddPollo- añade un nuevo chocolate pidiendo los datos: nombre, tipo, descripción, precio y cantidad existencia.  

GetPolloById – espera el PolloId que representa el identificador del pollo que esperas obtener.  

UpdatePollo – espera los datos: color, size, sexo y precio; para cambiar los datos de un chocolate en específico del dato PolloId que lo identifica.  

DeletePollo – espera el identificador del pollo que espera borrar.  

GetAllPollo – obtienes una lista de todos los pollos del inventario. 

 

### Funciones Envio Cliente 

addenvioCliente - añade una nueva tienda donse sera enviada pidiendo los datos del nombre de la tienda, nombre del encargado y la direccion. 

deleteenvioCliente – espera el identificador del envioCliente que espera borrar. 

GetAllenvioCliente – obtienes toda la lista de los envíos a los clientes. 

 

 

## Casos de uso  

Una tienda de chocolates puede utilizar la aplicación para llevar la contabilidad del inventario de la mercancía que tienen de chocolates, así como un registro del nombre o marca, apariencia descriptiva, el tipo de chocolate, el precio individual y la cantidad de existencias que tiene. 

 

Un criadero de pollos puede utilizar la aplicación para tener un registro de los pollos que tienen actualmente y su valor actual; guardando datos como su color, tamaño y sexo del pollo registrado. 

 

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
