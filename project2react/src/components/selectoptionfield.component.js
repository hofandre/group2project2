import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SelectOptionField extends Component {

  constructor(props) {
    super(props);
    this.hasChanged = this.hasChanged.bind(this);
    this.handleOption = this.handleOption.bind(this);
  };

  hasChanged(e) {
    const options = ["1", "2"];
    console.log('hasChanged in selectoptionfield.component');
    if (options.indexOf(e.target.value) <= -1) alert("Invalid correct image option selected.");
    else this.handleOption(e);
  }

  handleOption(e) {
    console.log('handleOption in selectoptionfield.component');
    this.props.setCorrectOption(e.target.value);
  }

  render() {
    return (
    <>
      {/** Pass the stateChanged function and value as props to the form field **/}
      <select onChange={ this.hasChanged } value={ this.correct_option } >
        <option disabled defaultValue>Correct Image</option>
        <option value="1">Image 1</option>
        <option value="2">Image 2</option>
      </select>
    </>
    )
  }
}

SelectOptionField.propTypes = {
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
  const { correct_option } = state;
  return { correct_option: correct_option }
}

function mapDispatchToProps(dispatch) {
  return {
    setCorrectOption: (correct_option) => dispatch({ type: 'updateCorrectOption', correct_option: correct_option })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectOptionField);
