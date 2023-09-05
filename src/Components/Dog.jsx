import  { useState, useEffect } from 'react';
import BreedSelector from './BreedSelector';
import DogImage from './DogImage';
import Header from './Header';
import Footer from './Footer';

function Dog() {
  const [imgLinks, setImgLinks] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [error, setError] = useState(null);

  const getBreeds = () => {

    fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          const breedList = Object.keys(data.message);
          setBreeds(breedList);
        } else {
          setError('Select The Breed Of The Dog');
        }
      })
      .catch(() => {
        setError('Failed to fetch breeds');
      });
  };
  const getRandomDog = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((dog) => {
        if (dog.status === 'success') {
          setImgLinks([dog.message]); 
          setError(null);
        } else {
          setError('Select The Breed Of The Dog');
        }
      })
      .catch(() => {
        setError('Failed to fetch image');
      });
  };
  const getDogs = () => {
    if(selectedBreed !==""){
      fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
    .then((response) => response.json())
    .then((dog) => {
      if (dog.status === 'success') {
        setImgLinks((prevLinks) => [dog.message, ...prevLinks]);
        setError(null);
      } else {
        setError('Select The Breed Of The Dog');
      }
    })
    .catch(() => {
      
      setError('Failed to Fetch Image');
    });
    }else{
      getRandomDog()
    }
  };

  useEffect(() => {
    getBreeds();
    getRandomDog();
    console.log('Component mounted');
  }, []);

  return (
    <div className='dog-box'>
    <Header/>      
      <DogImage imgLinks={imgLinks} error={error} />
      <BreedSelector
        breeds={breeds}
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
        getDogs={getDogs}
      />
     <Footer/>
    </div>
  )
}

export default Dog;
