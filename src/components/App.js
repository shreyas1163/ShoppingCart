import React from "react";
import CartList from "./CartList";
// import SearchPokemon from './SearchPokemon';
import "bootstrap/dist/css/bootstrap.css";
import "../assests/css/app.css";

const App = () => {
  return (
    <div>
      <div className="container-fluid">
        <h1>Your Shopping Cart</h1>
        if the cart is completely empty we shall add back the products for you
        <div className="row">
          <div className="col-md-12">
            <CartList />
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
