import { getDefaultProvider } from 'ethers';
import addresses from '../lib/addresses';
import ABIS from '../lib/abis';
import synths from '../lib/synths';

const SUPPORTED_NETWORKS = {
  420: 'ovm',
};

class ContractSettings {
  /**
   * @constructor
   * @param provider {Object} - ethers.js provider object - default ethers.providers.getDefaultProvider()
   * @param signer {Object} - one of 4 provided signers or a custom ethers.js compatible signer. Use Metamask for Dapp browser support
   * @param networkId {Number} - default 1 - mainnet, also supports 42 (Kovan)
   */
  constructor(contractSettings) {
    contractSettings = contractSettings || {};
    const { provider, signer, networkId } = contractSettings;
    this.networkId = networkId || 420;
    this.network = SUPPORTED_NETWORKS[Number(this.networkId)];
    this.provider = provider || getDefaultProvider();
    if (!provider && networkId) {
      this.provider = getDefaultProvider(this.network);
    }
    this.signer = signer;
    this.addressList = addresses[this.networkId];
    this.synths = synths[this.networkId];
    this.ABIS = ABIS[this.network];
  }
}

ContractSettings.SUPPORTED_NETWORKS = SUPPORTED_NETWORKS;

export default ContractSettings;
