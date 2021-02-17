import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormGroup } from 'react-bootstrap';
import { startLogin } from '../reducer/product';

class Index extends PureComponent {
 submitEmailForm = (values) => {
  const { startLogin } = this.props;
  startLogin(values);
 };
 render() {
  const { handleSubmit } = this.props;
  return (
   <div className="container-fluid mt-5 col-md-4">
    <div>
     <h3>Sign in to Mccoymart</h3>
    </div>
    <div>
     <form onSubmit={handleSubmit(this.submitEmailForm)}>
      <FormGroup name="formGroup" className="mb-3">
       <div>
        <label>Mobile/Username</label>
        <Field
         name="username"
         className="form-control form-control-lg"
         component="input"
         type="text"
         placeholder="enter username"
         size="lg"
         required
        />
       </div>
       <div>
        <label>Password</label>
        <Field
         name="password"
         className="form-control form-control-lg"
         component="input"
         type="password"
         placeholder="enter password"
         size="lg"
         required
        />
       </div>
      </FormGroup>
      <div className="mb-3">
       <button type="submit" class="btn btn-primary">
        Login
       </button>
      </div>
     </form>
    </div>
   </div>
  );
 }
}

const mapDispatchToProps = (dispatch) => {
 return {
  startLogin: (payload) => dispatch(startLogin(payload)),
 };
};

export default reduxForm({
 form: 'loginForm',
})(connect(null, mapDispatchToProps)(Index));
