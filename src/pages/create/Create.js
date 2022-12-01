import './Create.css'
import { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

const Create = () => {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)
  const [confirm, setConfirm] = useState('')
  

  const { postData, data, error } = useFetch('http://localhost:3000/recipes','POST')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({title,ingredients,method,cookingTime: cookingTime + ' minutes'})
 
  }

  useEffect(() => {
    if(data){
      setConfirm('The recipe has been added to the list')
      setTimeout(() => {
        history.push('/')
      },2000)
    }
  },[data, history])

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()

    if(ing && !ingredients.includes(ing)){
      setIngredients(prevIngredients => [...prevIngredients,ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required 
          />
        </label>
       

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input 
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput} 
            />
            <button onClick={handleAdd} className='btn'>add</button>
          </div>
        </label>
        <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)} 
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time (minutes): </span>
          <input 
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required 
          />
        </label>

        <button className='btn'>submit</button>
      </form>
      {error && <p>{error}</p>}
      {data && <p>{confirm}</p>}
    </div>
  )
}

export default Create