import React,{useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useGlobalContext } from './context'
import "./SingleRecipePage.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import OutdoorGrillOutlinedIcon from '@mui/icons-material/OutdoorGrillOutlined';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';

const SingleRecipePage = () => {

    const {id} = useParams()

    const history = useHistory()

    const [recipeDetails, setRecipeDetails] = useState({})

    const [categoryList, setCategoryList] = useState([])

    const {user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

    useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    console.log(user)

    const getRecipeDetails = async() => {
        fetch(`https://recipe-node-app.herokuapp.com/recipe/ingredients/getRecipeDetailsById/${id}`, {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setRecipeDetails(details))
    }

    console.log(recipeDetails && recipeDetails)

    useEffect(()=>{
        getRecipeDetails()
    }, [])

    const getCategoryList = async() => {
        fetch("https://recipe-node-app.herokuapp.com/recipe/ingredients/getRecipeCategory", {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setCategoryList(details))
    }

    console.log(categoryList.length > 0 && categoryList)

    useEffect(()=>{
        getCategoryList()
    }, [])

  return (
    recipeDetails ? (
        <>
            <section className='singleRecipePage-section'>
                <div className='container singleRecipePage-wrapper'>
                    <div className='singleRecipePage-left'>
                        <button onClick={()=>{history.goBack()}} className="goBack-btn"><ArrowBackIosIcon /> Back </button>
                        <div className='singelRecipe-detail-wrapper'>
                            <div className='singleRecipe-header'>
                                <h1>{recipeDetails.recipeName}</h1>
                            </div>
                            <div className='singleRecipe-imageContainer'>
                                <img src={recipeDetails.recipePic}></img>
                            </div>
                            <div className='singleRecipe-content'>
                                <div className='singleRecipe-description'>
                                    <div className='singleRecipe-info'>
                                        <h2>{recipeDetails.recipeName}</h2>
                                        <p>{recipeDetails.recipeCat}</p>
                                        <p>by {recipeDetails.author}</p>
                                    </div>
                                    <div className='singleRecipe-prepTime'>
                                        <p>Total Time: <b>{recipeDetails.totalTime}</b></p>
                                        <p>Servings: <b>{recipeDetails.servings}</b></p>
                                    </div>
                                    <p>{recipeDetails.recipeDescription}</p>
                                </div>
                                <div className='singleRecipe-ingredients'>
                                    <h3>Ingredients:</h3>
                                    <ul>
                                        {recipeDetails && recipeDetails?.ingredientsList?.map((item, index)=>{
                                            return(
                                                <li key={index}>
                                                    <p><CookieOutlinedIcon /> {item.unit} {item.amount} {item.ingredientName}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className='singleRecipe-instructions'>
                                    <h3>Instructions:</h3>
                                    <ul>
                                        {recipeDetails && recipeDetails?.instructionList?.map((item, index)=>{
                                            return(
                                                <li key={index}>
                                                    <p><OutdoorGrillOutlinedIcon /> {item.instruction}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='singleRecipePage-right'>
                        <div className='category-subdiv'>
                            <h3>CATEGORIES</h3>
                            {categoryList.length > 0 && categoryList.map((item)=>{
                                return(
                                    <p key={item._id} onClick={()=>history.push(`/categoryRecipies/${item.recipeCatName}`)} className="category-subdiv-list">{item.recipeCatName}</p>
                                )
                            })}
                        </div>
                    </div>
                </div>
        </section>
    </>
    ) : <p>loadingg</p>
  )
}

export default SingleRecipePage