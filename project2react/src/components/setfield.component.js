import React, { Component } from 'react';
import FormField from './formfield.component'
import SelectOptionField from './selectoptionfield.component'

class SetField extends Component {
  render() {
    const {...restProps} = this.props;
    return (
      <div className="form-container d-table-cell position-relative align-middle">
          <div className="py-5 border-gray border-top border-bottom">
            {/** Render the upload set title field component. */}
            <FormField type="text" fieldId="title" label="Set Title:" placeholder="Set Title" {...restProps} required />

            {/** Render the upload file_one field component. **/}
            <FormField type="file" fieldId="file_one" label="Image 1:" placeholder="Select a File" {...restProps} required />

            {/** Render the alt text field component. */}
            <FormField type="text" fieldId="alt_text_one" label="Alternative Text Image 1:" placeholder="Alt Text" {...restProps} required />

            {/** Render the upload file_two field component. **/}
            <FormField type="file" fieldId="file_two" label="Image 2:" placeholder="Select a File" {...restProps} required />

            {/** Render the alt text field component. */}
            <FormField type="text" fieldId="alt_text_two" label="Alternative Text Image 2:" placeholder="Alt Text" {...restProps} required />

            {/** Render the correct image option component. */}
            <label htmlFor="correct_option" className="control-label">Correct Image: <SelectOptionField type="select" id="correct_option" name="correct_option" label="Correct Image:" className="correct_option" placeholder="Select correct image." required /></label>

            {/** Render the keywords field component. */}
            <FormField type="text" fieldId="keywords" label="Keywords: " placeholder="Keyword1 Keyword2 etc." {...restProps} required />
          </div>
      </div>
    )
  }
}

export default SetField;
