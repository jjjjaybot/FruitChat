import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import NoImg from '../../images/no-img.png';

import Paper from '@material-ui/core/Paper';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


const styles = theme => ({
    paper: {
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    profile: {
        '& .image-wrapper':{
            textAlign: 'center',
            position: 'relative',
            '& butotn': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            }
        }
    },
    handle: {
        height: 20,
        backgroundColor: '#00bcd4',
        width: 60,
        margin: '0px auto 7px auto',
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '100%',
        marginBottom: 10,

    }
})

const ProfileSkeleton = (props) => {
    const {classes} = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={NoImg} alt="profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <LocationOnIcon color="primary" /><span>Location</span>
                    <hr />
                    <LinkIcon color="primary" /> https://website.com
                    <hr />
                    <CalendarTodayIcon color="primary" /><span></span>Joined date
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);
