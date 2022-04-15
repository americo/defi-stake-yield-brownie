import { useContractFunction, useEthers } from "@usedapp/core"
import { constants, utils } from "ethers";
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/deployments/map.json"
import { useEffect, useState } from "react";

export const useStakeTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { chainId } = useEthers(); // Get chainId from network
    const { abi } = TokenFarm; // Get tokenFarm abi from TokenFarm.json
    // 
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero; // Get tokenFarmAddress from map.json

    const tokenFarmInterface = new utils.Interface(abi) // get tokenFarmInterface
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface) // Get tokenFarmContract

    const erc20ABI = ERC20.abi // Get ERC20 ABI
    const erc20interface = new utils.Interface(erc20ABI) // Get ERC20 Interface
    const erc20Contract = new Contract(tokenAddress, erc20interface) // Get ERC20 Contract

    
    // approve
    // stake tokens
    const {send: approveErc20Send, state: approveAndStakeErc20State} =
    useContractFunction(erc20Contract, "approve", {
        transactionName: "Approve ERC20 transfer"
    }); // Call approve function from erc20 contract

    const approveAndStake = (amount: string) => {
        setAmountToStake(amount)
        return approveErc20Send(tokenFarmAddress, amount);
    }
    
    // const [state, setState] = useState(approveErc20State);

    // Call stakeTokens function from tokenFarmContract
    const {send: stakeSend, state: stakeState} = 
    useContractFunction(tokenFarmContract, "stakeTokens", {
        transactionName: "Stake Tokens"
    });

    // Create a useState for amoutToStake
    const [amountToStake, setAmountToStake] = useState("0")

    // useEffect track
    useEffect(() => {
        // If approve and stake erc20 state status is success, stake the amount
        if (approveAndStakeErc20State.status === "Success") {
            // stake function
            console.log("APPROVED")
            stakeSend(amountToStake, tokenAddress)
        }
    }, [amountToStake, approveAndStakeErc20State, tokenAddress])

    // Create a useState for state
    const [state, setState] = useState(approveAndStakeErc20State)

    // useEffect track
    useEffect(() => {
        // If approve and stake erc 20 state status == succeed, update state
        if (approveAndStakeErc20State.status === "Success") {
            setState(stakeState);
        } else {
            setState(approveAndStakeErc20State);
        }
    }, [approveAndStakeErc20State, stakeState])

    return { approveAndStake, approveAndStakeErc20State };
 
    
}