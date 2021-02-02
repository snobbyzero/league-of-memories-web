import Button from "@material-ui/core/Button";
import {Grid, makeStyles} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    bottomGrid: {
        padding: theme.spacing(2),
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
    },
    nextButton: {
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
        [theme.breakpoints.between('sm', 'lg')]: {
            width: "50%"
        },
        [theme.breakpoints.up('lg')]: {
            width: "25%"
        }
    }
}));

export default function BottomButton({text, onClick}) {
    const classes = useStyles();

    return (
        <Grid container item justify="center" className={classes.bottomGrid} xs={12} sm={12}>
            <Button onClick={onClick} className={classes.nextButton} variant="contained" color="secondary" size="large">
                {text}
            </Button>
        </Grid>
    )
}
