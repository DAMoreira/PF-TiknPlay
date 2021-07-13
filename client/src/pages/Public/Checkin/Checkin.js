import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  borde: {
    marginRight: theme.spacing(1),
    border: '2px solid rgba(255,255,255,0.13)',
    borderRadius: 25,
    width: 'fit-content',
    padding: '2%'
  }
}));

function Checkin(props) {
  const reservationId = props.match.params.reservationId;
  const [reservation, setReservation] = useState(null);
  const [guest, setGuest] = useState(null);
  const [checkedin, setCheckedin] = useState(null);

  useEffect(() => {
    checkinReservations(reservationId, checkedin, guest);
  }, [reservationId, checkedin, guest]);

  const checkinReservations = async id => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/reservations/checkin/' + id;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        const guest = true;
        setGuest(guest);
      }
      if (response.status === 403) {
        const checkedin = true;
        setCheckedin(checkedin);
      }
      const reservation = await response.json();
      if (response.ok) {
        setReservation(reservation);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles(props);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h2" color="inherit">
          Check In
        </Typography>

        {reservation && reservation.checkin && (
          <div align="center">
            <div className={classes.borde}>
              <CheckCircleOutlinedIcon
                style={{ fontSize: 100, color: 'green' }}
                align="center"
              />
              <Typography
                variant="body1"
                style={{ color: 'green' }}
                align="center"
                variant="h5">
                Has realizado el check in de la reserva a nombre de:{' '}
                {reservation.username}
              </Typography>
            </div>
          </div>
        )}
        {checkedin && (
          <div align="center">
            <div className={classes.borde}>
              <CancelOutlinedIcon
                color="error"
                style={{ fontSize: 100 }}
                align="center"
              />
              <Typography
                variant="body1"
                color="error"
                align="center"
                variant="h5">
                La reserva ya fue validada.
              </Typography>
            </div>
          </div>
        )}
        {guest && (
          <div align="center">
            <div className={classes.borde}>
              <CancelOutlinedIcon
                color="error"
                style={{ fontSize: 100 }}
                align="center"
              />
              <Typography
                variant="body1"
                color="error"
                align="center"
                variant="h5">
                Sólo los administradores pueden validar la reserva
              </Typography>
            </div>
          </div>
        )}

        {/*{reservation && reservation.checkin ? (
          <div align="center">
          <div className={classes.borde}>
          <CheckCircleOutlinedIcon style={{ fontSize: 100, color: "green" }} align="center"/>
          <Typography variant="body1" style={{ color: "green" }} align="center" variant="h5">
            Has realizado el check in de la reserva a nombre de: {reservation.username}
          </Typography>
          </div>
          </div>
        ) : (
          <div align="center">
          <div className={classes.borde}>
          <CancelOutlinedIcon  color="error" style={{ fontSize: 100 }} align="center"/>
          <Typography variant="body1" color="error" align="center"  variant="h5">
            La reserva ya fue validada.
          </Typography>
          </div>
          </div>
        )}*/}
      </Grid>
    </Grid>
  );
}

export default Checkin;
