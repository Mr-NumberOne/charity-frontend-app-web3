export const CauseRegistryABI = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "initialOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "addCause",
        "inputs": [
            {
                "name": "_params",
                "type": "tuple",
                "internalType": "struct CauseRegistry.CauseParams",
                "components": [
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "longDescription",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "imageSrc",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "category",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "goal",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "website",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "walletAddress",
                        "type": "address",
                        "internalType": "address payable"
                    },
                    {
                        "name": "isActive",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "featured",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "causeIds",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "causes",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "longDescription",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "imageSrc",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "category",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "website",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "goal",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "raised",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "donorsCount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "walletAddress",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "isActive",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "featured",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "donateToCause",
        "inputs": [
            {
                "name": "_id",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "getAllCauseIds",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCause",
        "inputs": [
            {
                "name": "_id",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct CauseRegistry.Cause",
                "components": [
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "longDescription",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "imageSrc",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "category",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "website",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "goal",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "raised",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "donorsCount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "walletAddress",
                        "type": "address",
                        "internalType": "address payable"
                    },
                    {
                        "name": "isActive",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "featured",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "hasDonated",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateCause",
        "inputs": [
            {
                "name": "_id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_params",
                "type": "tuple",
                "internalType": "struct CauseRegistry.CauseParams",
                "components": [
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "longDescription",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "imageSrc",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "category",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "goal",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "website",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "walletAddress",
                        "type": "address",
                        "internalType": "address payable"
                    },
                    {
                        "name": "isActive",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "featured",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "CauseAdded",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "CauseUpdated",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DonationMade",
        "inputs": [
            {
                "name": "causeId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "donor",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "CauseNotActive",
        "inputs": []
    },
    {
        "type": "error",
        "name": "CauseNotFound",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DonationMustBeGreaterThanZero",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "WalletAddressCannotBeZero",
        "inputs": []
    }
] as const;
