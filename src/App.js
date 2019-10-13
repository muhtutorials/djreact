import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomLayout from './containers/Layout';
import BaseRouter from './Routes';
import * as actions from './store/actions/auth';


class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </BrowserRouter>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
};


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp() {
      dispatch(actions.authCheckState())
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
