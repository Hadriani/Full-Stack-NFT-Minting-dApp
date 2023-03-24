import React from "react";
import { useState } from "react";
import { ethers, BigNumber } from 'ethers';
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import './MainMint.scss';


import GenesysNFT from './GenesysNFT.json';

const GenesysNFTAddress = "0x633f8A7dfa73EafeA20666157d3728691A8E6213";

const storage = new ThirdwebStorage();

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                GenesysNFTAddress,
                GenesysNFT.abi,
                signer
            );

            const metadata = {
                name: name,
                description: description,
                image: "https://ipfs.thirdwebcdn.com/ipfs/QmfGEaFB6wN8Upv4xzwK5gbtXdNdzgb8R8gfGtP2XeJXdk/Fotor_AI.png",
                uri: ""
            };

            const uri = await storage.upload(metadata);
            metadata.uri = uri;
            console.info(uri);

            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.01 * mintAmount).toString()),
                });
                console.log("response: ", response);

                const tokenId = response.events[0].args.tokenId.toNumber();
                const tokenURI = await contract.tokenURI(tokenId);
                console.log("tokenURI: ", tokenURI);

                const updateMetadata = {
                    ...metadata,
                    uri: tokenURI
                };
                await storage.upload(updateMetadata);
                console.log("metadata updated");
                window.alert('Minting successful!');
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 1) return;
        setMintAmount(mintAmount + 1);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div className="wrappermain">
            <div className="postwrapper">
            <h1 className="primaryheader">Genesys Planets</h1>
            <p>Welcome to Genesys Universe!</p>
            <p>Enter our world and mint your first NFT. Genesys Planets spread entirely across the multiverse blockchain!</p>
                <button className="etherscan">
                    <a href="https://sepolia.etherscan.io/address/0x633f8A7dfa73EafeA20666157d3728691A8E6213" target="_blank" rel="noopener noreferrer">
                        View on Etherscan
                    </a>
                </button>

            <div className="inputnamedescr">
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={handleDescriptionChange} />
                </label>
            </div>

            { isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount}/>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <div className="divmint">
                        <button onClick={handleMint} className="mintbutton">Mint NFT</button>
                    </div>
                </div>
            ) : (
                <p>You must be connected to mint!</p>
            )}
            </div>
        </div>
    );
};

export default MainMint;