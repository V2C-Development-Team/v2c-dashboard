import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from './Cards.module.scss';

const TemplateCard = (props) => {
    const dashed = props.dashed;
    return (
        <Card
            variant="outlined"
            style={{ border: dashed && '2px dashed rgba(0, 0, 0, 0.12)' }}
        >
            <CardContent>
                <Typography variant="h5" component="h2">
                    Heading 2
                </Typography>

                <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
                <Button className={classes.button}>Plain Button</Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Primary Button
                </Button>
                <Button variant="outlined" className={classes.button}>
                    Outlined Button
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                >
                    Secondary Button
                </Button>
            </CardContent>
        </Card>
    );
};

export default TemplateCard;
