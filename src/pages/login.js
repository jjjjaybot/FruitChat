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
//REdux 
import { connect } from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

const styles = (theme) => ({
    // ...theme
})


export class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
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
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
        console.log(this.props);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm >
                <img src={SocialIcon} alt="logo" />
                <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField id="email" name="email" type="email" label="email" className={classes.textField}
                        value={this.state.email} onChange={this.handleChange} error={errors.email ? true : false} helperText={errors.email} fullWidth />
                    <TextField id="password" name="password" type="password" label="password" className={classes.textField}
                        value={this.state.password} onChange={this.handleChange} error={errors.password ? true : false} helperText={errors.password}  fullWidth />
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
                    <Button type="submit" variant="contained" className={classes.button} disabled={loading}>LOGIN
                    {loading && (
                        <CircularProgress size={30} className={classes.progress} />
                    )}
                    </Button>
                    <br />
                    <small>dont have an account? sign up <Link to="/signup">Here</Link></small>
                </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
