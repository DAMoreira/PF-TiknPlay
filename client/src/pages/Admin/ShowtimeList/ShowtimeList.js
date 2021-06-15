import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';
import { AddShowtime, ShowtimesToolbar, ShowtimesTable } from './components';
import {
  getShowtimes,
  toggleDialog,
  selectShowtime,
  selectAllShowtimes,
  deleteShowtime,
  getMovies,
  getCinemas
} from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';

class ShowtimeList extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      movies,
      showtimes,
      getShowtimes,
      getMovies,
      cinemas,
      getCinemas
    } = this.props;
    if (!showtimes.length) getShowtimes();
    if (!movies.length) getMovies();
    if (!cinemas.length) getCinemas();
  }

  handleDeleteShowtime = () => {
    const { selectedShowtimes, deleteShowtime } = this.props;
    selectedShowtimes.forEach(element => deleteShowtime(element));
  };

  render() {
    const {
      classes,
      showtimes,
      selectedShowtimes,
      openDialog,
      toggleDialog,
      selectShowtime,
      selectAllShowtimes,
      movies,
      cinemas
    } = this.props;

    return (
      <div className={classes.root}>
        <ShowtimesToolbar
          showtimes={showtimes}
          toggleDialog={toggleDialog}
          selectedShowtimes={selectedShowtimes}
          deleteShowtime={this.handleDeleteShowtime}
        />
        <div className={classes.content}>
          {!showtimes.length ? (
            <Typography variant="h6">No existen funciones</Typography>
          ) : (
            <ShowtimesTable
              onSelectShowtime={selectShowtime}
              selectedShowtimes={selectedShowtimes}
              selectAllShowtimes={selectAllShowtimes}
              showtimes={showtimes}
              movies={movies}
              cinemas={cinemas}
            />
          )}
        </div>
        <ResponsiveDialog
          id="Add-showtime"
          open={openDialog}
          handleClose={() => toggleDialog()}>
          <AddShowtime
            selectedShowtime={showtimes.find(
              showtime => showtime._id === selectedShowtimes[0]
            )}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

const mapStateToProps = ({ showtimeState, movieState, cinemaState }) => ({
  openDialog: showtimeState.openDialog,
  showtimes: showtimeState.showtimes,
  movies: movieState.movies,
  cinemas: cinemaState.cinemas,
  selectedShowtimes: showtimeState.selectedShowtimes
});

const mapDispatchToProps = {
  getShowtimes,
  toggleDialog,
  selectShowtime,
  selectAllShowtimes,
  deleteShowtime,
  getMovies,
  getCinemas
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ShowtimeList));
