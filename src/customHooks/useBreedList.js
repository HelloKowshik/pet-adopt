import { useEffect, useState } from 'react';

const localCache = {};
export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState('unloaded');
  const requestBreed = async () => {
    setBreedList([]);
    setStatus('loading');
    const req = await fetch(
      `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );
    const data = await req.json();
    localCache[animal] = data.breeds || [];
    setBreedList(localCache[animal]);
  };
  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreed();
    }
  }, [animal]); //eslint-disable-line react-hooks/exhaustive-deps
  return [breedList, status];
}
