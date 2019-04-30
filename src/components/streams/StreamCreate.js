import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions'

//note on semantic UI - className "error" is used for formatting error messages - error in final render (for whole form) enables the additional message; "error" used in the field div (for inputs) formats inputs themselves to highlight red

class StreamCreate extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  //to better understand object, remove destructuring and console log formProps
  renderInput = ({ input, label, meta }) => {
    //console.log(formProps);

    // return <input onChange={formProps.input.onChange} value={formProps.input.value}/>
    // return <input {...formProps.input} />

    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" /> {/* destructured formProps argument */}
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description"/>
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'StreamCreate',
  validate: validate
})(StreamCreate);
