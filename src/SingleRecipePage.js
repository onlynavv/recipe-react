import React,{useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useGlobalContext } from './context'
import "./SingleRecipePage.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import OutdoorGrillOutlinedIcon from '@mui/icons-material/OutdoorGrillOutlined';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSnackbar } from 'notistack';
import StarIcon from '@mui/icons-material/Star';
import Skeleton from '@mui/material/Skeleton';

const SingleRecipePage = () => {

    const {id} = useParams()

    const history = useHistory()

    const { enqueueSnackbar } = useSnackbar();

    const [recipeDetails, setRecipeDetails] = useState({})

    const [categoryList, setCategoryList] = useState([])

    const[favorite, setFavorite] = useState(false)

    const [review, setReview] = useState({recipeComment:"", rating:""})

    const {user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

    useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    console.log(user)

    const handleSuccessVariant = (variant) => () => {
        console.log("favourite added")
        enqueueSnackbar('Favourite  Added!', { variant });
    };

    const getRecipeDetails = async() => {
        fetch(`https://recipe-node-app.herokuapp.com/recipe/ingredients/getRecipeDetailsById/${id}`, {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setRecipeDetails(details))
    }

    console.log(recipeDetails && recipeDetails)

    console.log(recipeDetails && recipeDetails.reviews)

    const ratingValue = recipeDetails && recipeDetails?.reviews?.reduce((curr, acc)=>{
        return curr = curr + parseFloat(acc.rating)
    },0)

    const totalRating = ratingValue && (ratingValue / recipeDetails?.reviews?.length)

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

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        console.log(name,typeof value)
        setReview({...review, [name]:value})
    }

    const handleAddFavourites = async() => {
        try{
            const resp = await fetch(`http://localhost:9000/recipe/ingredients/addToFavourites/${id}`, {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":user.token}
                })
            if(resp.ok){
                handleSuccessVariant("success")
                setFavorite(!favorite)
            }
        }catch(error){
            console.warn(error.toString())
        }
    }

    const handleRemoveFavourites = async() => {
        try{
            const resp = await fetch(`http://localhost:9000/recipe/ingredients/removeFavourites/${id}`, {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":user.token}
                })
            if(resp.ok){
                setFavorite(!favorite)
            }
        }catch(error){
            console.warn(error.toString())
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log({...review, userName: user.username, userId: user._id})
        try{
            const resp = await fetch(`http://localhost:9000/recipe/ingredients/submitReview/${id}`, {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":user.token},
            body: JSON.stringify({...review, userName: user.username, userId: user._id})
                })
            if(resp.ok){
                getRecipeDetails()
                setReview({recipeComment:"", rating:""})
            }
        }catch(error){
            console.warn(error.toString())
        }
    }

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
                                {recipeDetails?.reviews?.length > 0 && (
                                    <div className='totalRating-div'>
                                        <p>{totalRating && totalRating} / 5 ratings</p>
                                        <StarIcon />
                                    </div>
                                )}
                            </div>
                            <div className='singleRecipe-content'>
                                <div className='singleRecipe-description'>
                                    <div className='singleRecipe-info'>
                                        <h2>{recipeDetails.recipeName}</h2>
                                        <p>{recipeDetails.recipeCat}</p>
                                        {/* <p>by {recipeDetails.author}</p> */}
                                    </div>
                                    <div className='singleRecipe-prepTime'>
                                        <h3>Total Time: <b>{recipeDetails.totalTime}</b></h3>
                                        <h3>Servings: <b>{recipeDetails.servings}</b></h3>
                                            {favorite ? (
                                                <CardActions disableSpacing className='addFavourite'>
                                                    <IconButton aria-label="add to favorites" color='error' onClick={()=>handleRemoveFavourites()}>
                                                    <FavoriteIcon/>
                                                    </IconButton>
                                                </CardActions>
                                            ) : (
                                                <CardActions disableSpacing className='removeFavourite'>
                                                    <IconButton aria-label="removeFavorites" color='error' onClick={()=>handleAddFavourites()}>
                                                    <FavoriteBorderOutlinedIcon />
                                                    </IconButton>
                                                </CardActions>
                                            )}
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
                                                    <h3 style={{marginBottom:"15px"}}>Step {index + 1}:</h3>
                                                    <p><OutdoorGrillOutlinedIcon /> {item.instruction}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className='author-div'>
                                    <h3>Author</h3>
                                    <div className='author-content'>
                                        <h3>{recipeDetails.author}</h3>
                                        <button className='view-profile' onClick={()=>{history.push(`/userRecipies/${recipeDetails.authorId}`)}}>View Profile</button>
                                    </div>
                                </div>
                                <div className='reviews-div'>
                                    <div className='reviews-display'>
                                        <h3>Reviews</h3>
                                        <>
                                            {recipeDetails?.reviews?.length > 0 && recipeDetails.reviews.map((item, index)=>{
                                                const postedDate = new Date(item.postedAt)
                                                return(
                                                    <div className='user-review' key={item.reviewId}>
                                                        <div className='user-review-info'>
                                                            <p><b className='reviewer-name'>{item.userName}</b> says:</p>
                                                            <p className='review-date-info'>{postedDate.toDateString()} {postedDate.toLocaleTimeString()}</p>
                                                        </div>
                                                        <p>{item.recipeComment}</p>
                                                        <div className="rating">
                                                            <Stack spacing={1}>
                                                                <Rating name="half-rating-read" value={item.rating} precision={0.5} readOnly />
                                                            </Stack>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    </div>
                                    <div className='reviews-form-wrapper'>
                                        <form>
                                            <h3>Leave a Reply</h3>
                                            <div className='form-control'>
                                                <TextareaAutosize
                                                    aria-label="empty textarea"
                                                    placeholder="Enter Comments"
                                                    className="userInput textareaInput"
                                                    minRows={5}
                                                    id="recipeComment" name="recipeComment" value={review.recipeComment} onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-control">
                                                <Stack spacing={1}>
                                                <Rating
                                                    name="rating"
                                                    value={review.rating}
                                                    onChange={handleChange} precision={0.5}
                                                />
                                                </Stack>
                                            </div>
                                            <Button className="submitBtn" variant="contained" size="medium" onClick={(e)=>handleSubmit(e)} type="submit">Submit</Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='singleRecipePage-right'>
                        <div className='category-subdiv'>
                            <h2>CATEGORIES</h2>
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
    ) : (
        <section className='singleRecipePage-section'>
                <div className='container singleRecipePage-wrapper'>
                    <div className='singleRecipePage-left'>
                        <Skeleton variant="rectangular" width={210} height={118} />
                        <Skeleton width="60%" />
                        <Skeleton width="60%" />
                    </div>
                </div>
        </section>
    )
  )
}

export default SingleRecipePage