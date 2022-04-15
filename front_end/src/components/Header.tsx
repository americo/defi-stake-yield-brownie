import { useEthers } from "@usedapp/core";
import { Button, makeStyles } from "@material-ui/core";

// CSS using makeStyles function of material-ui
const useStyles = makeStyles((theme) => ({
    // CSS of container
    container: {
        padding: theme.spacing(4), // Content padding
        display: "flex",
        justifyContent: "flex-end", // Content in the right side
        gap: theme.spacing(1)
    }
}))

// Header is a function, and this is a content of the function
export const Header = () => {
    const classes = useStyles(); // Saving useStyles() in classes const
    const { account, activateBrowserWallet, deactivate } = useEthers(); // Import wallet functions from useEthers

    const isConnected = account !== undefined; // If is connceted set account, if not set undefined

    return (
        <div className={classes.container}>
            <div>
                {isConnected ? ( // Verify if user is conected
                    // Show this button if the user is conncted
                    <Button color="secondary" variant="contained" // Variant is contained to have a container arround the button
                        onClick={deactivate}>
                        Disconnect
                    </Button>
                ) : (
                    // Show this button if the user is disconnected
                    <Button color="primary" variant="contained" // Variant is contained to have a container arround the button
                        onClick={() => activateBrowserWallet()}>
                        Connect
                    </Button>
                )
                }
            </div>
        </div>
    )
}