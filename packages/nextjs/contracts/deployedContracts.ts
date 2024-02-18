/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from '~~/utils/scaffold-eth/contract'

const deployedContracts = {
  534351: {
    UrbanOdyssey: {
      address: '0x2F201F5229A227Fbf9Bf761e36802164A34fF105',
      abi: [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'balance',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'needed',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'ERC1155InsufficientBalance',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'approver',
              type: 'address',
            },
          ],
          name: 'ERC1155InvalidApprover',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'idsLength',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'valuesLength',
              type: 'uint256',
            },
          ],
          name: 'ERC1155InvalidArrayLength',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
          ],
          name: 'ERC1155InvalidOperator',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'receiver',
              type: 'address',
            },
          ],
          name: 'ERC1155InvalidReceiver',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'ERC1155InvalidSender',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'ERC1155MissingApprovalForAll',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'balance',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'needed',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'ERC1155InsufficientBalance',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'approver',
              type: 'address',
            },
          ],
          name: 'ERC1155InvalidApprover',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'idsLength',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'valuesLength',
              type: 'uint256',
            },
          ],
          name: 'ERC1155InvalidArrayLength',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
          ],
          name: 'ERC1155InvalidOperator',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'receiver',
              type: 'address',
            },
          ],
          name: 'ERC1155InvalidReceiver',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'ERC1155InvalidSender',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'ERC1155MissingApprovalForAll',
          type: 'error',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'ApprovalForAll',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256[]',
              name: 'ids',
              type: 'uint256[]',
            },
            {
              indexed: false,
              internalType: 'uint256[]',
              name: 'values',
              type: 'uint256[]',
            },
          ],
          name: 'TransferBatch',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'TransferSingle',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'string',
              name: 'value',
              type: 'string',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
          ],
          name: 'URI',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address[]',
              name: 'accounts',
              type: 'address[]',
            },
            {
              internalType: 'uint256[]',
              name: 'ids',
              type: 'uint256[]',
            },
          ],
          name: 'balanceOfBatch',
          outputs: [
            {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getAllLocations',
          outputs: [
            {
              components: [
                {
                  internalType: 'address',
                  name: 'registeredBy',
                  type: 'address',
                },
                {
                  internalType: 'uint8',
                  name: 'level',
                  type: 'uint8',
                },
                {
                  internalType: 'string',
                  name: 'placeName',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'placeType',
                  type: 'string',
                },
                {
                  internalType: 'enum Structs.Faction',
                  name: 'faction',
                  type: 'uint8',
                },
              ],
              internalType: 'struct Structs.Location[]',
              name: '',
              type: 'tuple[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_player',
              type: 'address',
            },
          ],
          name: 'getCHIPSBalance',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_player',
              type: 'address',
            },
          ],
          name: 'getENERGYBalance',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: '_messageHash',
              type: 'bytes32',
            },
          ],
          name: 'getEthSignedMessageHash',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
          ],
          name: 'isApprovedForAll',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'isRegistered',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: '_messageHash',
              type: 'bytes32',
            },
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes',
            },
          ],
          name: 'isVerified',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'locationId',
              type: 'uint256',
            },
          ],
          name: 'locations',
          outputs: [
            {
              internalType: 'address',
              name: 'registeredBy',
              type: 'address',
            },
            {
              internalType: 'uint8',
              name: 'level',
              type: 'uint8',
            },
            {
              internalType: 'string',
              name: 'placeName',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'placeType',
              type: 'string',
            },
            {
              internalType: 'enum Structs.Faction',
              name: 'faction',
              type: 'uint8',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'players',
          outputs: [
            {
              internalType: 'uint256',
              name: 'verifiedPlaces',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'registeredPlaces',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'isVerified',
              type: 'bool',
            },
            {
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'hometown',
              type: 'string',
            },
            {
              internalType: 'enum Structs.Faction',
              name: 'faction',
              type: 'uint8',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: '_ethSignedMessageHash',
              type: 'bytes32',
            },
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes',
            },
          ],
          name: 'recoverSigner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: '_locationName',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_locationType',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_uri',
              type: 'string',
            },
          ],
          name: 'registerAndVerifyPlace',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: '_name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_homeTown',
              type: 'string',
            },
            {
              internalType: 'bytes32',
              name: '_msgHash',
              type: 'bytes32',
            },
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes',
            },
            {
              internalType: 'enum Structs.Faction',
              name: '_faction',
              type: 'uint8',
            },
          ],
          name: 'registerPlayer',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256[]',
              name: 'ids',
              type: 'uint256[]',
            },
            {
              internalType: 'uint256[]',
              name: 'values',
              type: 'uint256[]',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'safeBatchTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'setApprovalForAll',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes',
              name: 'sig',
              type: 'bytes',
            },
          ],
          name: 'splitSignature',
          outputs: [
            {
              internalType: 'uint8',
              name: '',
              type: 'uint8',
            },
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: 'interfaceId',
              type: 'bytes4',
            },
          ],
          name: 'supportsInterface',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'tokenURIs',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_locationId',
              type: 'uint256',
            },
          ],
          name: 'upgradePlace',
          outputs: [
            {
              internalType: 'bool',
              name: 'success',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'uri',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      inheritedFunctions: {
        balanceOf: '@openzeppelin/contracts/token/ERC1155/ERC1155.sol',
        balanceOfBatch: '@openzeppelin/contracts/token/ERC1155/ERC1155.sol',
        isApprovedForAll: '@openzeppelin/contracts/token/ERC1155/ERC1155.sol',
        safeBatchTransferFrom:
          '@openzeppelin/contracts/token/ERC1155/ERC1155.sol',
        safeTransferFrom: '@openzeppelin/contracts/token/ERC1155/ERC1155.sol',
        setApprovalForAll: '@openzeppelin/contracts/token/ERC1155/ERC1155.sol',
        supportsInterface: '@openzeppelin/contracts/token/ERC1155/ERC1155.sol',
        uri: '@openzeppelin/contracts/token/ERC1155/ERC1155.sol',
        isRegistered: 'contracts/storage/OdysseyStorage.sol',
        locations: 'contracts/storage/OdysseyStorage.sol',
        players: 'contracts/storage/OdysseyStorage.sol',
        tokenURIs: 'contracts/storage/OdysseyStorage.sol',
      },
    },
  },
} as const

export default deployedContracts satisfies GenericContractsDeclaration
