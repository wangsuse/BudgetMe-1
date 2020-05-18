import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getReceiptsThunk} from '../store/allReceipts'

class Receipts extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.displayReceipts()
  }

  render() {
    return (
      <div>
        <h1 className="has-text-centered has-background-grey-light is-size-5">
          {' '}
          Receipts
        </h1>

        <article className="tile is-child box">
          <div className="buttons level-item">
            <button className="button is-rounded is-info">
              <Link to="/receiptdetail">
                <strong className="has-text-warning">Upload</strong>
              </Link>
            </button>
            <button className="button is-rounded is-info">
              <Link to="/manualreceipt">
                <strong className="has-text-warning">Manual</strong>
              </Link>
            </button>
          </div>
        </article>
        <br />
        <div className="center">
          <table className="table is-hoverable">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Subtotal</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {this.props.receipts.map(receipt => {
                return (
                  <tr key={receipt.id}>
                    <td>{receipt.vendor}</td>
                    <td>${receipt.totalPrice / 100}</td>
                    <td>{receipt.date.slice(0, 10)}</td>
                    <td>
                      <img src="/receipt icon.jpg" height="20px" width="20px" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    receipts: state.allReceiptsReducer
  }
}

const mapDispatch = dispatch => {
  return {
    displayReceipts: () => dispatch(getReceiptsThunk())
  }
}

export default connect(mapState, mapDispatch)(Receipts)
