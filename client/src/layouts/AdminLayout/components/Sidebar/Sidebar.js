import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  withStyles,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import AccountBoxIcon from '@material-ui/icons/AccountBoxOutlined';
import LocalPlayIcon from '@material-ui/icons/LocalPlay';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
// Component styles
import styles from './styles';

class Sidebar extends Component {
  render() {
    const { classes, user } = this.props;
    return (
      <section className={classes.root}>
        <List component="div" disablePadding>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/dashboard">
            <ListItemIcon className={classes.listItemIcon}>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Estadísticas"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/movies">
            <ListItemIcon className={classes.listItemIcon}>
              <LocalMoviesIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Películas"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/cinemas">
            <ListItemIcon className={classes.listItemIcon}>
              <EventSeatIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Salas"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/showtimes">
            <ListItemIcon className={classes.listItemIcon}>
              <LocalPlayIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Funciones"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/reservations">
            <ListItemIcon className={classes.listItemIcon}>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Reservas"
            />
          </ListItem>
          {user && user.role === 'superadmin' && (
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/users">
              <ListItemIcon className={classes.listItemIcon}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Usuarios"
              />
            </ListItem>
          )}
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/account">
            <ListItemIcon className={classes.listItemIcon}>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Mi Cuenta"
            />
          </ListItem>
        </List>
        <Divider className={classes.listDivider} />
        <List
          component="div"
          disablePadding
          subheader={
            <ListSubheader className={classes.listSubheader}>
              Ayuda
            </ListSubheader>
          }>
          <ListItem
            className={classes.listItem}
            component="a"
            href="https://github.com/DAMoreira/PF-TiknPlay"
            target="_blank">
            <ListItemIcon className={classes.listItemIcon}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Soporte"
            />
          </ListItem>
        </List>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authState.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Sidebar));
