import React,{useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik'
import * as yup from 'yup';
import "./NewRecipe.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useHistory, useParams} from 'react-router-dom'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Spinner from 'react-spinkit'
import { useGlobalContext } from './context'
import { useSnackbar } from 'notistack';

const validateFormSchema = yup.object({
    recipeName: yup.string().required('Please fill the recipe name'),
    servings: yup.number().min(1, "Must be positive number").integer("Must be More than 1").required("Please fill the servings"),
    totalTime: yup.number().min(1, "Must be positive number").integer("Must be More than 1").required("Please fill the total time"),
    recipeDescription: yup.string().min(150, "must be minimum of 150 words").required("Please fill job description")
})

const EditRecipe = () => {

    const history = useHistory()

    const { enqueueSnackbar } = useSnackbar();

    const {id} = useParams()

    const [recipeCategoryList, setRecipeCategoryList] = useState([])

    const [recipeAdded, setRecipeAdded] = useState(false)

    const [recipeDetails, setRecipeDetails] = useState({})

    const {user, isUserAuthenticated, isUserLoggedIn} = useGlobalContext()

    let recipeDespLength = 150

    useEffect(() => {
        if(!isUserAuthenticated){
            isUserLoggedIn()
        }
    }, [])

    const handleSuccessVariant = (variant) => () => {
        console.log("recipe added")
        enqueueSnackbar('Recipe Added!', { variant });
        setRecipeAdded(false)
    };

    useEffect(()=>{
        if(recipeAdded === true){
            handleSuccessVariant('success')
        }
    },[recipeAdded])

    console.log(user)

    const getRecipeDetails = async() => {
        fetch(`https://recipe-node-app.herokuapp.com/recipe/ingredients/getRecipeDetailsById/${id}`, {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setRecipeDetails(details))
    }

    console.log(recipeDetails && recipeDetails, "73")

    useEffect(()=>{
        getRecipeDetails()
    }, [])

    const getRecipeCategoryList = async() => {
        fetch("https://recipe-node-app.herokuapp.com/recipe/ingredients/getRecipeCategory", {
            method:'GET',
            headers: { "Content-Type": "application/json"}
                })
        .then((data)=> data.json())
        .then((details)=> setRecipeCategoryList(details))
    }

    useEffect(()=>{
        getRecipeCategoryList()
    }, [])

    useEffect(()=>{
        setInstructionList(recipeDetails?.instructionList)
        setIngredientsList(recipeDetails?.ingredientsList)
        setRecipePic(recipeDetails?.recipePic)
    },[recipeDetails])

    console.log(recipeCategoryList)

    const [instructionList, setInstructionList] = useState()

    const [ingredientsList, setIngredientsList] = useState(recipeDetails && recipeDetails?.ingredientsList)

    const handleInstructionChange = (e, index) => {
        const {name, value} = e.target
        const list = [...instructionList]
        list[index][name] = value
        setInstructionList(list)
    }

    const handleInstructionRemove = index => {
        const list = [...instructionList];
        list.splice(index, 1);
        setInstructionList(list);
    };

    const handleInstructionAdd = () => {
        setInstructionList([...instructionList, {instruction:""}]);
    };

    // -----------------------------------------------------------------------------

    const handleIngredientChange = (e, index) => {
        const { name, value } = e.target;
        console.log(name, value)
        const list = [...ingredientsList];
        list[index][name] = value;
        setIngredientsList(list);
    };

    const handleIngredientRemove = index => {
        const list = [...ingredientsList];
        list.splice(index, 1);
        setIngredientsList(list);
    };

    const handleIngredientAdd = () => {
        setIngredientsList([...ingredientsList, {unit:"", amount:"", ingredientName:""}]);
    };

    // -------------------------------------------------------------------------------------------

    const [recipePic, setRecipePic] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [photoError, setPhotoError] = useState({show:false, msg:""})

    const handlePhotoSelect = (photo) => {
        console.log(photo)
        setIsLoading(true)
        if(photo === undefined){
            setPhotoError({show:true, msg:"please select photo"})
        }

        if(photo.type === "image/jpeg" || photo.type === "image/png"){
            const result = new FormData()
            result.append("file", photo)
            result.append("upload_preset", "recipe")
            result.append("cloud_name", "onlynavv")
            fetch("https://api.cloudinary.com/v1_1/onlynavv/image/upload",{
                method: "POST",
                body:result
            }).then((resp)=>resp.json()).then((data)=>{
                setRecipePic(data.url.toString())
                console.log(data.url.toString())
                setIsLoading(false)
            }).catch((error)=>{
                console.log(error)
                setIsLoading(false)
            })
        }else{
            setPhotoError({show:true, msg:"please select photo"})
            setIsLoading(false)
        }
    }

    // --------------------------------------------------------------------------------------

    const {handleBlur, handleChange, handleSubmit, errors, values, touched, resetForm} = useFormik(
        {
            initialValues:{recipeName:recipeDetails?.recipeName, servings:recipeDetails?.servings, totalTime:recipeDetails?.totalTime, recipeCat:recipeDetails?.recipeCat, recipeDescription:recipeDetails?.recipeDescription},
            enableReinitialize:true,
            validationSchema: validateFormSchema,
            onSubmit: (values) => {
                updateRecipe(values)
            }
        }
    )

    const updateRecipe = async(values) => {
        console.log({...values, ingredientsList, instructionList, recipePic})
        try{
            const resp = await fetch(`http://localhost:9000/recipe/ingredients/editRecipeDetail/${id}`, {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":user.token},
            body: JSON.stringify({...values, ingredientsList, instructionList, recipePic})
                })
            if(resp.ok){
                history.goBack()
            }
        }catch(error){
            console.warn(error.toString())
        }
    }

    console.log(recipeDetails?.ingredientsList)
    console.log(ingredientsList && ingredientsList)
    console.log(recipeDetails?.recipePic)
    console.log(recipeDetails?.recipeName)
    console.log(values.recipeCat)

  return (
    <section className='newRecipe-section'>
        <div className='container'>
            <div className='newRecipe-wrapper'>
                <button onClick={()=>{history.goBack()}} className="goBack-btn"><ArrowBackIosIcon /> Back </button>
                <div className='heading-div'>
                    <h1>Edit Recipe</h1>
                </div>
                <form className='form-wrapper' onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <InputLabel style={{fontWeight:"900"}} id="demo-multiple-chip-label">Recipe Name</InputLabel>
                        <TextField className="userInput" placeholder='Enter Recipe Name' id="recipeName" name="recipeName" value={values.recipeName} error={errors.recipeName && touched.recipeName} helperText={errors.recipeName && touched.recipeName && errors.recipeName} onChange={handleChange} onBlur={handleBlur}  multiline variant="standard" />
                    </div>
                    <div className='form-control'>
                        <InputLabel style={{fontWeight:"900"}} id="demo-multiple-chip-label">Category</InputLabel>
                        <Select
                            name="recipeCat"
                            value={values?.recipeCat}
                            onChange={handleChange}
                            error={errors.recipeCat && touched.recipeCat}
                            onBlur={handleBlur}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {recipeCategoryList.length > 0 && recipeCategoryList?.map((item)=>{
                                    return(
                                        <MenuItem key={item._id} value={item.recipeCatName}>
                                            {item.recipeCatName}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                    </div>
                    <div className='form-control'>
                        <InputLabel style={{fontWeight:"900"}} id="demo-simple-select-standard-label" className="userinput">Description</InputLabel>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Enter Description"
                            className="userInput textareaInput"
                            minRows={5}
                            id="recipeDescription" name="recipeDescription" value={values?.recipeDescription} error={errors.recipeDescription && touched.recipeDescription} helperText={errors.recipeDescription && touched.recipeDescription && errors.recipeDescription} onChange={handleChange} onBlur={handleBlur}
                        />
                        {values?.recipeDescription?.length < recipeDespLength && <p>{recipeDespLength - values?.recipeDescription?.length} / {recipeDespLength} words remaining</p>}
                        <p style={{color:"#d32f2f"}}>{errors.recipeDescription && touched.recipeDescription && errors.recipeDescription}</p>
                    </div>
                    <div className='form-control'>
                        <InputLabel style={{fontWeight:"900"}} id="demo-multiple-chip-label">Servings</InputLabel>
                        <TextField className="userInput" placeholder='Enter Servings' id="servings" name="servings" value={values.servings} error={errors.servings && touched.servings} helperText={errors.servings && touched.servings && errors.servings} onChange={handleChange} onBlur={handleBlur}  multiline variant="standard" />
                    </div>
                    <div className='form-control'>
                        <InputLabel style={{fontWeight:"900"}} id="demo-multiple-chip-label">Total Time</InputLabel>
                        <TextField className="userInput" placeholder='Enter Total Time for the Recipe' id="totalTime" name="totalTime" value={values.totalTime} error={errors.totalTime && touched.totalTime} helperText={errors.totalTime && touched.totalTime && errors.totalTime} onChange={handleChange} onBlur={handleBlur}  multiline variant="standard" />
                    </div>
                    <div className='form-control'>
                        <InputLabel style={{fontWeight:"900"}} id="demo-simple-select-standard-label" className="userinput">Ingredients</InputLabel>
                        {ingredientsList?.map((item,index)=>{
                                return(
                                    <div className='ingredientsList-div' key={index}>
                                        <h4>Ingredient {index + 1}</h4>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            name="unit"
                                            label="unit"
                                            value={item.unit}
                                            onChange={e => handleIngredientChange(e, index)}
                                            >
                                            <MenuItem value="none">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="cup">
                                                Cup
                                            </MenuItem>
                                            <MenuItem value="kg">
                                                KG
                                            </MenuItem>
                                            <MenuItem value="g">
                                                g
                                            </MenuItem>
                                            <MenuItem value="l">
                                                l
                                            </MenuItem>
                                            <MenuItem value="ml">
                                                ml
                                            </MenuItem>
                                            <MenuItem value="tbsp">
                                                tbsp
                                            </MenuItem>
                                            <MenuItem value="tsp">
                                                tsp
                                            </MenuItem>
                                            <MenuItem value="no">
                                                no
                                            </MenuItem>
                                        </Select>
                    
                                        {/* <input type="number" min="0" className="userinput" name="amount" placeholder="Enter Amount" value={item.amount} onChange={e => handleIngredientChange(e, index)} /> */}

                                        <TextField className="userinput" label='Amount' name="amount" placeholder="Enter Amount" value={item.amount} onChange={e => handleIngredientChange(e, index)}  multiline variant="standard" />

                                        <TextField className="userinput" label='Ingredient Name' name="ingredientName" placeholder="Enter Ingredient Name" value={item.ingredientName} onChange={e => handleIngredientChange(e, index)}  multiline variant="standard" />
                                        
                                        <div className="btn-box">
                                            {ingredientsList.length !== 1 && (
                                            <button className='removeBtn' onClick={() => handleIngredientRemove(index)}>Remove <HighlightOffIcon /></button> 
                                            )}
                                            {ingredientsList.length - 1 === index && <button className='addMore' onClick={handleIngredientAdd}>Add <AddCircleIcon /></button>}
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    <div className='form-control'>
                        <InputLabel id="demo-simple-select-standard-label" style={{fontWeight:"900"}} className="userInput">Recipe Instructions</InputLabel>
                        {instructionList?.map((item,index)=>{
                            return(
                                <div className='instruction-div' key={index}>
                                    <h4>Instruction {index + 1}</h4>
                                    <TextareaAutosize
                                        aria-label="empty textarea"
                                        placeholder="Enter a Instruction"
                                        className="userInput textareaInput"
                                        minRows={5}
                                        id="instruction" name="instruction" value={item.instruction} onChange={e => handleInstructionChange(e, index)}
                                        />
                                    
                                    <div className="btn-box">
                                        {instructionList.length !== 1 && (
                                        <button onClick={() => handleInstructionRemove(index)} className='removeBtn'>Remove <HighlightOffIcon /></button> 
                                        )}
                                        {instructionList.length - 1 === index && <button className='addMore' onClick={handleInstructionAdd}>Add <AddCircleIcon /></button>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='form-control'>
                        <InputLabel id="demo-simple-select-standard-label" style={{fontWeight:"900"}} className="userInput">Upload Recipe Photo</InputLabel>
                        <TextField name="upload-photo" type="file" helperText={photoError.show && photoError.msg} onChange={(e)=>handlePhotoSelect(e.target.files[0])} />
                        {isLoading && <Spinner name="circle" color="red"/>}
                        <div className='image-preview'>
                            <img src={recipeDetails.recipePic} alt={recipeDetails.recipeName}></img>
                        </div>
                        <p>want to update recipe photo ? then select <b>choose file</b>, otherwise previous recipe photo will be retained</p>
                    </div>
                    <Button className="submitBtn" variant="contained" size="medium"  type="submit">Edit Recipe</Button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default EditRecipe