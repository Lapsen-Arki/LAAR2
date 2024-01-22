import { useDispatch } from 'react-redux'
import { createMeal } from '../../reducers/eventReducer'

const NewMeal = () => {
  const dispatch = useDispatch()

  const addMeal = (event) => {
    event.preventDefault()
    const content = event.target.meal.value
    event.target.meal.value = ''
    dispatch(createMeal(content))
  }

  return (
    <form onSubmit={addMeal}>
      <input name="meal" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewMeal