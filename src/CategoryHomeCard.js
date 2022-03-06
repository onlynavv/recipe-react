import React from 'react'
import { useHistory } from 'react-router-dom'
import "./CategoryHomeCard.css"


const CategoryHomeCard = ({_id, recipeCatName}) => {

  const history = useHistory()

  return (
    <div className='catCard-container'>
        <div className='catImg-container'>
            <img onClick={()=>history.push(`/categoryRecipies/${recipeCatName}`)} src="https://cdn-icons-png.flaticon.com/512/857/857718.png" alt="catImg"></img>
        </div>
        <div className='cat-name'>
            <h4 onClick={()=>history.push(`/categoryRecipies/${recipeCatName}`)}>{recipeCatName}</h4>
        </div>
    </div>
  )
}

export default CategoryHomeCard