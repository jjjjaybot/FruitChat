import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import LoadingSkeleton from '../../src/components/util/LoadingSkeleton';

import {connect} from 'react-redux';
import {getScreams} from '../redux/actions/dataActions';

export class home extends Component {
    componentDidMount(){
        this.props.getScreams();
    }
    render() {
        const {screams, loading, likeCount} = this.props.data;
        console.log("all the screams");
        console.log(screams);
        console.log("all the likes");
        console.log(this.props.data);
        let recentScreamsMarkup = !loading ? (
            screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
        ) : <LoadingSkeleton />
        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile></Profile>
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getScreams})(home);
