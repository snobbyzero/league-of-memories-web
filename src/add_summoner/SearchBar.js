import {Box, IconButton} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(3, 0, 3, 0)
    },
    input: {},
    search: {}
}));

export default function SearchBar({summonerNameRef, onSubmit}) {
    const classes = useStyles();
    const [summonerName, setSummonerName] = useState("");

    return (
        <Paper component="form" onSubmit={(e) => onSubmit(e)} className={classes.paper}>
            <Box display="flex">
                <Box p={1} flexGrow={1}>
                    <InputBase
                        type="text"
                        fullWidth
                        className={classes.input}
                        placeholder="Summoner name"
                        inputRef={summonerNameRef}
                        value={summonerName}
                        onChange={(event) => setSummonerName(event.target.value)}
                        endAdornment={
                            <IconButton onClick={() => setSummonerName("")}>
                                <ClearIcon/>
                            </IconButton>
                        }
                    />
                </Box>
                <Box p={1}>
                    <IconButton type="submit" className={classes.search}>
                        <SearchIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}
