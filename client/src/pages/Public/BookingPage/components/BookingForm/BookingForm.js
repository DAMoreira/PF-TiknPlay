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
    times,
    selectedTime,
    onChangeTime
  } = props;

  const showtime = showtimes.find(
    showtime => (showtime.endDate >= selectedDate) && (showtime.startDate <= selectedDate)
  );

  var maxDate = new Date();
  var minDate = new Date();

  const sortedStart = showtimes.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const sortedEnd = showtimes.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

  minDate = sortedStart.reverse()[0];
  maxDate = sortedEnd[0];

  function todayOrMin(min) {
    var exit = new Date();
    new Date(min.startDate) < new Date()
      ?
      exit = new Date()
      :
      exit = new Date(min.startDate)
    return exit;
  };

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
      {(
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
      )}
      {selectedDate && (
        <Grid item xs>
          <TextField
            fullWidth
            select
            value={selectedTime}
            label="Horario"
            variant="outlined"
            onChange={onChangeTime}>
            {times.map((time, index) => (
              <MenuItem key={time + '-' + index} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
      {selectedTime && <Grid item xs>
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
      </Grid>}
    </Grid>
  );
}
