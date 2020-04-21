import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import EditDetails from './EditDetails';
import ProfileSkeleton from '../util/ProfileSkeleton';
import dayjs from 'dayjs';

//MUI
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Alert from '@material-ui/lab/Alert';
//Redux
import {logoutUser, uploadImage} from '../../redux/actions/userActions';
import MyButton from '../util/MyButton';


const styles = {
    paper: {
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    buttons: {
        margin: 20,
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
    }
};

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        //send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
    handleLogout = () => {
        this.props.logoutUser();
    }
    render() {
        const { classes, user: { credentials: {handle, createdAt, imageUrl, bio, website, location}, loading, authenticated}} = this.props;
        
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} className="profile-image" alt="profile"/>
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                        <MyButton tip="Edit profile picture" onClick={this.handleEditPicture} btnClassName="button">
                            <EditIcon color="primary" />
                        </MyButton>
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
                        <CalendarToday color="primary" />{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>

                    </div>
                    <MyButton tip="Log out" onClick={this.handleLogout} >
                            <ExitToAppIcon color="primary" />
                        </MyButton>
                    <EditDetails />
                </div>
            </Paper>
        ):(
            <Paper className={classes.paper}>
                <Alert severity="info" align="center">It looks like that you are not logged in...</Alert>
                <div className={classes.buttons}>
                    <Button className={classes.buttons} variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button className={classes.buttons} variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                </div>
            </Paper>
        )) : (<ProfileSkeleton />)
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage};

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
