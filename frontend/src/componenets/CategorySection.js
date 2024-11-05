import React from 'react'
import CategoryCard from '../Utils/CategoryCard'


const categoriesData=[
    {
      "category": "Furniture",
      "imageUrl": "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e570738029a725e686_Furniture-min.png"
    },
    {
      "category": "Books",
      "imageUrl": "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e460afc22b7ea53520_books-min.png"
    },
    {
      "category": "Tech",
      "imageUrl": "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e754ac2e32897cb53b_tech-min.png"
    },
    {
      "category": "Hand Bag",
      "imageUrl": "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e52d6553668075697e_hand%20bag-min.png"
    },
    {
      "category": "Sneakers",
      "imageUrl": "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e64b769118272f244f_sneakers-min.png"
    },
    {
      "category": "Travel",
      "imageUrl": "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e71eb4ad6d07e7568f_travel-min.png"
    },
   
  ]
  

const CategorySection = () => {
 
  return (
    <div className='m-4'>
     <h1 className='text-2xl font-bold m-4 px-10 py-4 '>Shop Our Categories</h1>
    <div className='flex gap-6 justify-center'>
      {categoriesData.map((category,index)=>(  
          <CategoryCard key={index} Category={category} />
          ))}
      
    </div>
    </div>
  )
}

export default CategorySection
