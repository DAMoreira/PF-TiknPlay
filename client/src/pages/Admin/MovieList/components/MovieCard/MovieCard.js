import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import { Paper } from '../../../../../components';
import { SERVER_IP } from '../../../../../store/types';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    paddingBottom: theme.spacing(2)
  },
  imageWrapper: {
    height: '450px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    'object-fit': 'cover'
  },
  details: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(0)
  },
  title: {
    fontSize: '18px',
    lineHeight: '21px',
    marginTop: theme.spacing(2),
    textTransform: 'capitalize'
  },
  description: {
    lineHeight: '16px',
    height: theme.spacing(4),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(3)
  },
  updateIcon: {
    color: theme.palette.text.secondary
  },
  updateText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

const convertFirstCharacterToUppercase = stringToConvert => {
  var firstCharacter = stringToConvert.substring(0, 1);
  var restString = stringToConvert.substring(1);

  return firstCharacter.toUpperCase() + restString;
};

function MovieCard(props) {
  const classes = useStyles(props);
  const { className, movie } = props;

  const rootClassName = classNames(classes.root, className);
  return (
    <Paper className={rootClassName}>
      <div className={classes.imageWrapper}>
        <img
          alt="movie"
          className={classes.image}
          src={`http://${SERVER_IP}:8080/image/${movie.image}`}
        />
      </div>
      <div className={classes.details}>
        <Typography className={classes.title} variant="h4">
          {movie.title}
        </Typography>
        <Typography className={classes.description} variant="body1">
          {convertFirstCharacterToUppercase(movie.description)}
        </Typography>
      </div>
      <div className={classes.stats}>
        <AccessTimeIcon className={classes.updateIcon} />
        <Typography className={classes.updateText} variant="body2">
          {movie.duration} minutos
        </Typography>
      </div>
    </Paper>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
};

export default MovieCard;
