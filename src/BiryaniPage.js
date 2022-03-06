import React,{useState, useEffect} from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useHistory } from 'react-router-dom'
import RecipiesListCard from './RecipiesListCard';
import "./RecipiesList.css"
import { useGlobalContext } from './context';

const BiryaniPage = () => {

    const history = useHistory()

    const [recipiesList, setRecipiesList] = useState([])

    const [categoryList, setCategoryList] = useState([])

    const {user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

    useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    console.log(user)

    const getRecipiesList = async() => {
        fetch("https://recipe-node-app.herokuapp.com/recipe/ingredients/getBiryaniCatRecipies", {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setRecipiesList(details))
    }

    console.log(recipiesList.length > 0 && recipiesList, "35")

    useEffect(()=>{
        getRecipiesList()
    }, [user])

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
    <section className='recipiesList-section'>
        <div className='container recipiesList-wrapper'>
            <div className='recipiesList-left'>
                <button onClick={()=>{history.goBack()}} className="goBack-btn"><ArrowBackIosIcon /> Back </button>
                <div className='recipiesList-header'>
                    <h2>Recipies</h2>
                </div>
                <div className='recipeList-cards-wrapper'>
                    {recipiesList.length > 0 && recipiesList.map((item)=>{
                        return <RecipiesListCard key={item._id} {...item} />
                    })}
                </div>
            </div>
            <div className='recipiesList-right'>
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
  )
}

export default BiryaniPage