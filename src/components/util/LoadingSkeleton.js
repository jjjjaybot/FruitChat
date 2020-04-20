import React from 'react';
import NoImg from '../../images/no-img.png';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    cardContent: {
        width: '100%',
        flexDirection: 'col',
        padding: 25,
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover',
    },
    handle: {
        width: 60,
        height: 18,
        backgroundColor: '#00bcd4',
        marginBottom: 7
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: '80%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    halfLine: {
        height: 15,
        width: '40%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
})

const LoadingSkeleton = (props) => {
    const {classes} = props;
    const content = Array.from({length: 5}).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg} />
            <CardContent className={classes.cardContent}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ))
    return <>{content}</>
}

LoadingSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};



export default withStyles(styles)(LoadingSkeleton);