import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class ErrorBoundery extends Component {
  constructor() {
    super();
    this.state = { hasError: false, redirect: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('Error:', error, info);
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 2000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    } else if (this.state.hasError) {
      return (
        <h2>
          There is an Error. <Link to='/'>Click Here</Link> to go to Home Page.
          Or wait for a moment...
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundery;
