// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Structs {
	struct Player {
		uint256 verifiedPlaces;
		uint256 registeredPlaces;
		bool isVerified;
		string name;
		string hometown;
		Faction faction;
	}

	struct Location {
		address registeredBy;
		uint8 level;
		string placeName;
		string placeType;
		Faction faction;
		int256 lat;
		int256 long;
		string ipfsURI;
	}

	enum Faction {
		EcoGuardian,
		TechnoMad
	}
}
