
import React from 'react';
import Dogpic from "../Assets/dog.jpg";
function DogImage({ imgLinks, error }) {
  return (
    <div className='doggy'>
      {error ? (
        <div>
          <img src={Dogpic} alt='doggy' />
          <p>{error}</p>
        </div>
      ) : (
        imgLinks.length > 0 && <img src={imgLinks[0]} alt='doggy' />
      )}
    </div>
  );
}

export default DogImage;
