import React from 'react';
import { Grid, Box, TextField, MenuItem, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function BookingForm(props) {
  const {
    cinemas,
    showtimes,
    selectedCinema,
    onChangeCinema,
    selectedDate,
    onChangeDate,
    selectedTime,
    onChangeTime
  } = props;

  var maxDate = new Date();
  var minDate = new Date();

  const sortedStart = showtimes.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );
  const sortedEnd = showtimes.sort(
    (a, b) => new Date(a.endDate) - new Date(b.endDate)
  );

  minDate = sortedStart.reverse()[0];
  maxDate = sortedEnd[0];

  function todayOrMin(min) {
    var exit = new Date();
    new Date(min.startDate) < new Date()
      ? (exit = new Date())
      : (exit = new Date(min.startDate));
    return exit;
  }

  function uniqueTimes(selectedDate) {
    return showtimes
      .filter(
        showtime =>
          new Date(showtime.startDate) <= new Date(selectedDate) &&
          new Date(showtime.endDate) >= new Date(selectedDate)
      )
      .map(showtime => showtime.startAt)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort(
        (a, b) => new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b)
      );
  }

  if (!cinemas.length)
    return (
      <Box
        display="flex"
        width={1}
        height={1}
        alignItems="center"
        justifyContent="center">
        <Typography align="center" variant="h2" color="inherit">
          No hay salas disponibles
        </Typography>
      </Box>
    );

  return (
    <Grid container spacing={3}>
      {
        <Grid item xs>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              inputVariant="outlined"
              margin="none"
              fullWidth
              id="start-date"
              label="Fecha"
              minDate={todayOrMin(minDate)}
              maxDate={new Date(maxDate.endDate)}
              value={selectedDate}
              onChange={date => onChangeDate(date._d)}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      }
      {selectedDate && (
        <Grid item xs>
          <TextField
            fullWidth
            select
            value={selectedTime}
            label="Horario"
            variant="outlined"
            onChange={onChangeTime}>
            {uniqueTimes(selectedDate).map((time, index) => (
              <MenuItem key={time + '-' + index} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
      {selectedTime && (
        <Grid item xs>
          <TextField
            fullWidth
            select
            value={selectedCinema}
            label="Seleccionar sala"
            variant="outlined"
            onChange={onChangeCinema}>
            {cinemas.map(cinema => (
              <MenuItem key={cinema._id} value={cinema._id}>
                {cinema.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
    </Grid>
  );
}
