import React, {useState} from "react";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {Link} from "@material-ui/core";
import OpenFormButton from "./OpenFormButton";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.down('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        }
    },
    appBar: {},
    menuButton: {
        marginRight: theme.spacing(2),
    },
    // necessary for content to be below app bar
    offset: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MobileHeader({navLinks, socialNetworkIcons}) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.offset}/>
            <Divider/>
            <List>
                {navLinks.map(({title, link}, index) => (
                    <ListItem key={index} button component={Link} to={link}>
                        <ListItemText primary={title}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    //const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid container>
                        <Grid container item xs={4}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Grid>
                        <Grid container item xs={8} justify="flex-end">
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
            <div className={classes.offset}/>
            <nav className={classes.drawer}>
                <Drawer
                    variant="temporary"
                    anchor={'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </div>
    );
}
