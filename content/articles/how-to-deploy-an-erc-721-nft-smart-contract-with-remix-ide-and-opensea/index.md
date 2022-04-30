### How to Deploy an ERC-721 NFT Smart Contract with Remix IDE and OpenSea
An NFT is a unique asset with different values and properties. A unit of an NFT can not be valued as another unit of the same asset, that is they are not mutually interchangeable. This article will cover and illustrate from a hands-on approach how to deploy an ERC-721 token.

### Table of Content
- [What is an ERC-721 Token](#What-is-an-ERC-721-Token)
- [How to Deploy an ERC-721 Token](#How-to-Deploy-an-ERC-721-Token)
- [Installing Metamask](#Installing-Metamask)
- [Getting Test Ether](#Getting-Test-Ether)
- [Installing IPFS](#Installing-IPFS)
- [Writing the NFT Smart Contract](#Writing-The-NFT-Smart-Contract)
- [Adding the Custom Token in Metamask](#Adding-The-Custom-Token-in-Metamask)
- [Listing our NFT on OpenSea](#Listing-our-NFT-on-OpenSea)
- [Setting up Unlockable Content with Pinata](#Setting-up-Unlockable-Content-with-Pinata)
- [Conclusion](#conclusion)

### What is an ERC-721 Token
Prior to the development of the ERC-721 standard, ERC being Ethereum Request For Comment(ERC); there was ERC-20 in use for minting NFTs that do not offer unique id functionality. The ERC-721 token allows the creation of a unique id for a token and the individual creation of collection NFTs.

### How to Deploy an ERC-721 Token
In other to deploy an ERC-721 token (our NFT) the following is required:
- Metamask 
- IPFX
- Remix IDE to deploy and compile the smart contract

### Installing Metamask
For this tutorial, I am using Microsoft Edge browser to install the metamask wallet. To install MetaMask, simply follow the [link](https://metamask.io/download/) and install metamask for your browser. The install button on the web page will redirect you to the browser add-ins store to install the extension.

With Metamask installed, create a wallet and enter the new password for your wallet, also note that this wallet to be created will be used for practice purposes. Once your metamask wallet is created, you will be assigned a secret key that should be kept safely.

Next, we click on the Ethereum Mainnet, and select the show/hide test networks label. This will navigate you to the settings menu, then toggle the Show Test Network button to ON. Proceed to click on Ethereum Mainnet, and you will see the list of all test networks. For this tutorial, we will use Rinkeby Test Network, so click on Rinkeby Test Network.

On the Rinkeby Test Network, we can see that we have 0 ETH in our wallet, so we proceed to getting some test ether.

### Getting Test Ether
To get some ether for us to run transactions and deploy our NFT we go to google.com and search for Rinkeby Faucet or alternatively, you can follow this [link](https://rinkebyfaucet.com/)

Next, we go to our metamask wallet and copy our address. Under account 1 as illustrated in the image below, that is our wallet address, so we copy it.

![metamask wallet address](/engineering-education/how-to-deploy-an-erc-721-nft-smart-contract-with-remix-ide-and-opensea/wallet.png)

We proceed to the Rinkeby Faucet Page and paste our address there, and click send Rinkeby ETH. This could take a while for the ether to reflect, due to your request being logged in a queue alongside other developers requesting for test facet on the network.

Once the request is completed, you should see 0.1 ETH in your Rinkeby Test Network wallet, as illustrated below

![Rinkeby ETH](/engineering-education/how-to-deploy-an-erc-721-nft-smart-contract-with-remix-ide-and-opensea/rinkeby.png)

### Installing IPFS
IPFS stands for Interplanetary File System. It is a decentralized cloud storage system, and we will utilize it in storing our NFT art. You can follow this [link](https://ipfs.io/#install) to install IPFS on your desktop.

Next, we launch the application and we navigate to the files tab. This is where we upload/import our digital artwork. So, if you have a graphics design or a picture you would like to use as an NFT, simply upload it.

For the sake of this article, I will be using this painting image below I downloaded online, it may be subject to copyright, and I claim no ownership of this art work.

![nft artwork](/engineering-education/how-to-deploy-an-erc-721-nft-smart-contract-with-remix-ide-and-opensea/nftart.png)

Next, we import this file to our IPFS. At this time of the writing, you can access this image on IPFS cloud via this [link](https://ipfs.io/ipfs/QmRVWXPdc94bdZd1bggqRBSuJ3xk4zD6eB8c8SXJ71pauC?filename=img3.jpeg)

### Writing The NFT Smart Contract
To write our smart contract for our NFT, we will leverage [this](https://github.com/0xcert/ethereum-erc721) github library. We are utilizing this library to avoid writing certain components from scratch.

Next we head over to [Remix IDE](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js) and create a new solidity file and name it  NFT721.sol and we input the following code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "https://github.com/0xcert/ethereum-erc721/src/contracts/tokens/nf-token-metadata.sol";
import "https://github.com/0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";

contract newNFT is NFTokenMetadata, Ownable {
 constructor() {
   //define nft name of choice and symbol
   nftName = "SectionTest NFT";
   nftSymbol = "STNF";
 }
 
 function mint(address _to, uint256 _tokenId, string calldata _uri) external onlyOwner {
   super._mint(_to, _tokenId);
   super._setTokenUri(_tokenId, _uri);
 }
}

```

Once done, we click on Compile, if we have no error, we should see a green check button on the compiler button.

![smart contract compile](/engineering-education/how-to-deploy-an-erc-721-nft-smart-contract-with-remix-ide-and-opensea/compile.png)

Next, we proceed to deploy the NFT. To deploy our NFT, we change the environment to Injected Web3. Once we do that, we click on the account menu and it will redirect us to our metamask wallet to connect our account:

![deploy nft](/engineering-education/how-to-deploy-an-erc-721-nft-smart-contract-with-remix-ide-and-opensea/deploy.png)

We accept all prompts and connect our test account. Once connected, we should be able to see the wallet address and the balance on Remix IDE. Then, we select deploy. To deploy it will pop up our metamask wallet to confirm the transaction, because we will be charged Gas fees

![metamask prompt](/engineering-education/how-to-deploy-an-erc-721-nft-smart-contract-with-remix-ide-and-opensea/metamaskprompt.png)

In remix IDE, under the deployed contracts, we should see an arrow with the contract name ‘NEWNFT’, we toggle it down to expand. We turn our focus to the mint function and expand the menu.

Under the mint function, we add our metamask address, which is where we want to mint our nft to, we also input a unique token id, anything random works fine. Lastly, we input the url of our NFT which is the url of the file we uploaded on IPFS.


![IPFS url in Remix](/engineering-education/how-to-deploy-an-erc-721-nft-smart-contract-with-remix-ide-and-opensea/ipfs.png)

Once inputted, we click on transact. We should see a notification icon on our metamask within our browser, click on it and confirm the transaction. Turn your focus to the terminal, once successfully minted, we can view the transaction details on Etherscan.

Done you have successfully created an NFT. But hold on, we can’t see it in our wallet.

### Adding the Custom Token in Metamask
In the meta mask wallet homepage,if you don’t see your NFT token, we import it by clicking the import tokens. 

Metamask will ask us for our token contract address and symbol. To find our token contract address we will head back to our Remix ide terminal and view the mint transaction on etherscan, we should have something like this on etherscan:

![etherscan view](/engineering-education/how-to-deploy-an-erc-721-nft-smart-contract-with-remix-ide-and-opensea/etherscan.png)

In etherscan, we focus on the token transferred section, and we click on our token name which we defined in our NFT code as STNF. Once we click that it will redirect us to a  page that shows the details about the NFT and the transfers/holders. 

In the profile summary section, we can see our NFT contract address, so we copy that, and paste it in the token contract address on our metamask, we also type in the token symbol we defined in our code, and set the token decimal to 1, then we add the custom token and we should be able to see it.

![view token](/engineering-education/how-to-deploy-an-erc-721-nft-smart-contract-with-remix-ide-and-opensea/tokenview.png)

Now that we have successfully minted our NFT, how about we go ahead to list it on OpenSea.

### Listing our NFT on OpenSea
We navigate to OpenSea market place, and we click create, then we connect our metamask wallet. By default OpenSea will know we are running metamask on a test network, hence it will pop up a menu telling us to use the testnets.opensea.io url, which is exactly what we will use.

So, head to the testnets, and repeat the process. It will ask us to create a new item for our NFT, so we proceed by clicking the required fields, we upload our nft image and fill in the details. You can explore here and fill in as many details as you wish.

Within this page, an important section is the settings on unlockable content to set the original version of the NFT. You can skip this process if you have no need to set up the unlockable content.

### Setting up Unlockable Content with Pinata
On the details page, we can enable unlockable content. What this does is that, it allows only the owner of the NFT to view the original version of this file and to enable it, we simply toggle the button.

It will request for the access key, and to get this we need to use [pinata cloud](https://www.pinata.cloud/). Proceed to creating an account on Pinata Cloud. 

Once we have an account on Pinata, we simply upload the same NFT image we uploaded except we are stating figuratively that this is the original version of the NFT. Once uploaded, it creates a CID to the image which is basically the hash of the file.

Next, we click on the image name in Pinata, and it will open it up in a new tab, we simply copy the url, here is [the image](https://gateway.pinata.cloud/ipfs/QmRVWXPdc94bdZd1bggqRBSuJ3xk4zD6eB8c8SXJ71pauC), and we paste it in the enter content of the unlockable content section on OpenSea. Then we click on create.

Once we are done, we click on create. Once done, you should be able to share the NFT, you can access the tutorial version [on OpenSea](https://testnets.opensea.io/assets/0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656/98020886459922266481765064769542895403934176900672800528567414203879924957185/)

![nft opensea](/engineering-education/how-to-deploy-an-erc-721-nft-smart-contract-with-remix-ide-and-opensea/opensea.png)

Once done, we can click on the sell button to sell our nFT on the marketplace. We can set the amount we want and fill in the details as we wish. oNce done, it will load metamask to confirm the transaction. Then voila your item is listed for sale:

![opensea listing](/engineering-education/how-to-deploy-an-erc-721-nft-smart-contract-with-remix-ide-and-opensea/listing.png)

### Conclusion
This article walks you through the process of launching your own NFt end-to-end, without any details left out. The only difference is while we are running on a test network, you would have to spend real ether to sign and confirm these transactions that took place across the lifecycle of creating an NFT.

Now, go out there and launch some test NFTs to dazzle your friends or contribute the marketplace.