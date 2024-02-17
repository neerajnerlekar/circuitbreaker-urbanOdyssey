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
        // decide on this
        // bytes32 Location;
        uint8 level;
        string placeName;
        string placeType;
        Faction faction;
    }

    enum Faction {
        EcoGuardian,
        TechnoMad
    }
}
