import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Articles from '../components/Articles';
import CustomForm from '../components/Form';


class ArticleList extends React.Component {
  state = { articles: [] };

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      // set headers
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": `Token ${this.props.token}`
      };
      axios.get('http://127.0.0.1:8000/api/').then(res => {
        this.setState({ articles: res.data });
      })
    }
  }

  componentDidMount() {
    if (this.props.token) {
      // set headers
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": `Token ${this.props.token}`
      };
      axios.get('http://127.0.0.1:8000/api/').then(res => {
        this.setState({ articles: res.data });
      })
    }
  }

  render() {
    return (
      <>
        <Articles data={this.state.articles} />
        <h2>Create an article</h2>
        <CustomForm requestMethod="post" btnText="Create" />
      </>
    )
  }
}


const mapStateToProps = state => {
  return {
    token: state.token
  }
};


export default connect(mapStateToProps)(ArticleList);
