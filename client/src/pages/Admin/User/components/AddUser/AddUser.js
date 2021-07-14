import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import styles from './styles';
import { addShowtime, updateShowtime } from '../../../../../store/actions';

class AddUser extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    phone: ''
  };

  componentDidMount() {
    if (this.props.selectedUser) {
      const {
        name,
        username,
        email,
        password,
        role,
        phone
      } = this.props.selectedUser;
      this.setState({
        name,
        username,
        email,
        password,
        role,
        phone
      });
    }
  }

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onAddUser = () => {
    const user = { ...this.state };
    this.props.addUser(user);
  };

  onUpdateUser = () => {
    const user = { ...this.state };
    this.props.updateUser(user, this.props.selectedUser._id);
  };

  render() {
    const { classes, className, selectedUser } = this.props;
    const { name, username, email, password, role, phone } = this.state;

    const rootClassName = classNames(classes.root, className);
    const title = selectedUser ? 'Modificar usuario' : 'Agregar usuario';
    const submitButton = selectedUser ? 'Guardar cambios' : 'Guardar cambios';
    const submitAction = selectedUser
      ? () => this.onUpdateUser()
      : () => this.onAddUser();
    function convertir(role) {
      if (role === "admin") return "Administrador"
      else return "Invitado"
    }

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              fullWidth
              className={classes.textField}
              helperText="Especificar el nombre completo"
              label="Nombre completo"
              margin="dense"
              required
              value={name}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('name', event.target.value)
              }
            />
            <TextField
              fullWidth
              className={classes.textField}
              label="Nombre de usuario"
              margin="dense"
              required
              value={username}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('username', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              className={classes.textField}
              label="Correo electrónico"
              margin="dense"
              required
              value={email}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('email', event.target.value)
              }
            />
            <TextField
              fullWidth
              className={classes.textField}
              label="Contraseña"
              margin="dense"
              required
              value={password}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('password', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              className={classes.textField}
              label="Telefono"
              margin="dense"
              required
              value={phone}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('phone', event.target.value)
              }
            />
            <TextField
              fullWidth
              select
              className={classes.textField}
              helperText="Administrador o Cliente"
              label="Rol"
              margin="dense"
              required
              value={role}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('role', event.target.value)
              }>
              {['admin', 'guest'].map(role => (
                <MenuItem key={`role-${role}`} value={role}>
                  {convertir(role)}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}>
          {submitButton}
        </Button>
      </div>
    );
  }
}

AddUser.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ movieState, cinemaState }) => ({
  movies: movieState.movies,
  nowShowing: movieState.nowShowing,
  cinemas: cinemaState.cinemas
});

const mapDispatchToProps = { addShowtime, updateShowtime };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddUser));
