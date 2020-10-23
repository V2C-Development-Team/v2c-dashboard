import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withHeaderAndFooter from '../../../hoc/withHeaderAndFooter';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { Container, Paper } from '@material-ui/core';

import helpData from './helpData.json';

import query_img from '../../../assets/images/query.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    form: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '60%',
        margin: ' 3em auto 5em',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    imgContainer: {
        width: 250,
        maxWidth: '100%',
        margin: '5em auto 2em',
        '& > img': {
            width: '100%',
        },
    },
}));

const Help = () => {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const [questions, setQuestions] = useState(helpData);

    const handleSearch = (e) => {
        const qry = e.target.value;
        setQuery(qry);
        //search questions
        let tempQ = helpData.filter(
            (d) =>
                d.question.toLowerCase().includes(qry.toLowerCase()) ||
                d.answer.toLowerCase().includes(qry.toLowerCase())
        );
        setQuestions(tempQ);
    };

    return (
        <Paper
            square
            style={{ flex: 1, paddingTop: '5em', paddingBottom: '5em' }}
        >
            <Container maxWidth="md">
                <div className={classes.imgContainer}>
                    <img src={query_img} alt="query" />
                </div>
                <Typography variant="h4" align="center">
                    We Can Help
                </Typography>
                <Paper
                    component="form"
                    className={classes.form}
                    onSubmit={(e) => e.preventDefault}
                >
                    <IconButton
                        type="submit"
                        className={classes.iconButton}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="Search frequently asked questions"
                        inputProps={{
                            'aria-label': 'search frequently asked questions',
                        }}
                        value={query}
                        onChange={handleSearch}
                    />
                    <IconButton
                        className={classes.iconButton}
                        aria-label="clear"
                    >
                        <CloseIcon />
                    </IconButton>
                    {/*                     <Divider
                        className={classes.divider}
                        orientation="vertical"
                    /> */}
                </Paper>
                {questions.length > 0 ? (
                    questions.map((q, index) => (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id={`panel1a-header-${index}`}
                            >
                                <Typography className={classes.heading}>
                                    {q.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{q.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>
                        No search results found with '{query}'
                    </p>
                )}
            </Container>
        </Paper>
    );
};

export default withHeaderAndFooter(Help);
