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
        int256 lat;
        int256 long;
        string placeName;
        string placeType;
        string ipfsURI;
        Faction faction;
    }

    enum Faction {
        EcoGuardian,
        TechnoMad
    }
}
