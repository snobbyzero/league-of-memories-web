import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import {GitHub, Twitter} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import {Hidden} from "@material-ui/core";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";


export default function Header() {

    const navLinks = [
        {title: 'Home', link: '/'},
        {title: 'Current Game', link: '/current'},
        {title: 'Achievements', link: '/achievements'},
        {title: 'Profile', link: '/Profile'},
    ];

    const socialNetworkIcons = [
        {icon: <Twitter/>, link: '#'},
        {icon: <GitHub/>, link: '#'}
    ]

    return (
        <>
            <Hidden mdUp implementation="css">
                <MobileHeader navLinks={navLinks} socialNetworkIcons={socialNetworkIcons}/>
            </Hidden>
            <Hidden smDown implementation="css">
                <DesktopHeader navLinks={navLinks} socialNetworkIcons={socialNetworkIcons}/>
            </Hidden>
        </>
    );
}
