import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import ResponsiveMovieCard from '../components/ResponsiveMovieCard/ResponsiveMovieCard';
import { getMovies } from '../../../store/actions';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  body: {
    fontSize: '1.25rem',
    lineHeight: '1.25rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3)
  },
  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' }
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '40%',
    maxHeight: '40%',
    marginTop: theme.spacing(5),
  }
}));

function MovieCategoryPage(props) {
  const { movies, getMovies } = props;
  const category = props.match.params.category;
  useEffect(() => {
    if (!movies.length) {
      getMovies();
    }
  }, [movies, getMovies]);

  const classes = useStyles(props);
  return (
    <Grid container spacing={2}>
      {!['nowShowing', 'comingSoon'].includes(category) ? (
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            Category Does not exist.
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h2" color="inherit">
              {category === 'nowShowing' ? 'Cartelera' : 'Proximamente'}
            </Typography>
          </Grid>
          {!movies.length && (
          <Grid item xs={12}>
            <img
            className={classes.img}
            src="https://i.postimg.cc/D0ycFMx1/istockphoto-1191879865-612x612.png"
            ></img>
            <Typography className={classes.body} variant="h2" color="inherit">
              Nada por aquí...
            </Typography>
          </Grid>
          )}
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justify="center"
            spacing={2}>
            {movies.map(movie => (
              <Grid key={movie._id} item className={classes.fullWidth}>
                <ResponsiveMovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
}

const mapStateToProps = ({ movieState }, ownProps) => ({
  movies: movieState[ownProps.match.params.category] || []
});

const mapDispatchToProps = { getMovies };

export default connect(mapStateToProps, mapDispatchToProps)(MovieCategoryPage);
