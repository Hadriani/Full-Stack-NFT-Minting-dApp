import React from "react";
import './NavBar.scss';
import { SocialIcon } from "react-social-icons";

const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <div className="wrapper">

            <div className="flex">
                <div className="socialicons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <SocialIcon network="facebook" bgColor="#ff5a01" style={{ height: 30, width: 30 }} />
                    </a>

                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <SocialIcon network="twitter" fgColor="#ff5a01" style={{ height: 30, width: 30 }} />
                    </a>

                    <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                        <SocialIcon network="pinterest" bgColor="#ef5a01" style={{ height: 30, width: 30 }} />
                    </a>
                </div>
            </div>
            
                <nav>
                    <ul>
                        <li>About Us</li>
                        <li>Mint</li>
                        <li>Team</li>
                    </ul>
                </nav>

                <div className="buttonwrapper">
                    {isConnected ? (
                        <p className="connected">Connected</p>
                    ) : (
                        <button onClick={connectAccount} className="buttonlogin">Connect Wallet</button>
                    )}
                </div>
            
        </div>
    )
};

export default NavBar;