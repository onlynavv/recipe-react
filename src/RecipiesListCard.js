import React from 'react'
import "./RecipiesListCard.css"
import { useHistory } from 'react-router-dom'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useGlobalContext } from './context';

const RecipiesListCard = ({_id, author, postedAt, recipeName, recipeDescription, recipePic, authorId}) => {

  const despTruncate = (string, n) => {
        return string?.length > n ? string.substr(0,n-1) + '...' : string
  }
    
  const history = useHistory()

  const {user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

  console.log(user)

  return (
    <div className='recipeListCard-wrapper'>
      <div className='recipeListCard-left'>
        <div className='recipeListCard-img'>
          <img src={recipePic} alt={recipeName} onClick={()=>history.push(`/singleRecipe/${_id}`)}></img>
        </div>
      </div>
      <div className='recipeListCard-right'>
        <div className='recipe-title-header'>
          <h1 className="recipeName" onClick={()=>history.push(`/singleRecipe/${_id}`)}>{recipeName}</h1>
          {authorId === user._id && (
            <div className='update-actions'>
                <button onClick={()=>history.push(`/editRecipe/${_id}`)}><ModeEditOutlineOutlinedIcon /></button>
                <button><DeleteOutlinedIcon /></button>
            </div>
          )}
        </div>
        <p className="recipeAuthor">By {authorId === user._id ? "You" : author} . {new Date(postedAt).toLocaleDateString()}</p>
        <p className='recipeDesc' onClick={()=>history.push(`/singleRecipe/${_id}`)}>{recipeDescription && despTruncate(recipeDescription, 150)}</p>
      </div>
    </div>
  )
}

export default RecipiesListCard