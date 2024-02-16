// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./lib/Structs.sol";
import "./storage/OdysseyStorage.sol";

contract UrbanOdyssey is OdysseyStorage {
    constructor() ERC1155("UrbanOdyssey") {}

    // registerPlayer(+100);
    // registerPlace(+100);
    // verifyPlace(+100);
    // capturePlace();
    // upgradePlace();
    // depositTokens

    function getEnergyBalance(address _player) external view returns (uint256) {
        return balanceOf(player, ENERGY);
    }

    // Function to get a player's Chips balance
    function getChipsBalance(address _player) external view returns (uint256) {
        return balanceOf(_player, CHIPS);
    }
}
