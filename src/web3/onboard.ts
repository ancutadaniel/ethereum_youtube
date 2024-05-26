import Onboard from "@web3-onboard/core";
import gas from '@web3-onboard/gas'
import transactionPreviewModule from "@web3-onboard/transaction-preview";

import wallets from "./modules/index";
import chains from "./chains/chains";

import assets from "../assets/index";

const appMetadata = {
  name: "Web3 Wallet Connected",
  icon: assets.logo,
  logo: assets.logo,
  description: "You are now connected to Free Videos Blockchain App",
  recommendedInjectedWallets: [
    { name: "MetaMask", url: "https://metamask.io" },
  ],
};

const transactionPreview = transactionPreviewModule({
  requireTransactionApproval: true
});

const onboard = Onboard({
  wallets,
  chains,
  appMetadata,
  // transactionPreview,
  apiKey: process.env.REACT_APP_ONBOARD_API_KEY,
  theme: "dark",
  connect: {
    autoConnectLastWallet: true,
    showSidebar: true,
    removeWhereIsMyWalletWarning: true,
    removeIDontHaveAWalletInfoLink: false,
    iDontHaveAWalletLink: "https://metamask.io",
  },
  accountCenter: {
    desktop: {
      enabled: true,
      position: "bottomRight",
    },
    mobile: {
      enabled: true,
      position: "bottomRight",
    },
  },
  notify: {
    transactionHandler: transaction => {
      console.log({ transaction })
      if (transaction.eventCode === 'txPool') {
        return {
          // autoDismiss set to zero will persist the notification until the user excuses it
          autoDismiss: 0,
          // message: `Your transaction is pending, click <a href="https://goerli.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
          // or you could use onClick for when someone clicks on the notification itself
          onClick: () =>
            window.open(`https://sepolia.etherscan.io/tx/${transaction.hash}`)
        }
      }
    }
  },
});

export default onboard;


// subscribe to a single chain for estimates using the default poll rate of 5 secs
// API key is optional and if provided allows for faster poll rates
export const ethMainnetGasBlockPrices = gas.stream({
  chains: ['0x1'],
  // apiKey: dappId,
  endpoint: 'blockPrices'
})