const {expect, assert} = require("chai");
const {ethers} = require("hardhat");


describe("NFTAirdrop", async function (){

    let Nft, nft, Nftairdrop, nftairdrop;
    
    beforeEach(async function () {
        const [admin, recipient1, recipient2, recipient3, _] = await ethers.getSigners();
        
        Nft = await ethers.getContractFactory('NFT');
        nft = await Nft.deploy();

        Nftairdrop = await ethers.getContractFactory('NFTAirdrop');
        nftairdrop = await Nftairdrop.deploy();

        await nft.setApprovalForAll(nftairdrop.address, true);
    })

    it('should airdrop', async function () {
        await nftairdrop.addAirdrops([
            {nft: nft.address, id: 0},
            {nft: nft.address, id: 1}, 
            {nft: nft.address, id: 2},
        ])

        await nftairdrop.addRecipients([recipient1.address, recipient2.address, recipient3.address]);
        await nftairdrop.connect(recipient1).claim();
        await nftairdrop.connect(recipient2).claim();
        await nftairdrop.connect(recipient3).claim();
        
        const owner1 = await nft.ownerOf(0);
        const owner2 = await nft.ownerOf(1);
        const owner3 = await nft.ownerOf(2);

        assert(owner1 == recipient1.address);
        assert(owner2 == recipient2.address);
        assert(owner3 == recipient3.address);
    });
});