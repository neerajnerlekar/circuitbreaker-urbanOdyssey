// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./lib/Structs.sol";
import "./storage/OdysseyStorage.sol";

contract UrbanOdyssey is ERC1155, OdysseyStorage {
    // URIs for each token type
    uint256 private constant ENERGY = 0;
    uint256 private constant CHIPS = 1;
    uint256 private locationCounter = 10;

    constructor() ERC1155("UrbanOdyssey") {
        deployer = msg.sender;
        tokenURIs[ENERGY] = "https://ipfs.io/ipfs/bafybeihyr5454x44k6mthlibvzvwhezgql5ps25c4l7egd4df4fg4jzxwm";
        tokenURIs[CHIPS] = "https://ipfs.io/ipfs/bafkreietcrmhbmbutgglkg4g2mg2dep5b4d3ngdkbte4n3s53rzrxwihti";
    }

    function registerPlayer(
        string memory _name,
        string memory _homeTown,
        bytes32 _msgHash,
        bytes memory _signature,
        Structs.Faction _faction
    ) public {
        require(!isRegistered[msg.sender], "Player is already registered.");
        require(isVerified(_msgHash, _signature), "Invalid Txn Source");

        // Set player info
        players[msg.sender] = Structs.Player({
            verifiedPlaces: 0,
            registeredPlaces: 0,
            isVerified: true,
            name: _name,
            hometown: _homeTown,
            faction: _faction
        });

        isRegistered[msg.sender] = true;

        // Mint +100 Energy/Chips based on faction
        if (_faction == Structs.Faction.EcoGuardian) {
            _mint(msg.sender, ENERGY, 1000, "");
        } else if (_faction == Structs.Faction.TechnoMad) {
            _mint(msg.sender, CHIPS, 1000, "");
        }
    }

    //  TODO By Shyam: figure out verification part
    function registerAndVerifyPlace(string memory _locationName, string memory _locationType, string memory _uri)
        public
        payable
    {
        require(isRegistered[msg.sender], "Only players can register places");

        // Check if the player has enough resources
        uint256 registrationCost = 200;
        if (players[msg.sender].faction == Structs.Faction.EcoGuardian) {
            // EcoGuardians use Energy
            require(balanceOf(msg.sender, ENERGY) >= registrationCost, "Not enough Energy");
            _burn(msg.sender, ENERGY, registrationCost);
        } else if (players[msg.sender].faction == Structs.Faction.EcoGuardian) {
            // TechnoMads use Chips
            require(balanceOf(msg.sender, CHIPS) >= registrationCost, "Not enough Chips");
            _burn(msg.sender, CHIPS, registrationCost);
        }

        // Proceed with place registration
        locations[locationCounter] = Structs.Location({
            registeredBy: msg.sender,
            level: 0,
            placeName: _locationName,
            placeType: _locationType,
            faction: players[msg.sender].faction
        });

        ++locationCounter;
        _mint(msg.sender, locationCounter, 1, "");
        tokenURIs[locationCounter] = _uri;
    }

    function getAllLocations() public view returns (Structs.Location[] memory) {
        uint256 counter = locationCounter - 10;
        Structs.Location[] memory allLocations = new Structs.Location[](counter);

        for (uint256 i = 11; i <= locationCounter; ++i) {
            allLocations[i].registeredBy = locations[i].registeredBy;
            allLocations[i].placeName = locations[i].placeName;
            allLocations[i].placeType = locations[i].placeType;
            allLocations[i].level = locations[i].level;
            allLocations[i].faction = locations[i].faction;
        }

        return allLocations;
    }

    // TODO: by shyam
    // verifyPlace(+100);

    function upgradePlace(uint256 _locationId) public returns (bool success) {
        require(isRegistered[msg.sender], "Only players can register places");
        require(locations[_locationId].faction == players[msg.sender].faction, "Faction Mismatch");

        uint256 upgradeCost = 1000;
        if (players[msg.sender].faction == Structs.Faction.EcoGuardian) {
            // EcoGuardians use Energy
            require(balanceOf(msg.sender, ENERGY) >= upgradeCost, "Not enough Energy");
            _burn(msg.sender, ENERGY, upgradeCost);
        } else if (players[msg.sender].faction == Structs.Faction.EcoGuardian) {
            // TechnoMads use Chips
            require(balanceOf(msg.sender, CHIPS) >= upgradeCost, "Not enough Chips");
            _burn(msg.sender, CHIPS, upgradeCost);
        }

        ++locations[_locationId].level;

        return true;
    }

    // Function to set URI for a specific token
    // function _setUri(uint256 tokenId, string memory newUri) internal {
    //     require(bytes(newUri).length != 0, "URI cannot be empty");
    //     tokenURIs[tokenId] = newUri;
    //     emit URI(newUri, tokenId);
    // }

    // Function to get a player's Energy balance
    function getENERGYBalance(address _player) external view returns (uint256) {
        return balanceOf(_player, ENERGY);
    }

    // Function to get a player's Chips balance
    function getCHIPSBalance(address _player) external view returns (uint256) {
        return balanceOf(_player, CHIPS);
    }

    function isVerified(bytes32 _messageHash, bytes memory _signature) public view returns (bool) {
        // The ethSignedMessageHash is the hash that the signer actually signed
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(_messageHash);

        // Recover the signer's address from the signature
        address signer = recoverSigner(ethSignedMessageHash, _signature);

        require(signer == deployer, "Unauthorized Contract call");

        return true;
    }

    function getEthSignedMessageHash(bytes32 _messageHash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) public pure returns (address) {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig) public pure returns (uint8, bytes32, bytes32) {
        require(sig.length == 65, "invalid signature length");
        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }
        return (v, r, s);
    }
}
