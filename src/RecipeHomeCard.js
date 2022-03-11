import React from 'react'
import { useHistory } from 'react-router-dom'
import "./RecipeHomeCard.css"
import StarIcon from '@mui/icons-material/Star';

const RecipeHomeCard = ({_id, recipeName, recipePic, reviews}) => {

  const history = useHistory()

  const ratingValue = reviews?.reduce((curr, acc)=>{
    return curr = curr + parseFloat(acc.rating)
  },0)

    const totalRating = ratingValue && (ratingValue / reviews?.length)

  return (
    <div className='recipeCard-container'>
        <div className='recipeImg-container'>
            <img src={recipePic} alt={recipeName} onClick={()=>history.push(`/singleRecipe/${_id}`)}></img>
            {reviews?.length > 0 && (
              <div className='totalRating-homediv'>
                <p>{totalRating && totalRating} / 5</p>
                <StarIcon />
              </div>
            )}
        </div>
        <div className='recipe-name'>
            <h4 onClick={()=>history.push(`/singleRecipe/${_id}`)}>{recipeName}</h4>
        </div>
    </div>
  )
}

export default RecipeHomeCard