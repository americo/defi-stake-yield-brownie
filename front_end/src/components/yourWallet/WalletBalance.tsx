import { useEthers, useTokenBalance } from "@usedapp/core";
import { Token } from "../Main";
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../BalanceMsg";

export interface WalletBalanceProps {
    token: Token;
}

export const WalletBalance = ({token}: WalletBalanceProps) => { // WalletBalacne receive a token
    const { image, address, name } = token; // Get image, address and name of token
    const { account } = useEthers(); // Get current account
    const tokenBalance = useTokenBalance(address, account); // Get current account balance for an token
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0 // Format token
    
    // Return the component BalanceMsg, responsible to show the balance message
    return (<BalanceMsg label={`Your un-staked ${name} balance`} tokenImgSrc={image} amount={formattedTokenBalance}
        />
    )
}