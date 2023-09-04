import  { useState, useEffect } from 'react';
import Dogpic from "./Assets/dog.jpg";

function Dog() {
  const [imgLinks, setImgLinks] = useState([]);
  const [error, setError] = useState(null);

  const getDogs = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((dog) => {
        if (dog.status === 'success') {
          setImgLinks((prevLinks) => [dog.message, ...prevLinks]);
          setError(null); 
        } else {
          setError('Failed to fetch image');
        }
      })
      .catch(() => {
        setError('Failed to fetch image');
      });
  };

  useEffect(() => {
    getDogs();
    console.log('Component mounted');
  }, []);

  return (
    <div className='dog-box'>
      <div className='doggy'>
      <h2>Random <span>Dog</span> Images</h2>
        {error ? (
          <div>
          <img src={Dogpic} alt='doggy'/>
          <p>{error}</p>
          </div>
        ) : (
          imgLinks.length > 0 && <img src={imgLinks[0]} alt='doggy' />
        )}
      </div>
      <div className='btns'>
        <button className='btn' onClick={getDogs}>
        Generate Dogs 
        </button>
      </div>
      <footer>
        <a href='https://github.com/SPRHackz' title='Github'>&copy; 2023 SPR Hackz </a>
      </footer>
    </div>
  );
}

export default Dog;

