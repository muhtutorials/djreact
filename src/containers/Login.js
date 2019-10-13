import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actions from '../store/actions/auth';


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    // this.props.form comes from Form.create
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.username, values.password)
      }
    });
    this.props.history.push('/');
  };

  render() {
    // code from antd
    const { getFieldDecorator } = this.props.form;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    // my code
    let errorMessage;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    return (
      <>
        {errorMessage}
        {
          this.props.isLoading ?
          <Spin indicator={antIcon} /> :
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>Login</Button>
              Or
              <NavLink style={{ marginLeft: '7px' }} to="/signup">
                Signup
              </NavLink>
            </Form.Item>
          </Form>
        }
      </>
    );
  }
}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
};


const mapDispatchToProps = dispatch => {
  return {
    onAuth(username, password) {
      dispatch(actions.authLogin(username, password))
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)