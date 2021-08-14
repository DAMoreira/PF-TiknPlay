import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  withStyles
} from '@material-ui/core';

import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';

class ShowtimesTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    showtimes: PropTypes.array.isRequired
  };

  static defaultProps = {
    showtimes: [],
    onSelect: () => { },
    onShowDetails: () => { }
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
    const {
      classes,
      className,
      showtimes,
      onSelectShowtime,
      selectedShowtimes,
      selectAllShowtimes,
      movies,
      cinemas
    } = this.props;
    const { rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);
    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                {/*<TableCell align="left">
                  <Checkbox
                    checked={selectedShowtimes.length === showtimes.length}
                    color="primary"
                    indeterminate={
                      selectedShowtimes.length > 0 &&
                      selectedShowtimes.length < showtimes.length
                    }
                    onChange={selectAllShowtimes}
                  />
                  ID
                  </TableCell>*/}
                <TableCell className={classes.titleCell}>
                  <Checkbox
                    checked={selectedShowtimes.length === showtimes.length}
                    color="primary"
                    indeterminate={
                      selectedShowtimes.length > 0 &&
                      selectedShowtimes.length < showtimes.length
                    }
                    onChange={selectAllShowtimes}
                  />
                  Película
                </TableCell>
                <TableCell className={classes.titleCell}>Sala</TableCell>
                <TableCell className={classes.titleCell}>Fecha de inicio</TableCell>
                <TableCell className={classes.titleCell}>Fecha de fin</TableCell>
                <TableCell className={classes.titleCell}>Horario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showtimes
                .filter(showtime => {
                  return showtime;
                })
                .slice(0, rowsPerPage)
                .map(showtime => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={showtime._id}
                    selected={selectedShowtimes.indexOf(showtime._id) !== -1}>
                    {/*<TableCell className={classes.tableCell}>
                      <div className={classes.tableCellInner}>
                        <Checkbox
                          checked={
                            selectedShowtimes.indexOf(showtime._id) !== -1
                          }
                          color="primary"
                          onChange={() => onSelectShowtime(showtime._id)}
                          value="true"
                        />
                        <Typography
                          className={classes.nameText}
                          variant="body1">
                          {showtime._id}
                        </Typography>
                      </div>
                        </TableCell>*/}
                    <TableCell className={classes.tableCell}>
                      <Checkbox
                        checked={
                          selectedShowtimes.indexOf(showtime._id) !== -1
                        }
                        color="primary"
                        onChange={() => onSelectShowtime(showtime._id)}
                        value="true"
                      />
                      <div className={classes.nameText}>

                        {this.onFindAttr(showtime.movieId, movies, 'title').replace(/^[a-z]|[A-Z]/g, function (v, i) {
                          return i === 0 ? v.toUpperCase() : " " + v.toLowerCase()
                        })}
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {this.onFindAttr(showtime.cinemaId, cinemas, 'name')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(showtime.startDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(showtime.endDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {showtime.startAt}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Anterior'
            }}
            component="div"
            count={showtimes.length}
            nextIconButtonProps={{
              'aria-label': 'Siguiente'
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

export default withStyles(styles)(ShowtimesTable);
