import React, { useContext, useEffect, useState } from 'react';
import useBreedList from '../customHooks/useBreedList';
import Results from './Results';
import ThemeContext from './ThemeContext';
const ANIMALS = ['cat', 'dog', 'bird', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const [BREEDS] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);
  const handleChange = (e) => {
    setLocation(e.target.value);
  };
  const requestPets = async () => {
    const req = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const data = await req.json();
    setPets(data.pets);
  };

  useEffect(() => {
    requestPets();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='search-params'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor='location'>
          Location
          <input
            type='text'
            id='location'
            value={location}
            placeholder='Location'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='animal'>
          Animal
          <select
            id='animal'
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal, i) => (
              <option value={animal} key={i}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor='breed'>
          Breed
          <select
            id='breed'
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option />
            {BREEDS.map((breed, i) => (
              <option value={breed} key={i}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor='theme'>
          Theme
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value='darkblue'>Dark Blue</option>
            <option value='mediumorchid'>Medium Orchid</option>
            <option value='chartreuse'>Chartreuse</option>
            <option value='peru'>Peru</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
