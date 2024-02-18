# Urban Odyssey 🌍🏙️
<h4 align="center">
  <a href="https://urban-odyssey.vercel.app/">Website</a>
</h4>

## Overview 🌐
Urban Odyssey is an immersive, collaborative play-to-earn game 🎮 that invites players to step into the roles of two visionary factions: the **EcoGuardians** 🍃 and the **TechnoMads** 💻. Players engage in transforming their cities into either thriving ecosystems or cutting-edge technological hubs by harnessing the power of real-world metadata. Through registering and verifying real-world places as NFTs, players contribute to a collective effort to reimagine and reshape urban spaces, promoting either sustainability or technological advancement.

### Factions 🛡️
- **EcoGuardians:** Focus on integrating nature into urban environments, creating green spaces where technology supports sustainability 🌳. Players earn Energy 🌞 by registering GreenLocations.
- **TechnoMads:** Aim to digitize urban life with advanced technology, claiming landmarks to earn Chips 🛠️ for infrastructure upgrades and digital enhancements.

## Frontend Application 🖥️
- **User Interface (UI):** Responsive design for mobile and desktop with maps 🗺️ for location verification, a dashboard for progress and rewards, and a marketplace for NFT trading.
- **Client-Side Logic:** Manages user interactions, data visualization, and validations ✅.
- **API Layer:** RESTful APIs for communication between the frontend, blockchain, and database 📡. Handles user management, location data, game logic, and NFT transactions.
- **Location Verification System:** Uses GPS data 📍 and possibly third-party APIs to verify locations authentically, with anti-fraud measures 🛡️.
- **NFT Management:** Manages NFTs for verified locations, interacting with the blockchain for minting and transactions 💼.

## ZKProofs 🔐
- Utilized for on-chain player location proof, exploring registration of places, and identity verification.

## Blockchain Network 🌐
- **Smart Contracts:** Manage NFT minting, trading, rewards distribution 💸.
- **Wallet Integration:** Enables digital wallet connections for NFT transactions and reward claims 🏦.
- **Player Data:** Stores profiles, faction choices, rewards, and NFT ownership 📊.
- **Location Data:** Maintains a registry of verified locations with metadata and game status 🗂️.

## Third-Party Services 🌎
- **Mapping API:** Uses services like Google Maps or OpenStreetMap for location display and verification 📍.

## Business Logic 📈
### Player Interaction
- **Registration and Faction Selection:** Sign-up process with faction choice 📝.
- **Location Verification:** Submit locations for verification to support faction goals 🎯.
- **Reward System:** Earn faction-specific rewards (Energy or Chips) for verifications, usable for upgrades or NFT conversion 💰.

### Collaboration and Competition 🤝
- **Faction Goals:** Drive narrative through objectives related to urban sustainability or technology 🌿💡.
- **NFT Minting and Trading:** Trade verified location NFTs in-game, influencing faction rewards and player influence 🔄.

## Scalability and Security 🔒
- **Modular Design:** Architecture allows easy integration of new features or technologies 🛠️.
- **Security Measures:** Robust protocols for data, transactions, and anti-cheat mechanisms to ensure fairness 🛡️.

## Credits and Acknowledgments 🙏
This project leverages the **ScaffoldEth-2 template**, providing a solid foundation for smart contract development and frontend integration, facilitating rapid prototyping and iteration. A huge thanks to the ScaffoldEth team for their incredible tools and resources 🛠️🎉.

---

Urban Odyssey offers a unique blend of gaming, real-world impact, and blockchain technology, encouraging players to explore, collaborate, and compete in reshaping the urban landscapes of tomorrow 🌆🚀.



🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
