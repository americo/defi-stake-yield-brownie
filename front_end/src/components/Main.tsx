/* eslint-disable spaced-comment */
/// <refernce types="react-scripts">
import React from "react";
import { useEthers } from "@usedapp/core";
import helperConfig from "../helper-config.json"; // File that stores names of chain id's
import networkMapping from "../chain-info/deployments/map.json";
import { constants } from "ethers";
import brownieConfig from "../brownie-config.json";
import dapp from "../dapp.png"
import eth from "../eth.png"
import dai from "../dai.png"
import { YourWallet } from "./yourWallet/YourWallet";

export type Token = {
    image: string
    address: string
    name: string
}

export const Main = () => {
    // Show token values from the wallet

    // Get the address of diferent tokens
    // Get the balance of the users wallet

    // Send the brownie-config to our `src`folder
    // Send the build folder
    const { chainId } = useEthers();
    const networkName = chainId ? helperConfig[chainId] : "dev"; // If the chainId exists, get his netowkr name in helperConfig, if not use dev
    
    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero // look into that mappping, else use 000
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero;
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero;

    const supportedTokens: Array<Token> = [
        {
            image: dapp,
            address: dappTokenAddress,
            name: "DAPP"
        },
        {
            image: eth,
            address: wethTokenAddress,
            name: "WETH"
        },
        {
            image: dai,
            address: fauTokenAddress,
            name: "DAI"
        }
    ]

    return (<YourWallet supportedTokens={supportedTokens} />)
}