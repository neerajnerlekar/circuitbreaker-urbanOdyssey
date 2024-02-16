// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./lib/Structs.sol";
import "./storage/OdysseyStorage.sol";

// ERC-1271 interface
interface IERC1271 {
	function isValidSignature(
		bytes32 hash,
		bytes memory signature
	) external view returns (bytes4 magicValue);
}

contract UrbanOdyssey is ERC1155, Ownable, OdysseyStorage {
	using Address for address;
	// URIs for each token type
	mapping(uint256 => string) private tokenURIs;

	constructor() ERC1155("https://ipfs.io/") Ownable(msg.sender) {}

	// @params
	//  string _name : name of the player
	//  string _homeTown : name of the player
	//  refer https://solidity-by-example.org/signature/
	//  bytes32 _msgHash
	//  bytes32 _signature : signature from client for verification
	//  enum Faction _faction
	function registerPlayer(
		string memory _name,
		string memory _homeTown,
		address sender,
		bytes32 messageHash,
		bytes32 signature,
		Structs.Faction _faction
	) public {
		require(!isRegistered[msg.sender], "Player is already registered.");
		// verify the transaction is sent from our client
		bool isSmartContract;
		assembly {
			isSmartContract := gt(extcodesize(sender), 0)
		}
		// use ecrecover to check the signer is our deployer
		// If it's a smart contract, use ERC1271 to verify the signature
		if (isSmartContract) {
			// Assume the sender implements ERC1271 and cast to the interface
			IERC1271 erc1271 = IERC1271(sender);
			bytes memory signatureBytes = abi.encodePacked(signature);
			require(
				erc1271.isValidSignature(messageHash, signatureBytes) ==
					MAGICVALUE,
				"Invalid signature"
			);
		} else {
			// If it's an EOA, use ecrecover to verify the signature
			bytes32 r;
			bytes32 s;
			uint8 v;

			// Assuming signature is a bytes variable containing the signature
			assembly {
				r := mload(add(signature, 32))
				s := mload(add(signature, 64))
				v := byte(0, mload(add(signature, 96)))
			}
			bytes32 prefixedHash = prefixed(messageHash);
			address recovered = ecrecover(prefixedHash, v, r, s);
			require(recovered == sender, "Invalid signature");
		}

		// update the player struct with values according to params
		// use _mint() to grant player +100 Energy/Chip based on their faction

		// Set player info
		players[msg.sender] = Structs.Player({
			verifiedPlaces: 0,
			registeredPlaces: 0,
			isVerified: false,
			name: _name,
			hometown: _homeTown,
			faction: _faction
		});

		isRegistered[msg.sender] = true;

		// Mint +100 Energy/Chips based on faction
		if (_faction == Structs.Faction.EcoGuardian) {
			_mint(msg.sender, ENERGY, 100, "");
			tokenURIs[
				ENERGY
			] = "https://ipfs.io/ipfs/QmVaUxibUDPyZddiNKproKNNx11vTrFVhCs2WqHCKArNpb";
		} else if (_faction == Structs.Faction.TechnoMad) {
			_mint(msg.sender, CHIPS, 100, "");
			tokenURIs[
				CHIPS
			] = "https://ipfs.io/ipfs/QmXPUN4r1dW6wWuWNpzmb1JiPbgPfyiJd9i5Kx69TisatK";
		}
	}

	//  @params
	//  default lvl 0
	//  increment the locationCounter
	//  string _name, string _placeType
	//  string _uri
	//  default Status uncaptured
	//  TODO By Shyam: figure verification part
	function registerAndVerifyPlace() public {}

	// TODO: by shyam
	// verifyPlace(+100);

	// //  TBD
	// capturePlace();
	// // upgradePlace();
	// // depositTokens

	// add _mint, _uri, _setUri and other basic erc1155 functions as well

	// Function to set URI for a specific token
	function _setUri(uint256 tokenId, string memory newUri) public onlyOwner {
		require(bytes(newUri).length != 0, "URI cannot be empty");
		tokenURIs[tokenId] = newUri;
		emit URI(newUri, tokenId);
	}

	function uri(uint256 tokenId) public view override returns (string memory) {
		return tokenURIs[tokenId];
	}

	function prefixed(bytes32 hash) internal pure returns (bytes32) {
		return
			keccak256(
				abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
			);
	}

	// Magic value defined by EIP-1271
	bytes4 private constant MAGICVALUE = 0x1626ba7e;

	// Function to get a player's Energy balance
	function getENERGYBalance(address _player) external view returns (uint256) {
		return balanceOf(_player, ENERGY);
	}

	// Function to get a player's Chips balance
	function getCHIPSBalance(address _player) external view returns (uint256) {
		return balanceOf(_player, CHIPS);
	}
}
