import React, { Component } from 'react';

class Carousel extends Component {
  constructor() {
    super();
    this.state = { active: 0 };
  }
  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
  };
  handleClickIndex = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };
  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className='carousel'>
        <img src={images[active]} alt='animal' />
        <div className='carousel-smaller'>
          {images.map((photo, index) => (
            <img
              src={photo}
              key={photo}
              className={index === active ? 'active' : ''}
              alt='animal'
              data-index={index}
              onClick={this.handleClickIndex}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
