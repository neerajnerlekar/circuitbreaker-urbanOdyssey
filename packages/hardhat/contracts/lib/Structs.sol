// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Structs {
    struct Player {
        uint256 verifiedPlaces;
        uint256 registeredPlaces;
        bool isRegistered;
        string name;
        string hometown;
        string country;
        Faction faction;
    }

    struct Location {
        address verifiedBy;
        // decide on this
        // bytes32 Location;
        uint8 level;
        uint256 tokenId;
        bool isVerified;
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
