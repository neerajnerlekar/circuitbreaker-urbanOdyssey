// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

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
        uint256 tokenId;
        string placeName;
        string placeType;
        string uri;
        Status status;
    }

    enum Faction {
        EcoGuardian,
        TechnoMad
    }

    enum Status {
        UnCaptured,
        EcoGuardian,
        TenchnoMad
    }
}
