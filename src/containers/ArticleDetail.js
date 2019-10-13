import React from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import { connect } from 'react-redux';

import CustomForm from '../components/Form';


class ArticleDetail extends React.Component {
  state = { article: {} };

  handleDelete = event => {
    event.preventDefault();
    if (this.props.token) {
      const articleID = this.props.match.params.articleID;
      // set headers
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": `Token ${this.props.token}`
      };
      axios.delete(`http://127.0.0.1:8000/api/${articleID}/`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      this.props.history.push('/')
    } else {
      // show a message
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      const articleID = this.props.match.params.articleID;
      // set headers
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": `Token ${this.props.token}`
      };
      axios.get(`http://127.0.0.1:8000/api/${articleID}`).then(res => {
        this.setState({article: res.data});
      })
    }
  }

  componentDidMount() {
    if (this.props.token) {
      const articleID = this.props.match.params.articleID;
      // set headers
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": `Token ${this.props.token}`
      };
      axios.get(`http://127.0.0.1:8000/api/${articleID}`).then(res => {
        this.setState({article: res.data});
      })
    }
  }

  render() {
    const { title, content } = this.state.article;
    return (
      <>
        <Card title={title}>
          <p>{content}</p>
        </Card>
        <CustomForm
          requestMethod="put"
          articleID={this.props.match.params.articleID}
          btnText="Update"
        />
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">Delete</Button>
        </form>
      </>
    )
  }
}


const mapStateToProps = state => {
  return {
    token: state.token
  }
};


export default connect(mapStateToProps)(ArticleDetail);
