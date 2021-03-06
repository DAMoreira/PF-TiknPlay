import React from 'react';
import { Divider, Typography, Link } from '@material-ui/core';
import useStyles from './styles';

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider />
      <Typography className={classes.copyright} variant="body1">
        &copy; Tik&Play. 2021
      </Typography>
      <Typography variant="caption">
        Proyecto final |{' '}
        <Link
          href="https://github.com/DAMoreira/PF-TiknPlay"
          target="_blank"
          rel="noopener">
          Tik&Play
        </Link>
      </Typography>
    </div>
  );
}
