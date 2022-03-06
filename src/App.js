import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Error from "./Error";
import Home from "./Home";
import Login from "./Login";
import MyRecipe from "./MyRecipe";
import Navbar from "./Navbar";
import NewRecipe from "./NewRecipe";
import Register from "./Register";
import RecipiesList from "./RecipiesList"
import SingleRecipePage from "./SingleRecipePage";
import CategoryRecipies from "./CategoryRecipies";
import YourRecipes from "./YourRecipes";
import BiryaniPage from "./BiryaniPage";
import CakePage from "./CakePage";
import HealthyPage from "./HealthyPage";
import Under30Recipie from "./Under30Recipe";
import Under10Recipie from "./Under10Recipe";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/newRecipe">
          <NewRecipe />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/recipiesList">
          <RecipiesList />
        </Route>
        <Route path="/singleRecipe/:id">
          <SingleRecipePage />
        </Route>
        <Route path="/categoryRecipies/:catName">
          <CategoryRecipies />
        </Route>
        <Route path="/yourRecipies">
          <YourRecipes />
        </Route>
        <Route path="/biryaniPage">
          <BiryaniPage />
        </Route>
        <Route path="/cakePage">
          <CakePage />
        </Route>
        <Route path="/healthyPage">
          <HealthyPage />
        </Route>
        <Route path="/under30Recipe">
          <Under30Recipie />
        </Route>
        <Route path="/under10Recipe">
          <Under10Recipie />
        </Route>
        <Route path="**">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
