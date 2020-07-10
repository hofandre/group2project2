import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SelectRoleField extends Component {

  constructor(props) {
    super(props);
    this.hasChanged = this.hasChanged.bind(this);
    this.handleRole = this.handleRole.bind(this);
  };

  hasChanged(e) {
    console.log('hasChanged in selectrolefield.component');
    const options = ["voter", "moderator", "admin"];
    if (options.indexOf(e.target.value) <= -1) alert("Invalid role selected.");
    else this.handleRole(e)
  }

  handleRole(e) {
    console.log('handleRole in selectrolefield.component');
    this.props.setRole(e.target.value);
  }

  render() {
    const {...restProps} = this.props;
    return (
    <>
      {/** Pass the stateChanged function and value as props to the form field **/}
      <span>
      <select type="select" id="role" name="role" onChange={this.hasChanged} value={this.props.role} {...restProps}>
        <option value="voter">Voter</option>
        <option value="moderator">Moderator</option>
        <option value="admin">Administrator</option>
      </select>
      { this.props.error }
      </span>
    </>
    )
  }
}

SelectRoleField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
  minStrength: PropTypes.number,
  thresholdLength: PropTypes.number
};

function mapStateToProps(state) {
  const { role } = state;
  return { role: role }
}

function mapDispatchToProps(dispatch) {
  return {
    setRole: (role) => dispatch({ type: 'updateRole', role: role })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectRoleField);
