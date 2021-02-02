import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Memory} from "@material-ui/icons";
import OpenFormButton from "./OpenFormButton";

const useStyles = makeStyles((theme) => ({
    root: {
        textDecoration: "none"
    },
    menuButton: {
        marginRight: theme.spacing(3),
    },
    navLink: {
        marginRight: theme.spacing(3)
    },
    icon: {
        marginRight: theme.spacing(2)
    }
}));

export default function DesktopHeader({navLinks, socialNetworkIcons}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container>
                        <Grid container item xs={1}>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <Memory/>
                            </IconButton>
                        </Grid>
                        <Grid container direction="row" item xs={7}>
                            {navLinks.map(({title, link}, index) => {
                                return (
                                    <Button key={index} color='inherit' className={classes.navLink} href={link}>
                                        {title}
                                    </Button>
                                )
                            })}
                        </Grid>
                        <Grid container direction="row" item xs={4} justify="flex-end">
                            {socialNetworkIcons.map(({icon, link}, index) => {
                                return (
                                    <IconButton key={index} href={link} className={classes.icon}>
                                        {icon}
                                    </IconButton>
                                )
                            })}
                            <OpenFormButton/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}
