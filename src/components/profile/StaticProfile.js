import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';

import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { classes } from 'istanbul-lib-coverage';
import {Link} from 'react-router-dom';

const styles = {
    paper: {
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    profile: {
        '& .image-wrapper':{
            textAlign: 'center',
            position: 'relative',
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
    }
};

const StaticProfile = (props) => {
    const { classes, profile: {handle, createdAt, imageUrl, bio, website, location}} = props;
    return (
        <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} className="profile-image" alt="profile"/>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography> }
                        <hr />
                        {location && (
                            <>
                            <LocationOnIcon color="primary" /> 
                            <span>{location}</span>
                            <hr />
                            </>
                        )}
                        {website && (
                            <>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr />
                            </>
                        )}
                    </div>
                </div>
            </Paper>
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(StaticProfile);