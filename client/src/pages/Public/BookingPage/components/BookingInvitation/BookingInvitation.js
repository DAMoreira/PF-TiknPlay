import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, TextField, Grid, Button, Box } from '@material-ui/core';
import { Paper } from '../../../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  paper: { padding: theme.spacing(4) },
  gridContainer: {
    marginTop: theme.spacing(4)
  },
  successInfo: { margin: theme.spacing(3) },
  ignoreButton: {
    marginLeft: theme.spacing(3)
  },
  image: {
    marginBottom: theme.spacing(3)
  }
}));

const convertToAlphabet = value => (value + 10).toString(36).toUpperCase();

export default function BookingInvitation(props) {
  const classes = useStyles(props);
  const {
    selectedSeats,
    sendInvitations,
    ignore,
    invitations,
    onSetInvitation,
    onDownloadPDF,
    getQR
  } = props;

  const notValidInvitations = !Object.keys(invitations).length;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Descargue sus reservas
        </Typography>
        <Typography
          className={classes.successInfo}
          variant="body1"
          align="center">
          Tu reserva se ha realizado con exito! Comproba tu correo electronico
          para obtener tu codigo QR.
        </Typography>
        <Typography
          className={classes.successInfo}
          variant="body1"
          align="center">
          Asientos reservados: {selectedSeats}
        </Typography>
        <div className={classes.image} align="center">
          <img src={getQR()}></img>
        </div>
        <Box width={1} textAlign="center" spacing={3}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => onDownloadPDF()}>
            Descargar codigo
          </Button>
        </Box>
        <Grid className={classes.gridContainer} container spacing={3}>
          {/*{selectedSeats.map((seat, index) => (
            <Grid item xs={12} md={6} lg={4} key={'seat-' + index}>
              <TextField
                fullWidth
                label="email"
                name={`${convertToAlphabet(seat[0])}-${seat[1]}`}
                helperText={`Please select an Email for Row : ${convertToAlphabet(
                  seat[0]
                )} - Seat Number : ${seat[1]}`}
                margin="dense"
                required
                value={
                  invitations[`${convertToAlphabet(seat[0])}-${seat[1]}`] || ''
                }
                variant="outlined"
                onChange={event => onSetInvitation(event)}
              />
            </Grid>
          ))}
          <Grid item xs={12} container>
            <Grid item>
              <Button
                disabled={notValidInvitations}
                color="primary"
                variant="outlined"
                onClick={() => sendInvitations()}>
                Enviar invitaciones
              </Button>
            </Grid>*/}
          <Grid item>
            <Button
              className={classes.ignoreButton}
              color="secondary"
              variant="outlined"
              onClick={() => ignore()}>
              Cerrar
            </Button>
          </Grid>
          {/* </Grid>*/}
        </Grid>
      </Paper>
    </div>
  );
}
