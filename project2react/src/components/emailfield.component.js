import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validate } from 'isemail';

class EmailField extends React.component {

  /**
		Creates props for handling user input, keydown event, and
    input validation.
		@param {dict} props contains the EmailField state.
	*/

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleInput = this.handleInput.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  /** componentDidMount() records when mounting occurs.*/
  componentDidMount() {
    // console.log('Mounting EmailField');
  }

  /** componentDidUpdate records when update occurs. */
  componentDidUpdate() {
    // console.log('Updating EmailField.');
  }

  /** handleInput triggers on every input event. */
  handleInput(e) {
    // console.log('Handling user input.')
    this.props.dispatch( { type: 'handleUser', user: e.target.value } )
  }

  /** handleKeyDown triggers on every key down event and fires on Enter key. */
  handleKeyDown(e) {
    // console.log('Handle Enter key input.')
    if (e.key === 'Enter') {
      this.submit();
    }
  }

  validateEmail(value) {
    return (if(!validate(value)) throw new Error('Email is invalid.'));
  }

  render() {
      return (
        <EmailField type="email" {...this.props} />;
      )
  }
}

function mapStateToProps(state) {
	const {label, fieldId, placeholder, required, children, onStateChanged} = state;
	return {

    label: PropTypes.string.isRequired,
    fieldId: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    children: PropTypes.node,
    onStateChanged: PropTypes.func
	};
}

function mapDispatchToProps(dispatch) {
  return (

  )
}

export default connect(mapStateToProps)(EmailField);
