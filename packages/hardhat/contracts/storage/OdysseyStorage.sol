// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../lib/Structs.sol";

contract OdysseyStorage {
    address deployer;

    mapping(uint256 => string) public tokenURIs;

    mapping(address => Structs.Player) public players;
    mapping(address => bool) public isRegistered;
    mapping(uint256 locationId => Structs.Location) public locations;
}
