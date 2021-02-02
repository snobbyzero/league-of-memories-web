import {Grid, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";

const useStyles = makeStyles((theme) => ({
    header: {
        margin: theme.spacing(1)
    }
}))

export default function Title({text}) {
    const classes = useStyles();

    return (

        <Grid className={classes.header} container justify="center">
            <Typography variant="h4">{text}</Typography>
        </Grid>
    )
}
