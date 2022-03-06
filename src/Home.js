import React, { useState, useEffect } from 'react'
import CategoryHomeCard from './CategoryHomeCard'
import { useGlobalContext } from './context'
import RecipeHomeCard from './RecipeHomeCard'
import { useHistory } from 'react-router-dom'
import "./Home.css"

const Home = () => {

  const {user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

  const history = useHistory()

  useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    console.log(user)

    // -------------------------------------------------------------------------------------

    const [limitedRecipies, setLimitedRecipies] = useState([])

    const getLimitedRecipies = async() => {
        fetch("https://recipe-node-app.herokuapp.com/recipe/ingredients/getLimitedRecipies", {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setLimitedRecipies(details))
    }

    console.log(limitedRecipies)

    // -------------------------------------------------------------------------------------

    const [limitedUserRecipies, setLimitedUserRecipies] = useState([])

    const getLimitedUserRecipies = async() => {
        fetch("https://recipe-node-app.herokuapp.com/recipe/ingredients/getUserCreatedLimitedRecipies", {
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":user.token}
                })
        .then((data)=> data.json())
        .then((details)=> setLimitedUserRecipies(details))
    }

    console.log(limitedUserRecipies, "47")

    // -------------------------------------------------------------------------------------

    const [limitedBiryaniRecipies, setLimitedBiryaniRecipies] = useState([])

    const getLimitedBiryaniRecipies = async() => {
        fetch("https://recipe-node-app.herokuapp.com/recipe/ingredients/getLimitedBiryaniCatRecipies", {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setLimitedBiryaniRecipies(details))
    }

    console.log(limitedBiryaniRecipies)

    // -------------------------------------------------------------------------------------

    const [limitedCakeRecipies, setLimitedCakeRecipies] = useState([])

    const getLimitedCakeRecipies = async() => {
        fetch("https://recipe-node-app.herokuapp.com/recipe/ingredients/getLimitedCakeCatRecipies", {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setLimitedCakeRecipies(details))
    }

    console.log(limitedCakeRecipies)

    // -------------------------------------------------------------------------------------

    const [limitedHealthyRecipies, setLimitedHealthyRecipies] = useState([])

    const getLimitedHealthyRecipies = async() => {
        fetch("https://recipe-node-app.herokuapp.com/recipe/ingredients/getLimitedHealthyCatRecipies", {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setLimitedHealthyRecipies(details))
    }

    console.log(limitedHealthyRecipies)

    // -------------------------------------------------------------------------------------

    const [limitedUnder30Recipies, setLimitedUnder30Recipies] = useState([])

    const getLimitedUnder30Recipies = async() => {
        fetch("https://recipe-node-app.herokuapp.com/recipe/ingredients/getLimitedRecipiesUnder30M", {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setLimitedUnder30Recipies(details))
    }

    console.log(limitedUnder30Recipies)

    // -------------------------------------------------------------------------------------

    const [limitedUnder10Recipies, setLimitedUnder10Recipies] = useState([])

    const getLimitedUnder10Recipies = async() => {
        fetch("https://recipe-node-app.herokuapp.com/recipe/ingredients/getLimitedRecipiesUnder10M", {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setLimitedUnder10Recipies(details))
    }

    console.log(limitedUnder10Recipies)

    // -------------------------------------------------------------------------------------

    const [limitedRecipeCat, setLimitedRecipeCat] = useState([])

    const getLimitedRecipeCat = async() => {
        fetch("https://recipe-node-app.herokuapp.com/recipe/ingredients/getLimitedRecipeCategory", {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setLimitedRecipeCat(details))
    }

    console.log(limitedRecipeCat)

    // -------------------------------------------------------------------------------------

    useEffect(()=>{
        getLimitedRecipies()
        getLimitedUserRecipies()
        getLimitedBiryaniRecipies()
        getLimitedCakeRecipies()
        getLimitedHealthyRecipies()
        getLimitedUnder30Recipies()
        getLimitedUnder10Recipies()
        getLimitedRecipeCat()
    }, [user])

  return (
    <section className='home-mainSection'>
      <section className='category-section'>
        <div className='container sections-wrapper'>
          <div className='category-header'>
            <h3>Category Recipies</h3>
            <button className="view-more">view more</button>
          </div>
          <div className='category-contents'>
            {limitedRecipeCat.length > 0 && limitedRecipeCat.map((item)=>{
              return <CategoryHomeCard key={item._id} {...item} />
            })}
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------- */}
      <section className='getIdeas-section'>
        <div className='container sections-wrapper'>
          <div className='getIdeas-header'>
            <h3>Get Ideas</h3>
            <button className="view-more" onClick={()=>history.push("/recipiesList")}>view more</button>
          </div>
          <div className='getIdeas-contents'>
            {limitedRecipies.length > 0 && limitedRecipies.map((item)=>{
              return <RecipeHomeCard key={item._id} {...item} />
            })}
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------- */}

      {isUserAuthenticated && (
        <section className='ourLatest-recipeSection'>
          <div className='container sections-wrapper'>
            <div className='ourLatest-header'>
              <h3>Your Latest</h3>
              <button className="view-more" onClick={()=>history.push("/yourRecipies")}>view more</button>
            </div>
            <div className='ourLatest-contents'>
              {limitedUserRecipies.length > 0 && limitedUserRecipies.map((item)=>{
                return <RecipeHomeCard key={item._id} {...item} />
              })}
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------- */}
      <section className='briyani-section'>
        <div className='container sections-wrapper'>
          <div className='briyani-header'>
            <h3>Briyani Recipies</h3>
            <button className="view-more" onClick={()=>history.push("/biryaniPage")}>view more</button>
          </div>
          <div className='briyani-contents'>
            {limitedBiryaniRecipies.length > 0 && limitedBiryaniRecipies.map((item)=>{
              return <RecipeHomeCard key={item._id} {...item} />
            })}
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------- */}
      <section className='cakes-section'>
        <div className='container sections-wrapper'>
          <div className='cakes-header'>
            <h3>Cakes Recipies</h3>
            <button className="view-more" onClick={()=>history.push("/cakePage")}>view more</button>
          </div>
          <div className='cakes-contents'>
            {limitedCakeRecipies.length > 0 && limitedCakeRecipies.map((item)=>{
              return <RecipeHomeCard key={item._id} {...item} />
            })}
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------- */}
      <section className='healthy-section'>
        <div className='container sections-wrapper'>
          <div className='healthy-header'>
            <h3>Healthy Recipies</h3>
            <button className="view-more" onClick={()=>history.push("/healthyPage")}>view more</button>
          </div>
          <div className='healthy-contents'>
            {limitedHealthyRecipies.length > 0 && limitedHealthyRecipies.map((item)=>{
              return <RecipeHomeCard key={item._id} {...item} />
            })}
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------- */}
      <section className='under30m-section'>
        <div className='container sections-wrapper'>
          <div className='under30m-header'>
            <h3>Under 30 min Recipies</h3>
            <button className="view-more" onClick={()=>history.push("/under30Recipe")}>view more</button>
          </div>
          <div className='under30m-contents'>
            {limitedUnder30Recipies.length > 0 && limitedUnder30Recipies.map((item)=>{
              return <RecipeHomeCard key={item._id} {...item} />
            })}
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------- */}
      <section className='under10m-section'>
        <div className='container sections-wrapper'>
          <div className='under10m-header'>
            <h3>Under 10 min Recipies</h3>
            <button className="view-more" onClick={()=>history.push("/under10Recipe")}>view more</button>
          </div>
          <div className='under10m-contents bottom-section'>
            {limitedUnder10Recipies.length > 0 && limitedUnder10Recipies.map((item)=>{
              return <RecipeHomeCard key={item._id} {...item} />
            })}
          </div>
        </div>
      </section>
      {/* --------------------------------------------------------- */}
    </section>
  )
}

export default Home