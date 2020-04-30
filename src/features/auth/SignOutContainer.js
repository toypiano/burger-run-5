import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../app/ducks/auth';

function SignOut({ logout }) {
  useEffect(() => {
    logout();
  }, [logout]);
  return <Redirect to="/" />;
}

export default connect(null, actionCreators)(SignOut);
