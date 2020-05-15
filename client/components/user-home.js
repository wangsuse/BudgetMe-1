import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getTotalThunk} from '../store'
import Pie from './user-home/pie'
import Message from './user-home/message'

export class UserHome extends React.Component {

componentDidMount(){
  const {id} = this.props
  this.props.getTotal(id)
}
  render(){
    const {email} = this.props
    const {total} = this.props
    if(total.percentageSpent === null || total.percentageNotSpent === null ){
      return(
      <div>
      <h4>Welcome, {email}</h4>
      <h5>You have not recorded any budget at the moment </h5>
      </div>
        )
    }else{
      return (
        <div>
        <Pie 
        email={email}
        percentageNotSpent={total.percentageNotSpent}
        percentageSpent={total.percentageSpent}/>
        <Message totalSpend={total.totalSpend}/>
        </div>
    )
  }
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    id: state.user.id,
    email: state.user.email,
    total: state.budgetReducer.Total,
  }
}

const mapDispatch = dispatch => {
  return {
    getTotal: (id) => dispatch(getTotalThunk(id))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

/*<div>
        <h4>Welcome, {email}  </h4>
        
         <div className='level-item'>
        <svg width={300} height={300}>
          <VictoryPie
            standalone={false}
            width={300}
            height={300}
            padding={100}
            data={[
              {label: 'Not Spent', y: total.percentageNotSpent },
              {label: 'Spent', y: total.percentageSpent},
            ]}
            innerRadius={75}
            labelRadius={90}
            style={{labels: {fontSize: 12, fill: 'black'}}}
            colorScale={['#9ACD32', '#FF7F50']}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{fontSize: 15}}
            x={150}
            y={150}
            text={`${total.percentageSpent}% of your \n budget spent`}
          />
        </svg>
        </div> 
      </div> */