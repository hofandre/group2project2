import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FormField from './formfield.component.js';

class FileField extends Component {

  render() {
    const {...restProps} = this.props;
    return (
      <Fragment>
        <div className="position-relative">
          {/** Pass the stateChanged function and value as props to the form field **/}
          <FormField type="file" {...restProps} />
        </div>
      </Fragment>
    )
  }
}

FileField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
  minStrength: PropTypes.number,
  thresholdLength: PropTypes.number
};

export default FileField;
