import Paper from "@material-ui/core/Paper";
import React, {useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
    paper: {
        cursor: "pointer",
    },
    selectedPaper: {
        cursor: "pointer",
        boxShadow: `0 0 0 3px ${theme.palette.primary.main}`
    },
    icon: {
        width: 100,
        height: 100,
        margin: theme.spacing(2, 1, 2, 2)
    },
    summonerName: {
        width: 150,
        margin: theme.spacing(2, 1, 0, 1)
    },
    lvl: {
        margin: theme.spacing(0, 0, 0, 1)
    },
    skeleton: {
        margin: theme.spacing(2, 1, 0, 1)
    }
}));

export default function Summoner({summoner, selectedSummonerId}) {
    const classes = useStyles();

    const [loadedIcon, setLoadedIcon] = useState(true);

    useEffect(() => {
        const image = new Image();
        image.src = `${process.env.REACT_APP_IMAGES_URL}/images/icons/${summoner.Summoner.profileIconId}`;

        const handleError = (err) => {
            console.log(err);
        }

        const handleLoad = () => {
            setLoadedIcon(true);
        }

        image.onerror = handleError;
        image.onload = handleLoad;

        return () => {
            image.removeEventListener("error", handleError);
            image.removeEventListener("load", handleLoad);
        };
    }, [summoner.Summoner.profileIconId])

    return (
        <Paper className={summoner.summonerId === selectedSummonerId ? classes.selectedPaper : classes.paper}>
            <Grid container>
                <Grid item>
                    {
                        loadedIcon
                            ? <Avatar className={classes.icon} src={`${process.env.REACT_APP_IMAGES_URL}/images/icons/${summoner.Summoner.profileIconId}`}/>
                            : <Skeleton className={classes.icon} animation="wave" variant="circle" width={100}
                                        height={100}/>
                    }
                </Grid>
                <Grid item>
                    <Grid>
                        <Grid item xs zeroMinWidth>
                            {
                                summoner
                                    ? <Typography noWrap className={classes.summonerName}
                                                  variant="h5">{summoner.Summoner.name}</Typography>
                                    : <Skeleton className={classes.skeleton} animation="wave" variant="rect" width={150}
                                                height={30}/>
                            }
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            {
                                summoner
                                    ? <Typography noWrap className={classes.lvl}
                                                  variant="body1">Level {summoner.Summoner.level}</Typography>
                                    : <Skeleton className={classes.skeleton} animation="wave" variant="rect" width={100}
                                                height={20}/>
                            }

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}
