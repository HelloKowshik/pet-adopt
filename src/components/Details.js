import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from './Carousel';
import ErrorBoundery from './ErrorBoundery';
import Modals from './Modals';
import ThemeContext from './ThemeContext';

class Details extends Component {
  constructor() {
    super();
    this.state = { loading: true, showModal: false };
    this.toggleModal = this.toggleModal.bind(this);
    this.adopt = this.adopt.bind(this);
  }
  async componentDidMount() {
    const req = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const res = await req.json();
    this.setState(Object.assign({ loading: false }, res.pets[0]));
  }
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  adopt = () => (window.location = 'http://bit.ly/pet-adopt');

  render() {
    const { name, animal, breed, state, city, description, images } =
      this.state;
    return (
      <div className='details'>
        <Carousel images={images} />
        <h1>{name}</h1>
        <h3>{`${animal}-${breed}-${city},${state}`}</h3>
        <p>{description}</p>
        <ThemeContext.Consumer>
          {([theme]) => (
            <button
              style={{ backgroundColor: theme }}
              onClick={this.toggleModal}
            >
              Adopt {name}
            </button>
          )}
        </ThemeContext.Consumer>
        {this.state.showModal ? (
          <Modals>
            <h2>Would You like to adopt {name} ?</h2>
            <div className='buttons'>
              <button onClick={this.adopt}>YES</button>
              <button onClick={this.toggleModal}>NO</button>
            </div>
          </Modals>
        ) : null}
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundery>
      <DetailsWithRouter {...props} />
    </ErrorBoundery>
  );
}
