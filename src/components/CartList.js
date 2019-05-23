import React, { Component } from "react";
import { connect } from "react-redux";
import { shoppingCart } from "../actions";
import Modal from "react-responsive-modal";
import "../assests/css/cartDetails.css";

class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      productId: "",
      productName: "",
      productType: "",
      productSize: "",
      productQuantity: "",
      cartData: this.props.cartList,
      productData: "",
      productIndex: "",
      promotionalOffer: 0.0,
      shippingFee: 0.0
    };
  }

  onOpenModal = (cart, index) => e => {
    console.log();

    this.setState({
      open: true,
      productData: cart,
      productId: cart.p_id,
      productSize: cart.p_selected_size.name,
      productQuantity: cart.p_quantity,
      productIndex: index
    });
  };
  onDelete = index => e => {
    console.log(index);
    this.state.cartData.splice(index, 1);
    this.setState({ cartData: this.state.cartData });
  };

  onCloseModal = () => {
    this.setState({
      open: false,
      productData: "",
      productId: "",
      productSize:"",
      productQuantity: "",
      productIndex:"",
    });
  };
  onSubmit = () => {
    let data = this.state.cartData[this.state.productIndex];
    console.log(data);

    data.p_selected_size.name = this.state.productSize;

    if (this.state.productSize === "small") {
      data.p_selected_size.code = "s";
    } else if (this.state.productSize === "medium") {
      data.p_selected_size.code = "m";
    } else if (this.state.productSize === "large") {
      data.p_selected_size.code = "l";
    } else if (this.state.productSize === "extra large") {
      data.p_selected_size.code = "xl";
    }
    data.p_quantity = this.state.productQuantity;
    console.log("data===>", data);
    this.state.cartData[this.state.productIndex] = data;
    this.setState({
      open: false,
      cartData: this.state.cartData,
      productId: "",
      productName: "",
      productType: "",
      productSize: "",
      productQuantity: "",
      productData: "",
      productIndex: ""
    });
  };
  handleChange = e => {
    console.log();
    this.setState({ productSize: e.target.value });
  };
  onApply=()=>{
    if(this.state.promoCode.trim().length!==0){
    this.setState({promotionalOffer:5.00})}
  }

  renderList = () => {
    return this.state.cartData.map((cart, index) => {
      return (
        <div key={cart.p_id} className="container-fluid">
          <div className="row">
            <div className="col-md-2" id="productName">
              <img src={cart.p_image} width="100px" height="100px" />
            </div>
            <div className="col-md-4" id="productDetails">
              <h1>{cart.p_name.toUpperCase()}</h1>
              <h3>Style #:{cart.p_style.toUpperCase()}</h3>
              <h3>Color:{cart.p_selected_color.name}</h3>
              <span className="controls">
                <span className="Edit">
                  <span onClick={this.onOpenModal(cart, index)}>Edit</span> |
                  <span onClick={this.onDelete(index)}>X Remove </span> |
                </span>
                Save for Later
              </span>
            </div>
            <div className="col-md-2" >
              <center>
                <h3>{cart.p_selected_size.code.toUpperCase()}</h3>
              </center>
            </div>
            <div className="col-md-2 " >
              <center>
              <input type="text"
                    className="form-control  text-center "
                    name="promoCode"
                    placeholder="promoCode"
                    value={cart.p_quantity}
                   
                   disabled/>
                <h3>{}</h3>
              </center>
            </div>
            <div className="col-md-2">
              <center>
                <h3>
                  {cart.c_currency}
                  {cart.p_price*cart.p_quantity}
                </h3>
              </center>
            </div>
          </div>
          <br />

          {/* <div className="content"></div> */}
        </div>
      );
    });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row top">
          <div className="col-md-6">
            <h3>{this.state.cartData.length} ITEMS</h3>
          </div>
          <div className="col-md-2">
            <center>
              <h3>SIZE</h3>
            </center>
          </div>
          <div className="col-md-2">
            <center>
              <h3>QTY</h3>
            </center>
          </div>
          <div className="col-md-2">
            <center>
              <h3>PRICE</h3>
            </center>
          </div>
        </div>
        <div className="row">{this.renderList()}</div>
        <div className="row">
          <div className="col-md-4">
            {" "}
            Need Help? or have questions
            <br />
            Call customer Service at 1-800-55555
            <br />
            Chat with our Stylist
            <br />
            See return or exchange policy
          </div>
          <div className="col-md-8">
            <div className="row">
            <div className="col-md-8">Enter Promo Code or Gift to be applied </div>
              <div className="col-md-2">
                <input type="text"
                    className="form-control "
                    name="promoCode"
                    placeholder="promoCode"
                    value={this.state.promoCode}
                    onChange={e =>
                      this.setState({ promoCode: e.target.value })
                    }
                    min={1}/>
              </div>
              <div className="col-md-2">
              <button onClick={this.onApply} className="btn btn-primary">
                      Apply
                    </button>
              </div>
              </div>
            <div className="row">
              <div className="col-md-10">Sub Total </div>
              <div className="col-md-2">
                <h3>
                  &nbsp;$
                  {this.state.cartData.reduce(
                    (partial_sum, a) => partial_sum + (a.p_price * a.p_quantity),
                    0
                  )}.00
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">Pramotional Code Applied  {this.state.promoCode}</div>
              <div className="col-md-2">
                <h3>-$ {this.state.promotionalOffer}.00</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">Shipping  </div>
              <div className="col-md-2">
                <h6>Free Shipping</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 ">
                <h1>Estimated Total</h1>
              </div>
              <div className=" col-md-2">
                <h1>
                  $
                  {this.state.cartData.reduce(
                    (partial_sum, a) => partial_sum + (a.p_price * a.p_quantity),
                    0
                  ) -
                    this.state.promotionalOffer +
                    this.state.shippingFee}.00
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 text-right text-underline">
               Countinue Shopping
              </div>
              <div className="col-md-2 ">
              <button onClick={this.onApply} className="btn btn-primary">
                      {"Checkout".toUpperCase()}
                    </button>
              </div>
            </div>
            
          </div>
        </div>

        <Modal
          open={this.state.open}
          onClose={this.onCloseModal}
          className="modalLayout"
        >
          <div>
            <div className="row">
              {this.state.productData.length !== 0 && (
                <div className="col-md-8">
                  <h1>{this.state.productData.p_name.toUpperCase()}</h1>
                  <center>
                    <h2>
                      {this.state.productData.c_currency}
                      {this.state.productData.p_price}
                    </h2>
                  </center>
                  <center>
                    <h3>{this.state.productData.p_style.toUpperCase()}</h3>
                  </center>
                  <h3>
                    <center>
                      <select
                        name={this.state.productSize}
                        value={this.state.productSize}
                        onChange={this.handleChange}
                      >
                        <option value="small">small</option>
                        <option value="medium">medium</option>
                        <option value="large">large</option>
                        <option value="extra large">extra large</option>
                      </select>
                    </center>
                  </h3>
                  <center><input
                    type="number"
                    className="form-control "
                    name="productQuantity"
                    placeholder="productQuantity"
                    value={this.state.productQuantity}
                    onChange={e =>
                      this.setState({ productQuantity: e.target.value })
                    }
                    min={1}
                  /></center>
                  <center>
                    <button onClick={this.onSubmit} className="btn btn-primary editBtn">
                      Edit
                    </button>
                  </center>
                </div>
              )}
              <div className="col-md-4">
                <img
                  src={this.state.productData.p_image}
                  width="100%"
                  height="200px"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartList: state.cartList
  };
};
export default connect(
  mapStateToProps,
  { shoppingCart }
)(CartList);
