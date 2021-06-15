import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import { AccountProfile, AccountDetails } from './components';
import { uploadImage } from '../../../store/actions';
import { MyReservationTable } from '../../Public/MyDashboard/components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    //marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  title2: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  title3: {
    fontSize: '1rem',
    lineHeight: '3rem',
    textAlign: 'center'
  }
});

class Account extends Component {
  state = { image: null };

  static propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { image } = this.state;
    const {
      classes,
      user,
      uploadImage,
      reservations,
      movies,
      cinemas
    } = this.props;

    const myReservations = reservations.filter(
      reservation => reservation.username === user.username
    );

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {user.role !== 'guest' ? (
              <Typography
                className={classes.title}
                variant="h2"
                color="inherit">
                Mi perfil
              </Typography>
            ) : (
              <Typography
                className={classes.title2}
                variant="h2"
                color="inherit">
                Mi perfil
              </Typography>
            )}
          </Grid>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AccountProfile
              file={image}
              user={user}
              onUpload={event => {
                const file = event.target.files[0];
                this.setState({ image: file });
              }}
            />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <AccountDetails
              file={image}
              user={user}
              uploadImage={uploadImage}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title2} variant="h2" color="inherit">
              Mis reservas
            </Typography>
            {reservations.length === 0 ? (
              <Typography
                className={classes.title3}
                variant="h2"
                color="inherit">
                No tenés reservas cargadas...
              </Typography>
            ) : (
              <Grid item xs={12}>
                <MyReservationTable
                  reservations={myReservations}
                  movies={movies}
                  cinemas={cinemas}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({
  authState,
  movieState,
  reservationState,
  cinemaState
}) => ({
  user: authState.user,
  movies: movieState.movies,
  reservations: reservationState.reservations,
  cinemas: cinemaState.cinemas
});
export default connect(mapStateToProps, { uploadImage })(
  withStyles(styles)(Account)
);
