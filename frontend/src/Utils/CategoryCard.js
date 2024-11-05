import React from 'react';

const CategoryCard = ({Category}) => {
    const {category,imageUrl}=Category;
  return (
    <div className='relative w-[190px] h-[250px] rounded-xl cursor-pointer'>
      <h1 className='absolute top-2 left-1/2 transform -translate-x-1/2  text-white font-bold text-xl z-10'>
        {category}
      </h1>
      <img
        src={imageUrl}
        alt="Category"
        className='w-full h-full object-cover hover:scale-110 transition-all ease-in-out rounded-xl'
      />
    </div>
  );
};

export default CategoryCard;
