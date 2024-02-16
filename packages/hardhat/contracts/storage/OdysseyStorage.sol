// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../lib/Structs.sol";

contract OdysseyStorage {
    uint256 private constant ENERGY = 0;
    uint256 private constant CHIPS = 1;
    uint256 private constant locationCounter = 10;

    mapping(address => Structs.Player) players;
    mapping(address => bool) isRegistered;
    mapping(uint256 locationId => Structs.Location) locations;
}
