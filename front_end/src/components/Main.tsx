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
import { makeStyles } from "@material-ui/core"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4),
        fontFamily: "Bahnschrift Light"
    }
}))

export const Main = () => {
    // Show token values from the wallet

    // Get the address of diferent tokens
    // Get the balance of the users wallet

    // Send the brownie-config to our `src`folder
    // Send the build folder
    const classes = useStyles()
    const { chainId } = useEthers();
    const networkName = chainId ? helperConfig[chainId] : "dev"; // If the chainId exists, get his netowkr name in helperConfig, if not use dev
    
    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero // look into that mappping, else use 000
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero; // Get weth_token address from brownie
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero; // Get fau_token address from brownie

    // Importing tokens data
    const supportedTokens: Array<Token> = [
        /*
            image -> Token image
            address -> token address
            name -> token name
        */
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

    // Inside return we have a componet YourWallet, that is a component of user wallet
    return (<>
    <h2 className={classes.title}>Dapp Token App</h2>
    <YourWallet supportedTokens={supportedTokens}/> 
    </>)
}