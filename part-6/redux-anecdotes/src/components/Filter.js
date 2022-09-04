import { connect, useDispatch } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleChange = (event) => {
      event.preventDefault()
      props.updateFilter(event.target.value)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} value={props.text} />
      </div>
    )
  }
  

const mapStateToProps = (state) => {
  return {
    text: state.filter.text
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (value) => {
      dispatch(updateFilter(value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
