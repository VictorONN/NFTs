// https://www.youtube.com/watch?v=GKJBEEXUha0
//Tutorial file

//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("Universe", "UNFT") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newId = _tokenIds.current();
        _mint(msg.sender, newId);
        _setTokenURI(newId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newId;
    }
}
