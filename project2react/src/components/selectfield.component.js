import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectField extends Component {

  constructor(props) {
    super(props);
    this.hasChanged = this.hasChanged.bind(this);
  };

  hasChanged(e) {
    var error = "";
    console.log('hasChanged in selectfield.component');
    const options = ["voter", "moderator", "admin"];
    if (options.indexOf(e.target.value) > -1) error = "<p>Invalid role selected.</p>";
    else this.setRole(e.target.value);
    return error;
  }

  render() {
    const {...restProps} = this.props;
    return (
    <>
      {/** Pass the stateChanged function and value as props to the form field **/}
      <select type="select" onChange={ this.hasChanged } {...restProps}>
        <option value="voter">Voter</option>
        <option value="moderator">Moderator</option>
        <option value="admin">Administrator</option>
      </select>
    </>
    )
  }
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldid: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
  minStrength: PropTypes.number,
  thresholdLength: PropTypes.number
};


export default SelectField;
