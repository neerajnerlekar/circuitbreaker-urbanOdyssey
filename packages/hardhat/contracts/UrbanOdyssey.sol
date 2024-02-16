// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./lib/Structs.sol";
import "./storage/OdysseyStorage.sol";

contract UrbanOdyssey is OdysseyStorage {
    constructor() ERC1155("UrbanOdyssey") {}

    // @params
    //  string _name : name of the player
    //  string _homeTown : name of the player
    //  refer https://solidity-by-example.org/signature/
    //  bytes32 _msgHash
    //  bytes32 _signature : signature from client for verification
    //  enum Faction _faction
    function registerPlayer() public {
        require(!isRegistered[msg.sender], "Player is already registered.");
        // verify the transaction is sent from our client
        // use ecrecover to check the signer is our deployer
        // update the player struct with values according to params
        // use _mint() to grant player +100 Energy/Chip based on their faction
    }

    //  @params
    //  default lvl 0
    //  increment the locationCounter
    //  string _name, string _placeType
    //  string _uri
    //  default Status uncaptured
    //  TODO By Shyam: figure verification part
    function registerAndVerifyPlace() public {}

    ;

    // TODO: by shyam
    // verifyPlace(+100);

    // //  TBD
    // capturePlace();
    // // upgradePlace();
    // // depositTokens

    // add _mint, _uri, _setUri and other basic erc1155 functions as well

    function getEnergyBalance(address _player) external view returns (uint256) {
        return balanceOf(player, ENERGY);
    }

    // Function to get a player's Chips balance
    function getChipsBalance(address _player) external view returns (uint256) {
        return balanceOf(_player, CHIPS);
    }
}
