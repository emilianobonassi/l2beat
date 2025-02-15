import { EthereumAddress, ProjectId, UnixTime } from '@l2beat/types'

import {
  CONTRACTS,
  DATA_AVAILABILITY,
  EXITS,
  FORCE_TRANSACTIONS,
  makeBridgeCompatible,
  NEW_CRYPTOGRAPHY,
  OPERATOR,
  RISK_VIEW,
  SHARP_VERIFIER_CONTRACT,
  STATE_CORRECTNESS,
} from './common'
import { Layer2 } from './types'

export const immutablex: Layer2 = {
  type: 'layer2',
  id: ProjectId('immutablex'),
  display: {
    name: 'Immutable X',
    slug: 'immutablex',
    description:
      'Immutable X claims to be the first Layer 2 for NFTs on Ethereum. It promises zero gas fees, instant trades and scalability for games, applications, marketplaces, without compromise.',
    purpose: 'NFT, Exchange',
    links: {
      websites: ['https://www.immutable.com/'],
      apps: ['https://market.x.immutable.com/'],
      documentation: ['https://docs.starkware.co/starkex-docs-v2/'],
      explorers: ['https://immutascan.io/'],
      repositories: ['https://github.com/starkware-libs/starkex-contracts'],
      socialMedia: [
        'https://medium.com/@immutablex',
        'https://twitter.com/Immutable',
      ],
    },
  },
  config: {
    associatedTokens: ['IMX'],
    escrows: [
      {
        address: '0x5FDCCA53617f4d2b9134B29090C87D01058e27e9',
        sinceTimestamp: new UnixTime(1615389188),
        tokens: ['ETH', 'IMX', 'USDC', 'OMI'],
      },
    ],
    events: [
      {
        name: 'LogStateTransitionFact',
        abi: ' event LogStateTransitionFact(bytes32 stateTransitionFact)',
        emitter: EthereumAddress('0x5fdcca53617f4d2b9134b29090c87d01058e27e9'),
        type: 'state',
        sinceTimestamp: new UnixTime(1615389188),
      },
    ],
    transactionApi: {
      type: 'starkex',
      product: 'immutable',
      sinceTimestamp: new UnixTime(1615389188),
    },
  },
  riskView: makeBridgeCompatible({
    stateValidation: RISK_VIEW.STATE_ZKP_ST,
    dataAvailability: RISK_VIEW.DATA_EXTERNAL_DAC,
    upgradeability: RISK_VIEW.UPGRADE_DELAY('14 days'),
    sequencerFailure: RISK_VIEW.SEQUENCER_STARKEX_SPOT,
    validatorFailure: RISK_VIEW.VALIDATOR_ESCAPE_STARKEX_NFT,
    destinationToken: RISK_VIEW.CANONICAL,
    validatedBy: RISK_VIEW.VALIDATED_BY_ETHEREUM,
  }),
  technology: {
    provider: 'StarkEx',
    category: 'Validium',
    stateCorrectness: STATE_CORRECTNESS.STARKEX_VALIDITY_PROOFS,
    newCryptography: NEW_CRYPTOGRAPHY.ZK_STARKS,
    dataAvailability: DATA_AVAILABILITY.STARKEX_OFF_CHAIN,
    operator: OPERATOR.STARKEX_OPERATOR,
    forceTransactions: FORCE_TRANSACTIONS.STARKEX_SPOT_WITHDRAW,
    exitMechanisms: EXITS.STARKEX_NFT,
  },
  contracts: {
    addresses: [
      {
        name: 'StarkExchange',
        address: '0x5FDCCA53617f4d2b9134B29090C87D01058e27e9',
        upgradeability: {
          type: 'StarkWare',
          implementation: '0xB8563AD5aF1F79dd04937BE8B572318c8e6f43AC',
          upgradeDelay: 1209600,
          isFinal: false,
        },
      },
      {
        name: 'Committee',
        description:
          'Data Availability Committee (DAC) contract verifing data availability claim from DAC Members (via multisig check).',
        address: '0x16BA0f221664A5189cf2C1a7AF0d3AbFc70aA295',
      },
      SHARP_VERIFIER_CONTRACT,
    ],
    risks: [CONTRACTS.UPGRADE_WITH_DELAY_RISK('14 days')],
  },
  permissions: [
    {
      name: 'Governor',
      accounts: [
        {
          address: '0x799Ec7ff0Bf9d8Bb4f3643aa85dA0971b1104B5a',
          type: 'EOA',
        },
      ],
      description:
        'Can upgrade implementation of the system, potentially gaining access to all funds stored in the bridge. Currently there is no delay before the upgrade, so the users will not have time to migrate.',
    },
    {
      name: 'Data Availability Committee',
      accounts: [
        {
          address: '0x1ffbdb8061b586a6d29fb608d025e5d8744f58d1',
          type: 'EOA',
        },
        {
          address: '0x24eeffc269bb8e540f5b2c8f45750489abf8d54b',
          type: 'EOA',
        },
        {
          address: '0x48af849535ddfa560a0eb0fbdef436688169b949',
          type: 'EOA',
        },
        {
          address: '0x51abde72a4542500a7b1cb32b18b13fbe1f9ff2e',
          type: 'EOA',
        },
        {
          address: '0xafc4589af46c72cbf550f2eeae38c97aede15d17',
          type: 'EOA',
        },
        {
          address: '0xb71fc111d7ba82d5955baddd7717f3467184ff61',
          type: 'EOA',
        },
        {
          address: '0xff506616e8c53ee5e513b906ac00b5d76664c537',
          type: 'EOA',
        },
      ],
      description:
        'Validity proof must be signed by at least 5 of these addresses to approve state update.',
    },
    {
      name: 'SHARP Verifier Governor',
      accounts: [
        {
          address: '0x3DE55343499f59CEB3f1dE47F2Cd7Eab28F2F5C6',
          type: 'EOA',
        },
      ],
      description:
        'Can upgrade implementation of SHARP Verifier, potentially with code approving fraudulent state. Currently there is no delay before the upgrade, so the users will not have time to migrate.',
    },
    {
      name: 'Operator',
      accounts: [
        {
          address: '0x9B7f7d0d23d4CAce5A3157752D0D4e4bf25E927e',
          type: 'EOA',
        },
      ],
      description:
        'Allowed to update the state. When the Operator is down the state cannot be updated.',
    },
  ],
  news: [
    {
      date: '2022-09-19',
      name: 'Automated Metadata Refresh is live',
      link: 'https://immutablex.medium.com/automated-metadata-refresh-is-live-on-immutable-x-aa630097db32',
    },
    {
      date: '2022-09-13',
      name: 'Immutable’s Tokenomics and Staking Principles',
      link: 'https://immutablex.medium.com/immutables-tokenomics-and-staking-principles-5b42f1c66f83',
    },
    {
      date: '2022-09-07',
      name: 'Immutable & The Merge',
      link: 'https://immutablex.medium.com/immutable-the-merge-51c88bdae656',
    },
  ],
}
