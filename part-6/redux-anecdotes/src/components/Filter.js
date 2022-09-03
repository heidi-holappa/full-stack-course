import { useDispatch, useSelector } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)

    const handleChange = (event) => {
      event.preventDefault()
      dispatch(updateFilter(event.target.value))
    }
    const style = {
      marginBottom: 10
    }

    console.log('Filter: ', filter.text)
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} value={filter.text} />
      </div>
    )
  }
  
  export default Filter