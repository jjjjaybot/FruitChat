import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import MyButton from '../util/MyButton';
import {Link}from 'react-router-dom';
import LikeButton from './LikeButton';
import { IconButton, Dialog, DialogContent, TextField, DialogTitle, Button, Grid, Typography } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import Comments from './Comments';
import CommentForm from './CommentForm';
//Redux
import {connect} from 'react-redux';
import {getScream, clearErrors} from '../../redux/actions/dataActions';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles= {
    profileImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    invisibleSeperator: {
        border: 'none',
        margin: 4
    },
    DialogContent: {
        padding: 20
    },
    closeButton:{
        position: 'absolute',
        left: '90%',
    },
    expandButton:{
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: '50',
        marginBottom: '50'
    }
}

class ScreamDialog extends Component {
    state = { 
        open: false,
        oldPath: '',
        newPath: ''
     }

     componentDidMount(){
         if(this.props.openDialog){
             this.handleOpen();
         }
     }

     handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, screamId} = this.props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;

        if (oldPath === newPath) oldPath= `/users/${userHandle}`;
        window.history.pushState(null ,null ,newPath);

         this.setState({open: true, oldPath, newPath});
         this.props.getScream(this.props.screamId);
     }
     handleClose = () => {
         window.history.pushState(null, null, this.state.oldPath);
         this.setState({open: false});
         this.props.clearErrors();
     }

    render() { 
        const {classes, scream: {screamId, body, createdAt, likeCount, commentCount, imageUrl, userHandle, comments}, UI: {loading}}
            = this.props;
            const dialogMarkup = loading ? (
                <div className={classes.spinnerDiv}>
                <CircularProgress size={200} />
                </div>
            ) : (
                <Grid container spacing={16}>
                    <Grid item sm={5}>
                        <img src={imageUrl} alt="Profile" className={classes.profileImage}/>
                    </Grid>
                    <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeperator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeperator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} comments</span>
                    </Grid>
                    <hr className={classes.visibleSeperator} />
                    <CommentForm screamId={screamId} />
                    <Comments comments={comments} />
                </Grid>
            )
        return ( 
            <>
                <MyButton onClick={this.handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                        <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                            <CloseIcon />
                        </MyButton>
                        <DialogContent className={classes.DialogContent}>
                            {dialogMarkup}
                        </DialogContent>
                    </Dialog>
            </>
         );
    }
}
 
ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));