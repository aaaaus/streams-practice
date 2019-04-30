import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

//note on semantic UI - className "error" is used for formatting error messages - error in final render (for whole form) enables the additional message; "error" used in the field div (for inputs) formats inputs themselves to highlight red

class StreamCreate extends React.Component {

  //helper function for renderInput, evaluates meta object and conditionally returns error message
  renderError({ error, touched }) {
    if (touched && error) { //if touched is true and meta.error is present, do the following
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  //when Field tag calls renderInput, it will pass in some number of arguments (we'll call it the FormProps object). To better understand, remove destructuring and console log formProps (for reference, here it contains input (object), meta (object), and label (string))
  renderInput = ({ input, label, meta }) => {
    //console.log(formProps);

    // return <input onChange={formProps.input.onChange} value={formProps.input.value}/>
    // return <input {...formProps.input} />

    console.log(meta);

    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" /> {/* destructured formProps argument, takes all k/v pairs of input and adds them as properties to the input element. Through redux-form, the form is now controlled */}
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.createStream(formValues)
  }

  //the component property below (in Field) is necessary to render content. It can reference a component or a function.
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

//creates errors object that is passed into reduxForm
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors; //if fields are empty they will return k/v pairs, else empty string is returned
};

const formWrapped = reduxForm({
  form: 'StreamCreate', //this names the key found within form object in state
  validate: validate //references the function here named validate, info passed into meta object
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
