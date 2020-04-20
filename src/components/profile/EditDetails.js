import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import {connect} from 'react-redux';
import { editUserDetails} from '../../redux/actions/userActions';

import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, Dialog, DialogContent, TextField, DialogTitle, DialogActions, Button } from '@material-ui/core';
import MyButton from '../util/MyButton';



const styles = (theme) => ({
    // ...theme
    button: {
        float: 'right',
    }
})

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    }

    componentDidMount(){
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials);
    }    

    handleOpen = () => {
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({open: false});
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <MyButton tip="Edit Details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Edit your profile</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name="bio" type="text" label="Bio" multiline rows="3" placeholder="A short bio about yourself"
                                className={classes.textField} value={this.state.bio} onChange={this.handleChange} fullWidth />
                            <TextField name="website" type="text" label="website" placeholder="Website"
                                className={classes.textField} value={this.state.website} onChange={this.handleChange} fullWidth />
                            <TextField name="location" type="text" label="Location" placeholder="Location"
                                className={classes.textField} value={this.state.location} onChange={this.handleChange} fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})


export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
