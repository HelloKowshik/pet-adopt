import React from 'react';
import { Link } from 'react-router-dom';

const Pet = (props) => {
  const { id, name, animal, breed, images, state, city } = props.pet;
  let hero = 'http://pets-images.dev-apis.com/pets/none.jpg';
  if (images.length) {
    hero = images[0];
  }
  return (
    <Link to={`/details/${id}`} className='pet'>
      <div className='image-container'>
        <img src={hero} alt={name} />
      </div>
      <div className='info'>
        <h1>{name}</h1>
        <h3>{`${animal}-${breed}-${city},${state}`}</h3>
      </div>
    </Link>
  );
};

export default Pet;
