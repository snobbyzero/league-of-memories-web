import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    icon: {
        margin: theme.spacing(2, 1, 2, 2)
    },
    skeleton: {
        margin: theme.spacing(2, 1, 0, 1)
    }
}));

export default function SummonerSkeleton() {
    const classes = useStyles();

    return (
        <Paper>
            <Grid container>
                <Grid item>
                    <Skeleton className={classes.icon} animation="wave" variant="circle" width={100} height={100}/>
                </Grid>
                <Grid item>
                    <Grid>
                        <Grid item>
                            <Skeleton className={classes.skeleton} animation="wave" variant="rect" width={150}
                                      height={30}/>
                        </Grid>
                        <Grid item>
                            <Skeleton className={classes.skeleton} animation="wave" variant="rect" width={100}
                                      height={20}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
