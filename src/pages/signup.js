import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import SocialIcon from '../images/sociallogo.png';
import {Link} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

//Redux
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';
const styles = (theme) => ({
    // ...theme
})

export class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
    }

    handleSubmit = (event) => {
        console.log("triggered");
        event.preventDefault();
        this.setState({
            loading: true,
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
        // axios.post('/signup', newUserData)
        //     .then((res) => {
        //         localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        //         console.log(res.data);
        //         this.setState({
        //             loading: false
        //         });
        //         this.props.history.push('/');
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({
        //             errors: err.response.data,
        //             loading: false,
        //         })
        //         console.log(this.state.errors)
        //     })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const {classes, UI:{loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm >
                <img src={SocialIcon} alt="logo" />
                <Typography variant="h2" className={classes.pageTitle}>Sign Up</Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField id="email" name="email" type="email" label="email" className={classes.textField}
                        value={this.state.email} onChange={this.handleChange} error={errors.email ? true : false} helperText={errors.email} fullWidth />
                    <TextField id="password" name="password" type="password" label="password" className={classes.textField}
                        value={this.state.password} onChange={this.handleChange} error={errors.password ? true : false} helperText={errors.password}  fullWidth />
                    <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField}
                        value={this.state.confirmPassword} onChange={this.handleChange} error={errors.confirmPassword ? true : false} helperText={errors.confirmPassword}  fullWidth />
                    <TextField id="handle" name="handle" type="text" label="Handle" className={classes.textField}
                        value={this.state.handle} onChange={this.handleChange} error={errors.handle ? true : false} helperText={errors.handle}  fullWidth />
                    {errors.error && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.error}
                        </Typography>
                    )}
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>Signup
                    {loading && (
                        <CircularProgress size={30} className={classes.progress} />
                    )}
                    </Button>
                    <br />
                    <small>Already have an account? log in <Link to="/login">here</Link></small>
                </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup));
