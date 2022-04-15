import { Token } from "../Main";
import React, { useState } from "react";
import { Tab, makeStyles } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { WalletBalance }from "./WalletBalance";
import { StakeForm } from "../StakeForm";

interface YourWalletProps {
    supportedTokens: Array<Token>
}

// CSS
const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4)
    },
    box: {
        backgroundColor: "white",
        borderRadius: "5px"
    },
    header: {
        color: "rgb(26, 102, 255)",
        fontFamily: "Bahnschrift Light",
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2)
    },
    divider: {
        color: "rgb(102, 153, 255)",
        marginTop: theme.spacing(-1),
    }
}))

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0); // State of selectdTokenIndex

    // Function to handle changes in input field
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndex(parseInt(newValue));
    }

    const classes = useStyles(); // Save useStyles in classes

    // WalletBalance is a component responsible to get user wallet balance of token per token
    // StakeForm is a component responsible to stake tokens
    return (
        <div>
            <div className={classes.box}>
            <h1 className={classes.header}>Your wallet</h1>
            <hr className={classes.divider}></hr>
                <TabContext value={selectedTokenIndex.toString()}>
                <TabList onChange={handleChange} aria-label="stake form tabs">
                        {supportedTokens.map((token, index) => {
                            return (
                                <Tab label={token.name}
                                    value={index.toString()}
                                    key={index} />
                            )
                        })}
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <div className={classes.tabContent}>
                                    <WalletBalance token={supportedTokens[selectedTokenIndex]} />
                                    <StakeForm token={supportedTokens[selectedTokenIndex]} />
                                </div>
                            </TabPanel>
                        )
                    })}
                </TabContext>
            </div>
        </div>
    )
};