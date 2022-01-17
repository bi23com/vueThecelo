let ABI_Governance = [{
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "approvalStageDuration",
		"type": "uint256"
	}],
	"name": "ApprovalStageDurationSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "approver",
		"type": "address"
	}],
	"name": "ApproverSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "concurrentProposals",
		"type": "uint256"
	}],
	"name": "ConcurrentProposalsSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "destination",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "bytes4",
		"name": "functionId",
		"type": "bytes4"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "threshold",
		"type": "uint256"
	}],
	"name": "ConstitutionSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "dequeueFrequency",
		"type": "uint256"
	}],
	"name": "DequeueFrequencySet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "executionStageDuration",
		"type": "uint256"
	}],
	"name": "ExecutionStageDurationSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "bytes32",
		"name": "hash",
		"type": "bytes32"
	}],
	"name": "HotfixApproved",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "bytes32",
		"name": "hash",
		"type": "bytes32"
	}],
	"name": "HotfixExecuted",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "bytes32",
		"name": "hash",
		"type": "bytes32"
	}, {
		"indexed": true,
		"internalType": "uint256",
		"name": "epoch",
		"type": "uint256"
	}],
	"name": "HotfixPrepared",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "bytes32",
		"name": "hash",
		"type": "bytes32"
	}, {
		"indexed": false,
		"internalType": "address",
		"name": "whitelister",
		"type": "address"
	}],
	"name": "HotfixWhitelisted",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "minDeposit",
		"type": "uint256"
	}],
	"name": "MinDepositSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "previousOwner",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}],
	"name": "OwnershipTransferred",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "baselineQuorumFactor",
		"type": "uint256"
	}],
	"name": "ParticipationBaselineQuorumFactorSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "baselineUpdateFactor",
		"type": "uint256"
	}],
	"name": "ParticipationBaselineUpdateFactorSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "participationBaseline",
		"type": "uint256"
	}],
	"name": "ParticipationBaselineUpdated",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "participationFloor",
		"type": "uint256"
	}],
	"name": "ParticipationFloorSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "ProposalApproved",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "timestamp",
		"type": "uint256"
	}],
	"name": "ProposalDequeued",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "ProposalExecuted",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "ProposalExpired",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "proposer",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "transactionCount",
		"type": "uint256"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "deposit",
		"type": "uint256"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "timestamp",
		"type": "uint256"
	}],
	"name": "ProposalQueued",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "revokedUpvotes",
		"type": "uint256"
	}],
	"name": "ProposalUpvoteRevoked",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "upvotes",
		"type": "uint256"
	}],
	"name": "ProposalUpvoted",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "weight",
		"type": "uint256"
	}],
	"name": "ProposalVoted",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "queueExpiry",
		"type": "uint256"
	}],
	"name": "QueueExpirySet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "referendumStageDuration",
		"type": "uint256"
	}],
	"name": "ReferendumStageDurationSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}],
	"name": "RegistrySet",
	"type": "event"
}, {
	"payable": true,
	"stateMutability": "payable",
	"type": "fallback"
}, {
	"constant": true,
	"inputs": [],
	"name": "approver",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "sender",
		"type": "address"
	}, {
		"internalType": "bytes",
		"name": "blsKey",
		"type": "bytes"
	}, {
		"internalType": "bytes",
		"name": "blsPop",
		"type": "bytes"
	}],
	"name": "checkProofOfPossession",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "concurrentProposals",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "dequeueFrequency",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"name": "dequeued",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"name": "emptyIndices",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "aNumerator",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "aDenominator",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "bNumerator",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "bDenominator",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "exponent",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "_decimals",
		"type": "uint256"
	}],
	"name": "fractionMulExp",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "bytes",
		"name": "header",
		"type": "bytes"
	}],
	"name": "getBlockNumberFromHeader",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getEpochNumber",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "blockNumber",
		"type": "uint256"
	}],
	"name": "getEpochNumberOfBlock",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getEpochSize",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "blockNumber",
		"type": "uint256"
	}],
	"name": "getParentSealBitmap",
	"outputs": [{
		"internalType": "bytes32",
		"name": "",
		"type": "bytes32"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "bytes",
		"name": "header",
		"type": "bytes"
	}],
	"name": "getVerifiedSealBitmapFromHeader",
	"outputs": [{
		"internalType": "bytes32",
		"name": "",
		"type": "bytes32"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "bytes",
		"name": "header",
		"type": "bytes"
	}],
	"name": "hashHeader",
	"outputs": [{
		"internalType": "bytes32",
		"name": "",
		"type": "bytes32"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "bytes32",
		"name": "",
		"type": "bytes32"
	}],
	"name": "hotfixes",
	"outputs": [{
		"internalType": "bool",
		"name": "executed",
		"type": "bool"
	}, {
		"internalType": "bool",
		"name": "approved",
		"type": "bool"
	}, {
		"internalType": "uint256",
		"name": "preparedEpoch",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "initialized",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "isOwner",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "lastDequeue",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "minDeposit",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "blockNumber",
		"type": "uint256"
	}],
	"name": "minQuorumSize",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "minQuorumSizeInCurrentSet",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "numberValidatorsInCurrentSet",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "blockNumber",
		"type": "uint256"
	}],
	"name": "numberValidatorsInSet",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "owner",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "proposalCount",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "queueExpiry",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"name": "refundedDeposits",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "registry",
	"outputs": [{
		"internalType": "contract IRegistry",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "renounceOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}],
	"name": "setRegistry",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "stageDurations",
	"outputs": [{
		"internalType": "uint256",
		"name": "approval",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "referendum",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "execution",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}],
	"name": "transferOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "validatorSignerAddressFromCurrentSet",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "blockNumber",
		"type": "uint256"
	}],
	"name": "validatorSignerAddressFromSet",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getVersionNumber",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "pure",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "_approver",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "_concurrentProposals",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "_minDeposit",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "_queueExpiry",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "_dequeueFrequency",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "approvalStageDuration",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "referendumStageDuration",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "executionStageDuration",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "participationBaseline",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "participationFloor",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "baselineUpdateFactor",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "baselineQuorumFactor",
		"type": "uint256"
	}],
	"name": "initialize",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "_approver",
		"type": "address"
	}],
	"name": "setApprover",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "_concurrentProposals",
		"type": "uint256"
	}],
	"name": "setConcurrentProposals",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "_minDeposit",
		"type": "uint256"
	}],
	"name": "setMinDeposit",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "_queueExpiry",
		"type": "uint256"
	}],
	"name": "setQueueExpiry",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "_dequeueFrequency",
		"type": "uint256"
	}],
	"name": "setDequeueFrequency",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "approvalStageDuration",
		"type": "uint256"
	}],
	"name": "setApprovalStageDuration",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "referendumStageDuration",
		"type": "uint256"
	}],
	"name": "setReferendumStageDuration",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "executionStageDuration",
		"type": "uint256"
	}],
	"name": "setExecutionStageDuration",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "participationBaseline",
		"type": "uint256"
	}],
	"name": "setParticipationBaseline",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "participationFloor",
		"type": "uint256"
	}],
	"name": "setParticipationFloor",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "baselineUpdateFactor",
		"type": "uint256"
	}],
	"name": "setBaselineUpdateFactor",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "baselineQuorumFactor",
		"type": "uint256"
	}],
	"name": "setBaselineQuorumFactor",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "destination",
		"type": "address"
	}, {
		"internalType": "bytes4",
		"name": "functionId",
		"type": "bytes4"
	}, {
		"internalType": "uint256",
		"name": "threshold",
		"type": "uint256"
	}],
	"name": "setConstitution",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256[]",
		"name": "values",
		"type": "uint256[]"
	}, {
		"internalType": "address[]",
		"name": "destinations",
		"type": "address[]"
	}, {
		"internalType": "bytes",
		"name": "data",
		"type": "bytes"
	}, {
		"internalType": "uint256[]",
		"name": "dataLengths",
		"type": "uint256[]"
	}, {
		"internalType": "string",
		"name": "descriptionUrl",
		"type": "string"
	}],
	"name": "propose",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": true,
	"stateMutability": "payable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "lesser",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "greater",
		"type": "uint256"
	}],
	"name": "upvote",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "getProposalStage",
	"outputs": [{
		"internalType": "enum Proposals.Stage",
		"name": "",
		"type": "uint8"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "lesser",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "greater",
		"type": "uint256"
	}],
	"name": "revokeUpvote",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "approve",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}, {
		"internalType": "enum Proposals.VoteValue",
		"name": "value",
		"type": "uint8"
	}],
	"name": "vote",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "execute",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "bytes32",
		"name": "hash",
		"type": "bytes32"
	}],
	"name": "approveHotfix",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "bytes32",
		"name": "hash",
		"type": "bytes32"
	}, {
		"internalType": "address",
		"name": "whitelister",
		"type": "address"
	}],
	"name": "isHotfixWhitelistedBy",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "bytes32",
		"name": "hash",
		"type": "bytes32"
	}],
	"name": "whitelistHotfix",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "bytes32",
		"name": "hash",
		"type": "bytes32"
	}],
	"name": "prepareHotfix",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256[]",
		"name": "values",
		"type": "uint256[]"
	}, {
		"internalType": "address[]",
		"name": "destinations",
		"type": "address[]"
	}, {
		"internalType": "bytes",
		"name": "data",
		"type": "bytes"
	}, {
		"internalType": "uint256[]",
		"name": "dataLengths",
		"type": "uint256[]"
	}, {
		"internalType": "bytes32",
		"name": "salt",
		"type": "bytes32"
	}],
	"name": "executeHotfix",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "withdraw",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "isVoting",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getApprovalStageDuration",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getReferendumStageDuration",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getExecutionStageDuration",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getParticipationParameters",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "proposalExists",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "getProposal",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "string",
		"name": "",
		"type": "string"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "getProposalTransaction",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "address",
		"name": "",
		"type": "address"
	}, {
		"internalType": "bytes",
		"name": "",
		"type": "bytes"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "isApproved",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "getVoteTotals",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "getVoteRecord",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getQueueLength",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "getUpvotes",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getQueue",
	"outputs": [{
		"internalType": "uint256[]",
		"name": "",
		"type": "uint256[]"
	}, {
		"internalType": "uint256[]",
		"name": "",
		"type": "uint256[]"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getDequeue",
	"outputs": [{
		"internalType": "uint256[]",
		"name": "",
		"type": "uint256[]"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getUpvoteRecord",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getMostRecentReferendumProposal",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "bytes32",
		"name": "hash",
		"type": "bytes32"
	}],
	"name": "hotfixWhitelistValidatorTally",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "bytes32",
		"name": "hash",
		"type": "bytes32"
	}],
	"name": "isHotfixPassing",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "bytes32",
		"name": "hash",
		"type": "bytes32"
	}],
	"name": "getHotfixRecord",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}, {
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "dequeueProposalsIfReady",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "isQueued",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "isProposalPassing",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "isDequeuedProposal",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "isDequeuedProposalExpired",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "proposalId",
		"type": "uint256"
	}],
	"name": "isQueuedProposalExpired",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "destination",
		"type": "address"
	}, {
		"internalType": "bytes4",
		"name": "functionId",
		"type": "bytes4"
	}],
	"name": "getConstitution",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}]

let GovernanceAddress = '0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972'
// 测试 testCelo
// let GovernanceAddress = '0xAA963FC97281d9632d96700aB62A4D1340F9a28a'


let ABI_LockedGold = [{
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "slashed",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "penalty",
		"type": "uint256"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "reporter",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "reward",
		"type": "uint256"
	}],
	"name": "AccountSlashed",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "GoldLocked",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "GoldRelocked",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "available",
		"type": "uint256"
	}],
	"name": "GoldUnlocked",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "GoldWithdrawn",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "previousOwner",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}],
	"name": "OwnershipTransferred",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}],
	"name": "RegistrySet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "string",
		"name": "slasherIdentifier",
		"type": "string"
	}],
	"name": "SlasherWhitelistAdded",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "string",
		"name": "slasherIdentifier",
		"type": "string"
	}],
	"name": "SlasherWhitelistRemoved",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "period",
		"type": "uint256"
	}],
	"name": "UnlockingPeriodSet",
	"type": "event"
}, {
	"constant": true,
	"inputs": [],
	"name": "initialized",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "isOwner",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "owner",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "registry",
	"outputs": [{
		"internalType": "contract IRegistry",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "renounceOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}],
	"name": "setRegistry",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"name": "slashingWhitelist",
	"outputs": [{
		"internalType": "bytes32",
		"name": "",
		"type": "bytes32"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "totalNonvoting",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}],
	"name": "transferOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "unlockingPeriod",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "slasher",
		"type": "address"
	}],
	"name": "isSlasher",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getVersionNumber",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "pure",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "_unlockingPeriod",
		"type": "uint256"
	}],
	"name": "initialize",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "setUnlockingPeriod",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "lock",
	"outputs": [],
	"payable": true,
	"stateMutability": "payable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "incrementNonvotingAccountBalance",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "decrementNonvotingAccountBalance",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "unlock",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "relock",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "withdraw",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getTotalLockedGold",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getNonvotingLockedGold",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getAccountTotalLockedGold",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getAccountNonvotingLockedGold",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getPendingWithdrawals",
	"outputs": [{
		"internalType": "uint256[]",
		"name": "",
		"type": "uint256[]"
	}, {
		"internalType": "uint256[]",
		"name": "",
		"type": "uint256[]"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getTotalPendingWithdrawals",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getSlashingWhitelist",
	"outputs": [{
		"internalType": "bytes32[]",
		"name": "",
		"type": "bytes32[]"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "string",
		"name": "slasherIdentifier",
		"type": "string"
	}],
	"name": "addSlasher",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "string",
		"name": "slasherIdentifier",
		"type": "string"
	}, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "removeSlasher",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "penalty",
		"type": "uint256"
	}, {
		"internalType": "address",
		"name": "reporter",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "reward",
		"type": "uint256"
	}, {
		"internalType": "address[]",
		"name": "lessers",
		"type": "address[]"
	}, {
		"internalType": "address[]",
		"name": "greaters",
		"type": "address[]"
	}, {
		"internalType": "uint256[]",
		"name": "indices",
		"type": "uint256[]"
	}],
	"name": "slash",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}]

let LockedGoldAddress = '0x6cC083Aed9e3ebe302A6336dBC7c921C9f03349E'
// 测试 testCelo
// let LockedGoldAddress = '0x6a4CC5693DC5BFA3799C699F3B941bA2Cb00c341'

let ABI_Accounts = [{
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "AccountCreated",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "bytes",
		"name": "dataEncryptionKey",
		"type": "bytes"
	}],
	"name": "AccountDataEncryptionKeySet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "string",
		"name": "metadataURL",
		"type": "string"
	}],
	"name": "AccountMetadataURLSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "string",
		"name": "name",
		"type": "string"
	}],
	"name": "AccountNameSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "address",
		"name": "walletAddress",
		"type": "address"
	}],
	"name": "AccountWalletAddressSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}],
	"name": "AttestationSignerAuthorized",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "address",
		"name": "oldSigner",
		"type": "address"
	}],
	"name": "AttestationSignerRemoved",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "previousOwner",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}],
	"name": "OwnershipTransferred",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}],
	"name": "RegistrySet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}],
	"name": "ValidatorSignerAuthorized",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "address",
		"name": "oldSigner",
		"type": "address"
	}],
	"name": "ValidatorSignerRemoved",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}],
	"name": "VoteSignerAuthorized",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "address",
		"name": "oldSigner",
		"type": "address"
	}],
	"name": "VoteSignerRemoved",
	"type": "event"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"name": "authorizedBy",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "initialized",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "isOwner",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "owner",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "registry",
	"outputs": [{
		"internalType": "contract IRegistry",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "renounceOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}],
	"name": "setRegistry",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}],
	"name": "transferOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getVersionNumber",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "pure",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}],
	"name": "initialize",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "string",
		"name": "name",
		"type": "string"
	}, {
		"internalType": "bytes",
		"name": "dataEncryptionKey",
		"type": "bytes"
	}, {
		"internalType": "address",
		"name": "walletAddress",
		"type": "address"
	}, {
		"internalType": "uint8",
		"name": "v",
		"type": "uint8"
	}, {
		"internalType": "bytes32",
		"name": "r",
		"type": "bytes32"
	}, {
		"internalType": "bytes32",
		"name": "s",
		"type": "bytes32"
	}],
	"name": "setAccount",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "createAccount",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "string",
		"name": "name",
		"type": "string"
	}],
	"name": "setName",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "walletAddress",
		"type": "address"
	}, {
		"internalType": "uint8",
		"name": "v",
		"type": "uint8"
	}, {
		"internalType": "bytes32",
		"name": "r",
		"type": "bytes32"
	}, {
		"internalType": "bytes32",
		"name": "s",
		"type": "bytes32"
	}],
	"name": "setWalletAddress",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "bytes",
		"name": "dataEncryptionKey",
		"type": "bytes"
	}],
	"name": "setAccountDataEncryptionKey",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "string",
		"name": "metadataURL",
		"type": "string"
	}],
	"name": "setMetadataURL",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}, {
		"internalType": "uint8",
		"name": "v",
		"type": "uint8"
	}, {
		"internalType": "bytes32",
		"name": "r",
		"type": "bytes32"
	}, {
		"internalType": "bytes32",
		"name": "s",
		"type": "bytes32"
	}],
	"name": "authorizeVoteSigner",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}, {
		"internalType": "uint8",
		"name": "v",
		"type": "uint8"
	}, {
		"internalType": "bytes32",
		"name": "r",
		"type": "bytes32"
	}, {
		"internalType": "bytes32",
		"name": "s",
		"type": "bytes32"
	}],
	"name": "authorizeValidatorSigner",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}, {
		"internalType": "uint8",
		"name": "v",
		"type": "uint8"
	}, {
		"internalType": "bytes32",
		"name": "r",
		"type": "bytes32"
	}, {
		"internalType": "bytes32",
		"name": "s",
		"type": "bytes32"
	}, {
		"internalType": "bytes",
		"name": "ecdsaPublicKey",
		"type": "bytes"
	}],
	"name": "authorizeValidatorSignerWithPublicKey",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}, {
		"internalType": "uint8",
		"name": "v",
		"type": "uint8"
	}, {
		"internalType": "bytes32",
		"name": "r",
		"type": "bytes32"
	}, {
		"internalType": "bytes32",
		"name": "s",
		"type": "bytes32"
	}, {
		"internalType": "bytes",
		"name": "ecdsaPublicKey",
		"type": "bytes"
	}, {
		"internalType": "bytes",
		"name": "blsPublicKey",
		"type": "bytes"
	}, {
		"internalType": "bytes",
		"name": "blsPop",
		"type": "bytes"
	}],
	"name": "authorizeValidatorSignerWithKeys",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}, {
		"internalType": "uint8",
		"name": "v",
		"type": "uint8"
	}, {
		"internalType": "bytes32",
		"name": "r",
		"type": "bytes32"
	}, {
		"internalType": "bytes32",
		"name": "s",
		"type": "bytes32"
	}],
	"name": "authorizeAttestationSigner",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "removeVoteSigner",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "removeValidatorSigner",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "removeAttestationSigner",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}],
	"name": "attestationSignerToAccount",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}],
	"name": "validatorSignerToAccount",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}],
	"name": "voteSignerToAccount",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}],
	"name": "signerToAccount",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getVoteSigner",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getValidatorSigner",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getAttestationSigner",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "hasAuthorizedVoteSigner",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "hasAuthorizedValidatorSigner",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "hasAuthorizedAttestationSigner",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getName",
	"outputs": [{
		"internalType": "string",
		"name": "",
		"type": "string"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getMetadataURL",
	"outputs": [{
		"internalType": "string",
		"name": "",
		"type": "string"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address[]",
		"name": "accountsToQuery",
		"type": "address[]"
	}],
	"name": "batchGetMetadataURL",
	"outputs": [{
		"internalType": "uint256[]",
		"name": "",
		"type": "uint256[]"
	}, {
		"internalType": "bytes",
		"name": "",
		"type": "bytes"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getDataEncryptionKey",
	"outputs": [{
		"internalType": "bytes",
		"name": "",
		"type": "bytes"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getWalletAddress",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "isAccount",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "signer",
		"type": "address"
	}],
	"name": "isAuthorizedSigner",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}]

let AccountsAddress = '0x7d21685C17607338b313a7174bAb6620baD0aaB7'
// 测试 testCelo
// let AccountsAddress = '0xed7f51A34B4e71fbE69B3091FcF879cD14bD73A9'


let ABI_Election = [{
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "electabilityThreshold",
		"type": "uint256"
	}],
	"name": "ElectabilityThresholdSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "min",
		"type": "uint256"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "max",
		"type": "uint256"
	}],
	"name": "ElectableValidatorsSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "EpochRewardsDistributedToVoters",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "uint256",
		"name": "maxNumGroupsVotedFor",
		"type": "uint256"
	}],
	"name": "MaxNumGroupsVotedForSet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "previousOwner",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}],
	"name": "OwnershipTransferred",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}],
	"name": "RegistrySet",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "units",
		"type": "uint256"
	}],
	"name": "ValidatorGroupActiveVoteRevoked",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "group",
		"type": "address"
	}],
	"name": "ValidatorGroupMarkedEligible",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "group",
		"type": "address"
	}],
	"name": "ValidatorGroupMarkedIneligible",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "ValidatorGroupPendingVoteRevoked",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "units",
		"type": "uint256"
	}],
	"name": "ValidatorGroupVoteActivated",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "ValidatorGroupVoteCast",
	"type": "event"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "sender",
		"type": "address"
	}, {
		"internalType": "bytes",
		"name": "blsKey",
		"type": "bytes"
	}, {
		"internalType": "bytes",
		"name": "blsPop",
		"type": "bytes"
	}],
	"name": "checkProofOfPossession",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "electabilityThreshold",
	"outputs": [{
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "electableValidators",
	"outputs": [{
		"internalType": "uint256",
		"name": "min",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "max",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "aNumerator",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "aDenominator",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "bNumerator",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "bDenominator",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "exponent",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "_decimals",
		"type": "uint256"
	}],
	"name": "fractionMulExp",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "bytes",
		"name": "header",
		"type": "bytes"
	}],
	"name": "getBlockNumberFromHeader",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getEpochNumber",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "blockNumber",
		"type": "uint256"
	}],
	"name": "getEpochNumberOfBlock",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getEpochSize",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "blockNumber",
		"type": "uint256"
	}],
	"name": "getParentSealBitmap",
	"outputs": [{
		"internalType": "bytes32",
		"name": "",
		"type": "bytes32"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "bytes",
		"name": "header",
		"type": "bytes"
	}],
	"name": "getVerifiedSealBitmapFromHeader",
	"outputs": [{
		"internalType": "bytes32",
		"name": "",
		"type": "bytes32"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "bytes",
		"name": "header",
		"type": "bytes"
	}],
	"name": "hashHeader",
	"outputs": [{
		"internalType": "bytes32",
		"name": "",
		"type": "bytes32"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "initialized",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "isOwner",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "maxNumGroupsVotedFor",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "blockNumber",
		"type": "uint256"
	}],
	"name": "minQuorumSize",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "minQuorumSizeInCurrentSet",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "numberValidatorsInCurrentSet",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "blockNumber",
		"type": "uint256"
	}],
	"name": "numberValidatorsInSet",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "owner",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "registry",
	"outputs": [{
		"internalType": "contract IRegistry",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "renounceOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}],
	"name": "setRegistry",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}],
	"name": "transferOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "validatorSignerAddressFromCurrentSet",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "blockNumber",
		"type": "uint256"
	}],
	"name": "validatorSignerAddressFromSet",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getVersionNumber",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "pure",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "registryAddress",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "minElectableValidators",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "maxElectableValidators",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "_maxNumGroupsVotedFor",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "_electabilityThreshold",
		"type": "uint256"
	}],
	"name": "initialize",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "min",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "max",
		"type": "uint256"
	}],
	"name": "setElectableValidators",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getElectableValidators",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "_maxNumGroupsVotedFor",
		"type": "uint256"
	}],
	"name": "setMaxNumGroupsVotedFor",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "uint256",
		"name": "threshold",
		"type": "uint256"
	}],
	"name": "setElectabilityThreshold",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getElectabilityThreshold",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}, {
		"internalType": "address",
		"name": "lesser",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "greater",
		"type": "address"
	}],
	"name": "vote",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}],
	"name": "activate",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "group",
		"type": "address"
	}],
	"name": "hasActivatablePendingVotes",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}, {
		"internalType": "address",
		"name": "lesser",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "greater",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "revokePending",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "lesser",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "greater",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "revokeAllActive",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}, {
		"internalType": "address",
		"name": "lesser",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "greater",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "index",
		"type": "uint256"
	}],
	"name": "revokeActive",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getTotalVotesByAccount",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getPendingVotesForGroupByAccount",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getActiveVotesForGroupByAccount",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getTotalVotesForGroupByAccount",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getActiveVoteUnitsForGroupByAccount",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}],
	"name": "getActiveVoteUnitsForGroup",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}],
	"name": "getTotalVotesForGroup",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}],
	"name": "getActiveVotesForGroup",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}],
	"name": "getPendingVotesForGroup",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}],
	"name": "getGroupEligibility",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "totalEpochRewards",
		"type": "uint256"
	}, {
		"internalType": "uint256[]",
		"name": "uptimes",
		"type": "uint256[]"
	}],
	"name": "getGroupEpochRewards",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}, {
		"internalType": "address",
		"name": "lesser",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "greater",
		"type": "address"
	}],
	"name": "distributeEpochRewards",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}],
	"name": "markGroupIneligible",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "lesser",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "greater",
		"type": "address"
	}],
	"name": "markGroupEligible",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "getGroupsVotedForByAccount",
	"outputs": [{
		"internalType": "address[]",
		"name": "",
		"type": "address[]"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "canReceiveVotes",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "address",
		"name": "group",
		"type": "address"
	}],
	"name": "getNumVotesReceivable",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getTotalVotes",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getActiveVotes",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getEligibleValidatorGroups",
	"outputs": [{
		"internalType": "address[]",
		"name": "",
		"type": "address[]"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getTotalVotesForEligibleValidatorGroups",
	"outputs": [{
		"internalType": "address[]",
		"name": "groups",
		"type": "address[]"
	}, {
		"internalType": "uint256[]",
		"name": "values",
		"type": "uint256[]"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "electValidatorSigners",
	"outputs": [{
		"internalType": "address[]",
		"name": "",
		"type": "address[]"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"internalType": "uint256",
		"name": "minElectableValidators",
		"type": "uint256"
	}, {
		"internalType": "uint256",
		"name": "maxElectableValidators",
		"type": "uint256"
	}],
	"name": "electNValidatorSigners",
	"outputs": [{
		"internalType": "address[]",
		"name": "",
		"type": "address[]"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "getCurrentValidatorSigners",
	"outputs": [{
		"internalType": "address[]",
		"name": "",
		"type": "address[]"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}, {
		"internalType": "address[]",
		"name": "lessers",
		"type": "address[]"
	}, {
		"internalType": "address[]",
		"name": "greaters",
		"type": "address[]"
	}, {
		"internalType": "uint256[]",
		"name": "indices",
		"type": "uint256[]"
	}],
	"name": "forceDecrementVotes",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}]

let ElectionAddress = '0x8D6677192144292870907E3Fa8A5527fE55A7ff6'
// 测试 testCelo
// let ElectionAddress = '0x1c3eDf937CFc2F6F51784D20DEB1af1F9a8655fA'

var Web3 = require("web3")
//创建web3对象
var web3 = new Web3()
// 连接到以太坊节点
// http://bitgraph.io
web3.setProvider(new Web3.providers.HttpProvider("/web3/celo"))



async function tets() {
	// var gasPrice = await web3.eth.getGasPrice()
	// console.log(gasPrice)
	// var amt = web3.utils.toWei('0.98'.toString() ,'ether')
	// console.log(amt)
	let metacoinGovernance = new web3.eth.Contract(ABI_Governance, GovernanceAddress)
	var index = -1
	var result = await metacoinGovernance.methods.getDequeue().call()
	console.log("------")
	console.log(index)
	for (var i = 0; i < result.length; i++) {
		if (Number(result[i]) == Number(38)) {
			index = i
			break
		}
	}
	console.log(result)
	console.log(index)
	console.log("------")
	
	
}

tets()


/**
 * 锁定
 * from: 要锁定的账户地址 如:'0x23fa394138c261f997585f78f0f94be1f88065ad'
 * amount:要锁定的金额 如:10.25  
 */
async function lock(from, amount) {
	let metacoinLockedGold = new web3.eth.Contract(ABI_LockedGold, LockedGoldAddress)
	var txData = metacoinLockedGold.methods.lock().encodeABI()
	var amt = web3.utils.toWei(amount.toString(), 'ether')
	return {
		"from": from,
		"feeCurrency": null,
		"gasPrice": await web3.eth.getGasPrice(),
		"gas": "0x249f0", //gas最大上限值 150000
		"data": txData,
		"to": LockedGoldAddress,
		"chainId": 42220,
		"nonce": await web3.eth.getTransactionCount(from),
		"value": '0x' + Number(amt).toString(16)
	}
}

async function getGasPrice(){
	return await web3.eth.getGasPrice();
}
// lock('0x23fa394138c261f997585f78f0f94be1f88065ad',0.98).then(console.log)
/**
 * 再锁定  relock
 * from: 要锁定的账户地址 如:'0x23fa394138c261f997585f78f0f94be1f88065ad'
 * index:待取回的索引值
 * amount:要锁定的金额 如:10.25  
 */
async function relock(from, index, amount) {
	var amt = web3.utils.toWei(amount.toString(), 'ether')
	let metacoinLockedGold = new web3.eth.Contract(ABI_LockedGold, LockedGoldAddress)
	var txData = metacoinLockedGold.methods.relock('0x' + Number(index).toString(16), '0x' + Number(amt).toString(16)).encodeABI()
	return {
		"from": from,
		"feeCurrency": null,
		"gasPrice": await web3.eth.getGasPrice(),
		"gas": "0x249f0", //gas最大上限值 150000
		"data": txData,
		"to": LockedGoldAddress,
		"chainId": 42220,
		"nonce": await web3.eth.getTransactionCount(from),
		"value": 0
	}
}
// relock('0x23fa394138c261f997585f78f0f94be1f88065ad',1,0.98).then(console.log)

/**
 * 获取待取回总数 getTotalPendingWithdrawals
 * ownAddress: 所有者账户地址 如:'0x23fa394138c261f997585f78f0f94be1f88065ad'
 */
async function getTotalPendingWithdrawals(ownAddress) {
	let metacoinLockedGold = new web3.eth.Contract(ABI_LockedGold, LockedGoldAddress)
	var result = await metacoinLockedGold.methods.getTotalPendingWithdrawals(ownAddress).call({ from: ownAddress })
	return web3.utils.fromWei(result, 'ether')
}
//  getTotalPendingWithdrawals('0x23fa394138c261f997585f78f0f94be1f88065ad').then(console.log)

// 未锁定(unlock)
// 待取回(pending)
// 锁定(lock)	投票(vote)
//  			激活(activite)
// 				撤销(revoke)

/**
 * 获取账户锁定的数量 
 */
async function getAccountTotalLockedGold(ownAddress) {
	let metacoinLockedGold = new web3.eth.Contract(ABI_LockedGold, LockedGoldAddress)
	var result = await metacoinLockedGold.methods.getAccountTotalLockedGold(ownAddress).call({ from: ownAddress });
	return web3.utils.fromWei(result, 'ether')
}
//  getAccountTotalLockedGold('0x500fbdbe3a2122ba773f986a12eabaee28296df0').then(console.log)

/**
 * 获取锁定未投票数量 
 */
async function getAccountNonvotingLockedGold(ownAddress) {
	let metacoinLockedGold = new web3.eth.Contract(ABI_LockedGold, LockedGoldAddress)
	var result = await metacoinLockedGold.methods.getAccountNonvotingLockedGold(ownAddress).call({ from: ownAddress });
	return web3.utils.fromWei(result, 'ether')
}
//  getAccountNonvotingLockedGold('0x500fbdbe3a2122ba773f986a12eabaee28296df0').then(console.log)

/**
 * 获取总的投票 getTotalVotesByAccount
 */
async function getTotalVotesByAccount(ownAddress) {
	let metacoinLockedGold = new web3.eth.Contract(ABI_Election, ElectionAddress)
	var result = await metacoinLockedGold.methods.getTotalVotesByAccount(ownAddress).call({ from: ownAddress })
	return web3.utils.fromWei(result, 'ether')
}
//  getTotalVotesByAccount('0x23fa394138c261f997585f78f0f94be1f88065ad').then(console.log)

/**
 * 获取待取回列表
 * ownAddress: 所有者账户地址 如:'0x23fa394138c261f997585f78f0f94be1f88065ad'
 */
async function getPendingWithdrawals(ownAddress) {
	let metacoinLockedGold = new web3.eth.Contract(ABI_LockedGold, LockedGoldAddress)
	var result = await metacoinLockedGold.methods.getPendingWithdrawals(ownAddress).call({ from: ownAddress })
	var json = [];
	for (var i = 0; i < 50; i++) {
		var value = result[i]
		if (value == undefined) {
			break;
		}
		if (value.length == 0) {
			json[i] = '0'
		} else {
			json[i] = web3.utils.fromWei(value[0], 'ether')
		}
	}
	return json
}
//  getPendingWithdrawals('0x86e839bc25ddd4474c747b573d15d675c48faadf').then(console.log)
//  getPendingWithdrawals('0x500fbdbe3a2122ba773f986a12eabaee28296df0').then(console.log)


/**
 * 查询是否是账户
 * ownAddress: 所有者账户地址 如:'0x23fa394138c261f997585f78f0f94be1f88065ad'
 */
async function isAccount(ownAddress) {
	let metacoinLockedGold = new web3.eth.Contract(ABI_Accounts, AccountsAddress)
	var result = await metacoinLockedGold.methods.isAccount(ownAddress).call({ from: ownAddress })
	return result
}
//  isAccount('0x23fa394138c261f997585f78f0f94be1f88065ad').then(console.log)
//  isAccount('0xc27dbfe34c7068ad37da809ffa89d8ae4b74743c').then(console.log)

/**
 * 创建账户
 * from: 需要创建的账户地址 如:'0x23fa394138c261f997585f78f0f94be1f88065ad'
 */
async function createAccount(from) {
	console.log("createAccount")
	let metacoinLockedGold = new web3.eth.Contract(ABI_Accounts, AccountsAddress); // 合约
	var txData = await metacoinLockedGold.methods.createAccount().encodeABI();
	// new web3.eth.accounts.wallet.create(2, '54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534');
	return {
		"from": from,
		"feeCurrency": null,
		"gasPrice": web3.eth.getGasPrice(),
		"gas": "0x249f0", //gas最大上限值 150000
		"data": txData,
		"to": AccountsAddress,
		"chainId": 42220,
		"nonce": web3.eth.getTransactionCount(from),
		"value": 0
	}
}

// enum Stage { None, Queued, Approval, Referendum, Execution, Expiration }
// enum VoteValue { None, Abstain, No, Yes }
/**
 * 投票
 * from: 投票人地址 如'0x23fa394138c261f997585f78f0f94be1f88065ad'
 * proposalId: 提案id  如 43
 * value: 投票值 如: 3    有效值(0 None, 1 Abstain, 2 No , 3 Yes)
 */
async function vote(from, proposalId, value) {
	let metacoinGovernance = new web3.eth.Contract(ABI_Governance, GovernanceAddress)
	var index = -1
	var result = await metacoinGovernance.methods.getDequeue().call()
	for (var i = 0; i < result.length; i++) {
		if (Number(result[i]) == Number(proposalId)) {
			index = i
			break
		}
	}
	if (index < 0) return {}
	var txData = metacoinGovernance.methods.vote('0x' + Number(proposalId).toString(16), '0x' + Number(index).toString(16), Number(value)).encodeABI()
	return {
		"from": from,
		"feeCurrency": null,
		"gasPrice": await web3.eth.getGasPrice(),
		"gas": "0x249f0", //gas最大上限值 150000
		"data": txData,
		"to": GovernanceAddress,
		"chainId": 42220,
		"nonce": await web3.eth.getTransactionCount(from),
		"value": 0
	}
}
// vote("0x500fbdbe3a2122ba773f986a12eabaee28296df0", 32, 3).then(console.log)


module.exports = {
	getAccountTotalLockedGold,      // 获取账户锁定的数量
	getAccountNonvotingLockedGold,  // 获取锁定未投票数量
	getTotalVotesByAccount,         // 获取总的投票
	lock,    // 锁定
	vote,    // 投票
	getGasPrice, 

	createAccount,   // 创建账户
	isAccount,       // 查询是否是账户
	getPendingWithdrawals,       // 获取待取回列表
	getTotalPendingWithdrawals,  // 获取待取回总数
	relock,   //再锁定

}