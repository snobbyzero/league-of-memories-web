import makeStyles from "@material-ui/core/styles/makeStyles";
import {Grid} from "@material-ui/core";
import React, {useRef, useState} from "react";
import Container from "@material-ui/core/Container";
import SearchBar from "./SearchBar";
import SummonerSkeleton from "./SummonerSkeleton";
import axios from "axios";
import Summoner from "./Summoner";
import BottomButton from "../components/BottomButton";
import {useHistory} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Title from "../components/Title";

const useStyles = makeStyles((theme) => ({
    grid: {
        flexGrow: 1,
        marginBottom: theme.spacing(8),
    },
}));

export default function AddSummoner() {
    const classes = useStyles();

    const history = useHistory();
    const summonerName = useRef();
    const [loading, setLoading] = useState(false);
    const [summoners, setSummoners] = useState([]);
    const [selectedSummonerId, setSelectedSummonerId] = useState("");

    const handleNextClick = () => {
        console.log(selectedSummonerId);
        history.push({
            pathname: '/user/confirm-summoner',
            state: {
                summonerId: selectedSummonerId
            }
        })
    }

    const handleSearchClick = (e) => {
        const name = summonerName.current.value;
        e.preventDefault();

        if (name && name !== "") {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_API_URL}/api/summoners/list/${name}`)
                .then((response) => {
                    setLoading(false);
                    setSummoners(response.data);
                    console.log(response.data);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
    }

    return (
        <Container className={classes.root}>
            <Title text="Find and pick your summoner"/>
            <SearchBar summonerNameRef={summonerName} onSubmit={(e) => handleSearchClick(e)}/>
            <Grid container justify="flex-start" spacing={2} className={classes.grid}>
                {
                    loading
                        ? [0, 1, 2, 3].map((value) => (
                            <Grid key={value} item xl={3} lg={3} md={4} sm={6} xs={12}>
                                <SummonerSkeleton/>
                            </Grid>
                        ))
                        : summoners.map((summoner) => (
                            <Grid onClick={(id) => setSelectedSummonerId(summoner.summonerId)}
                                  key={summoner.Summoner.id} item xl={3} lg={3} md={4} sm={6} xs={12}>
                                <Summoner summoner={summoner} selectedSummonerId={selectedSummonerId}/>
                            </Grid>
                        ))
                }
            </Grid>
            <BottomButton text="Next" onClick={handleNextClick}/>
        </Container>
    );
}
