import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';

class ReservationsTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    reservations: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired,
    cinemas: PropTypes.array.isRequired
  };

  static defaultProps = {
    reservations: [],
    movies: [],
    cinemas: [],
    onSelect: () => {},
    onShowDetails: () => {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  onFindAttr = (id, list, attr) => {
    const item = list.find(item => item._id === id);
    return item ? item[attr] : `Not ${attr} Found`;
  };

  render() {
    const { classes, className, reservations, movies, cinemas } = this.props;
    const { rowsPerPage, page } = this.state;
    const rootClassName = classNames(classes.root, className);
    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Usuario</TableCell>
                <TableCell align="left">Fecha de función</TableCell>
                <TableCell align="left">Horario</TableCell>
                <TableCell align="left">Película</TableCell>
                <TableCell align="left">Sala</TableCell>
                <TableCell align="left">Teléfono</TableCell>
                <TableCell align="left">Fecha de reserva</TableCell>
                <TableCell align="left">Precio Total</TableCell>
                <TableCell align="left">Check in</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations
                .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(reservation => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={reservation._id}>
                    <TableCell className={classes.tableCell}>
                      {reservation.username}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {new Date(reservation.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {reservation.startAt}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {this.onFindAttr(reservation.movieId, movies, 'title')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {this.onFindAttr(reservation.cinemaId, cinemas, 'name')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {reservation.phone}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {new Date(reservation.createdDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      $ {reservation.total}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {reservation.checkin ? <CheckIcon style={{ color: "green"}}/> : <ClearIcon style={{ color: "red"}}/>}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={reservations.length}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

export default withStyles(styles)(ReservationsTable);
