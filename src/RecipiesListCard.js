import React from 'react'
import "./RecipiesListCard.css"
import { useHistory } from 'react-router-dom'

const RecipiesListCard = ({_id, author, postedAt, recipeName, recipeDescription, recipePic}) => {

  const despTruncate = (string, n) => {
        return string?.length > n ? string.substr(0,n-1) + '...' : string
  }
    
  const history = useHistory()

  return (
    <div className='recipeListCard-wrapper'>
      <div className='recipeListCard-left'>
        <div className='recipeListCard-img'>
          <img src={recipePic} alt={recipeName} onClick={()=>history.push(`/singleRecipe/${_id}`)}></img>
        </div>
      </div>
      <div className='recipeListCard-right'>
        <h1 className="recipeName" onClick={()=>history.push(`/singleRecipe/${_id}`)}>{recipeName}</h1>
        <p className="recipeAuthor">By {author} . {new Date(postedAt).toLocaleDateString()}</p>
        <p className='recipeDesc' onClick={()=>history.push(`/singleRecipe/${_id}`)}>{recipeDescription && despTruncate(recipeDescription, 150)}</p>
      </div>
    </div>
  )
}

export default RecipiesListCard