import React from 'react'
import {connect} from 'react-redux'
import {analyzeReceiptThunk} from '../store/receipt'
import {addReceiptThunk} from '../store/allReceipts'
import {Redirect} from 'react-router'

const categories = [
  'Choose a Category',
  'Food & Dining',
  'Shopping',
  'Home',
  'Auto & Transport',
  'Health & Fitness',
  'Pets',
  'Travel',
  'Fees & Charges'
]

const defaultState = {
  vendor: '',
  products: [],
  totalPrice: 0
}

class ReceiptDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      vendor: '',
      products: [],
      totalPrice: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleAllCategoryChange = this.handleAllCategoryChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidUpdate(preProps) {
    if (
      this.props.receipt.products !== undefined &&
      this.props.receipt !== preProps.receipt
    ) {
      this.setState(this.props.receipt)
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleNameChange(e) {
    const newProducts = [...this.state.products]
    const index = parseInt(e.target.id)
    newProducts[index].name = e.target.value
    this.setState({
      products: newProducts
    })
  }

  handlePriceChange(e) {
    const newProducts = [...this.state.products]
    const index = parseInt(e.target.id)
    newProducts[index].price = e.target.value
    this.setState({
      products: newProducts
    })
  }

  handleCategoryChange(e) {
    const newProducts = [...this.state.products]
    const index = parseInt(e.target.id)
    newProducts[index].categoryId = parseInt(e.target.value)
    this.setState({
      products: newProducts
    })
  }

  handleRemove(e, index) {
    e.preventDefault()
    const newProducts = [...this.state.products]
    newProducts.splice(index, 1)
    this.setState({
      products: newProducts
    })
  }

  handleAllCategoryChange(e) {
    const newProducts = [...this.state.products]
    newProducts.forEach(item => {
      item.categoryId = parseInt(e.target.value)
    })
    this.setState({
      products: newProducts
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let newReceipt = {
      vendor: this.state.vendor,
      products: this.state.products,
      totalPrice: this.state.totalPrice
    }
    this.props.addReceipt(newReceipt)
    this.setState({...defaultState, redirect: true})
  }

  handleUpload(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader()
      reader.onload = e => {
        this.setState({image: e.target.result})
      }
      reader.readAsDataURL(event.target.files[0])
    }

    let image = event.target.files[0]
    let form = new FormData()
    form.append('image', image)
    this.props.analyzeReceipt(form)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/receipts" />
    }
    return (
      <div>
        <img id="target" src={this.state.image} width="300px" />
        {this.props.receipt.error ? (
          <div>
            <p>{this.props.receipt.error}</p>
          </div>
        ) : (
          <div />
        )}
        <br />
        {!this.props.receipt.products ||
        this.props.receipt.products.length === 0 ||
        !this.state.vendor ? (
          <div>
            <input type="file" onChange={this.handleUpload} />
          </div>
        ) : (
          <div>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div>
                <label htmlFor="vendor">
                  <small>Vendor</small>
                </label>
                <input
                  onChange={e => this.handleChange(e)}
                  name="vendor"
                  type="text"
                  value={this.state.vendor}
                />
              </div>
              <br />
              <div>
                <small>Choose a category for all items:</small>
                <br />
                <select onChange={e => this.handleAllCategoryChange(e)}>
                  {categories.map((c, optionIndex) => {
                    return (
                      <option key={optionIndex} value={optionIndex + 1}>
                        {c}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div>
                {this.state.products.map((list, index) => {
                  return (
                    <div key={index}>
                      <label htmlFor="name">
                        <small>Name</small>
                      </label>
                      <input
                        onChange={e => this.handleNameChange(e)}
                        name="name"
                        type="text"
                        id={index}
                        value={list.name}
                      />

                      <label htmlFor="price">
                        <small>Price</small>
                      </label>
                      <input
                        onChange={e => this.handlePriceChange(e)}
                        name="price"
                        type="number"
                        step="any"
                        id={index}
                        value={list.price}
                      />
                      <br />
                      <select
                        id={index}
                        onChange={e => this.handleCategoryChange(e)}
                        value={list.categoryId}
                      >
                        {categories.map((c, optionIndex) => {
                          return (
                            <option key={optionIndex} value={optionIndex + 1}>
                              {c}
                            </option>
                          )
                        })}
                      </select>
                      <br />
                      <button onClick={e => this.handleRemove(e, index)}>
                        Remove
                      </button>
                    </div>
                  )
                })}
              </div>
              <div>
                <label htmlFor="totalPrice">
                  <small>Total Price</small>
                </label>
                <input
                  onChange={e => this.handleChange(e)}
                  name="totalPrice"
                  type="number"
                  step="any"
                  value={this.state.totalPrice}
                />
              </div>
              <br />
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    receipt: state.receiptReducer
  }
}

const mapDispatch = dispatch => ({
  addReceipt: receipt => dispatch(addReceiptThunk(receipt)),
  analyzeReceipt: receipt => dispatch(analyzeReceiptThunk(receipt))
})

export default connect(mapState, mapDispatch)(ReceiptDetail)
