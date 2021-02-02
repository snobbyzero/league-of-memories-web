import {Container, makeStyles, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import BottomButton from "../components/BottomButton";
import Title from "../components/Title";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {getFingerprint} from "../utils/fingerprintUtils";
import {getAccessToken} from "../utils/tokensUtils";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme) => ({
    root: {}
}));

export default function ConfirmSummoner(props) {

    const classes = useStyles();
    const summonerId = props.location.state.summonerId;
    const [code, setCode] = useState("");
    const instructionSteps = [
        {
            primary: "1. Open League of Legends client",
            secondary: ""
        },
        {
            primary: "2. Go to Settings",
            secondary: ""
        },
        {
            primary: "3. Click Verification",
            secondary: ""
        },
        {
            primary: "4. Paste the code under this instruction",
            secondary: ""
        },
        {
            primary: "5. Click Save",
            secondary: ""
        },
        {
            primary: "6. Go back to the page and click Apply",
            secondary: ""
        }
    ];

    const [linkCopied, setLinkCopied] = useState(false);

    const handleClick = () => {

    }

    useEffect(() => {
        const getCode = async () => {
            const accessToken = await getAccessToken();
            axios.get(`${process.env.REACT_APP_API_URL}/api/account/verificationCode`, {
                headers: {
                    fingerprint: await getFingerprint(),
                    Authorization: await getAccessToken()
                }
            })
                .then((response) => {
                    console.log(response.data);
                    setCode(response.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getCode();
    }, []);

    return (
        <Container className={classes.root}>
            <Title text="Confirm that it is your Summoner"/>
            <Grid container justify="center">

                <List>
                    {
                        instructionSteps.map(({primary, secondary}, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={
                                        <Typography variant="h6">
                                            {primary}
                                        </Typography>
                                    }
                                    secondary={secondary !== "" ? secondary : null}
                                />
                            </ListItem>
                        ))
                    }
                </List>

            </Grid>
            <BottomButton text="Apply" onClick={handleClick}/>
        </Container>
    )
}
