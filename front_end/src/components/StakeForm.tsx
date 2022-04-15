import { useEthers, useNotifications, useTokenBalance } from "@usedapp/core"
import { Token } from "./Main"
import { formatUnits } from "@ethersproject/units"
import { Button, Input, CircularProgress, Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import React, { useEffect, useState } from "react"
import { useStakeTokens } from "../hooks"
import { utils } from "ethers"

export interface StakeFormProps {
    token: Token
}

// Component responsible to stake
export const StakeForm = ({token}: StakeFormProps) => {
    const { address: tokenAddress, name } = token // Get the address and name of token
    const { account } = useEthers(); // Get current user account
    const tokenBalance = useTokenBalance(tokenAddress, account); // Get token balance
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0 // Format token balance
    const {notifications} = useNotifications() // Set useNotifications

    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)

    // Handle the value input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value) // React event to track the input
        setAmount(newAmount) // Set new amout
        console.log(amount)
    }

    const {approveAndStake, approveAndStakeErc20State} = useStakeTokens(tokenAddress); // Use the useStakeTokens hook

    // Handle state submit
    const handleStateSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString());
        return approveAndStake(amountAsWei.toString());
    }

    const isMining = approveAndStakeErc20State.status === "Mining"; // Update mining status to true
    const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false); // Create a state to showErc20ApprovalSuccess
    const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false); // Create a state to showStakeTokenSuccess
    const handleCloseSnack = () => {
        // Update the states if handeCloseSnack get called
        setShowErc20ApprovalSuccess(false);
        setShowStakeTokenSuccess(false);
    }


    // Track event
    // This track is responsible to popup notifications of user activity
    useEffect(() => {
        // If transaction get succeed, set showErc20ApprovalSuccess to true, and showStakeTokenSuccess to false
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Approve ERC20 transfer").length > 0) {
            setShowErc20ApprovalSuccess(true);
            setShowStakeTokenSuccess(false);
            }

         // If transaction get succeed, set showErc20ApprovalSuccess to false, and showStakeTokenSuccess to true
        if (notifications.filter(
            (notification) => 
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Stake Tokens").length > 0) {
            setShowErc20ApprovalSuccess(false);
            setShowStakeTokenSuccess(true);
                }
            
    }, [notifications])

    return (
        <>
            <div>
                <Input onChange={handleInputChange}/>
                <Button onClick={handleStateSubmit} color="primary" size="large" disabled={isMining}>{isMining ? <CircularProgress size={26} /> : "Stake!!!"}</Button>
            </div>
            <Snackbar
                open={ showErc20ApprovalSuccess }
                autoHideDuration={5000}
                onClose={ handleCloseSnack }>
                        <Alert onClose={ handleCloseSnack } severity="success">
                            ERC-20 token transfer approved! Now approve the 2nd transcation.
                        </Alert>
            </Snackbar>

            <Snackbar
                open={ showStakeTokenSuccess }
                autoHideDuration={5000}
                onClose={ handleCloseSnack }>
                        <Alert onClose={ handleCloseSnack } severity="success">
                            Tokens Staked!
                        </Alert>
            </Snackbar>
        </>
    )
}