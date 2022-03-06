import React from 'react'
import "./RecipeHomeCard.css"

const RecipeHomeCard = ({_id, recipeName, recipePic}) => {
  return (
    <div className='recipeCard-container'>
        <div className='recipeImg-container'>
            <img src={recipePic} alt={recipeName}></img>
        </div>
        <div className='recipe-name'>
            <h4>{recipeName}</h4>
        </div>
    </div>
  )
}

export default RecipeHomeCard