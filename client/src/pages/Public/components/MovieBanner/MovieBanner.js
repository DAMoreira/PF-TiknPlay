import React from 'react';
import classnames from 'classnames';
import { Rating } from '@material-ui/lab';
import { SERVER_IP } from '../../../../store/types';
import {isMobile} from 'react-device-detect';
import {
  Box,
  Typography,
  Button,
  makeStyles,
  withStyles
} from '@material-ui/core';
import { textTruncate } from '../../../../utils';
import { Link } from 'react-router-dom';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import styles from './styles';

const useStyles = makeStyles(styles);

const convertFirstCharacterToUppercase = stringToConvert => {
  var firstCharacter = stringToConvert.substring(0, 1);
  var restString = stringToConvert.substring(1);

  return firstCharacter.toUpperCase() + restString;
};
const StyledRating = withStyles({
  iconFilled: {
    color: '#fff'
  },
  iconEmpty: {
    color: '#fff'
  }
})(Rating);

function MovieBanner(props) {
  const { movie, fullDescription } = props;
  const classes = useStyles(props);
  if (!movie) return null;

  if (movie.trailer !== undefined) {
    var video_id = movie.trailer.split('v=')[1];
    if (video_id !== undefined) {
      var questionPosition = video_id.indexOf('&');
      if (questionPosition != -1) {
        video_id = video_id.substring(0, questionPosition);
      }
    }
  }


  return (
    <div className={classes.movieHero}>
      <div className={classes.infoSection}>
        <header className={classes.movieHeader}>
          {fullDescription && (
            <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
              {movie.genre.split(',').map((genre, index) => (
                <Typography
                  style={{ textTransform: 'capitalize' }}
                  key={`${genre}-${index}`}
                  className={classes.tag}
                  variant="body1"
                  color="inherit">
                  {genre}
                </Typography>
              ))}

              {/*<StyledRating
                value={4}
                readOnly
                size="small"
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />*/}
            </Box>
          )}
          <Typography
            className={classes.movieTitle}
            variant="h1"
            color="inherit">
            {movie.title}
          </Typography>
          <Typography
            className={classes.descriptionText}
            variant="body1"
            color="inherit">
            {convertFirstCharacterToUppercase(
              textTruncate(movie.description, 450)
            )}
          </Typography>
          <Typography
            style={{ textTransform: 'capitalize' }}
            className={classes.director}
            variant="h4"
            color="inherit">
            Dirigida por: {movie.director}
          </Typography>
          <Typography
            className={classes.duration}
            variant="body1"
            color="inherit">
            {movie.duration} min
          </Typography>
          <Typography
            className={classes.language}
            variant="body1"
            color="inherit">
            {movie.language}
          </Typography>
          {/*<Typography className={classes.genre} variant="body1" color="inherit">
            {movie.genre}
              </Typography>*/}
          {/*style={{
            backgroundImage: `url(http://${SERVER_IP}:8080/image/${movie.image})`
            }}ESTO VA ABAJO EN EL DIV*/}
        </header>
      </div>
      {!isMobile &&
      video_id !== undefined ?
        <div
          className={classes.blurBackground}>
            <iframe frameBorder="0" height="100%" width="100%"
              src={`https://www.youtube.com/embed/${video_id}?autoplay=1&loop=1&mute=1&controls=0&playlist=${video_id}`}
            >
            </iframe>
        </div>
      :
        <div
          className={classes.blurBackground}
          style={{
            backgroundImage: `url(http://${SERVER_IP}:8080/image/${movie.image})`
          }}
        >
        </div>
      }
      {isMobile && <div
        className={classes.blurBackground}
        style={{
          backgroundImage: `url(http://${SERVER_IP}:8080/image/${movie.image})`
        }}
      >
      </div>

      }
      <div className={classes.movieActions}>
        {fullDescription ? (
          <Link to={`booking/${movie._id}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" className={classes.button}>
              Reservar Entradas
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        ) : (
          <Link to={`movie/${movie._id}`} style={{ textDecoration: 'none' }}>
            <Button className={classnames(classes.button, classes.learnMore)}>
              Más información
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        )}
      </div>

    </div>
  );
}

export default MovieBanner;
