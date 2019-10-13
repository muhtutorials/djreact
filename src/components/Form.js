import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';


class CustomForm extends React.Component {
  handleSubmit = (event, requestMethod, articleID) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    // set headers
    axios.defaults.headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${this.props.token}`
    };
    switch (requestMethod) {
      case 'post':
        axios.post('http://127.0.0.1:8000/api/', { title, content })
          .then(res => console.log(res))
          .catch(err => console.log(err));
        break;
      case 'put':
          axios.put(`http://127.0.0.1:8000/api/${articleID}/`, { title, content })
          .then(res => console.log(res))
          .catch(err => console.log(err));
          break;
      default:
        return undefined;
    }
  };

  render() {
    const { requestMethod, articleID, btnText } = this.props;
    return (
      <div>
        <Form onSubmit={event => this.handleSubmit(event, requestMethod, articleID)}>
          <Form.Item label="Title">
            <Input placeholder="Put a title here" name="title" />
          </Form.Item>
          <Form.Item label="Content">
            <Input placeholder="Put content here" name="content" />
          </Form.Item>
          <Form.Item>
            {/* htmlType="submit" should be added so the form can be submitted */}
            <Button type="primary" htmlType="submit">{btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    token: state.token
  }
};


export default connect(mapStateToProps)(CustomForm)