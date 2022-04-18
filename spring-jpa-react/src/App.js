
import './App.css';
import {ProductRepository} from './Components/Prodotti.js';
import {DeliveryRepository} from './Components/Consegne.js';
import {OrderRepository} from './Components/Ordini.js';
 
import {BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <div className="App">

<Router>
      <div>
        <nav class="toolbar">
          <ul>
            <li>
              <Link class="link" to="/delivery">Consegne</Link>
            </li>
            <li>
              <Link class="link" to="/">Prodotti</Link>
            </li>
            <li>
              <Link class="link" to="/orders">Ordini</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/delivery">
            <Delivery />
          </Route>
        </Switch>
      </div>
    </Router>

    </div>
  );
}



function Products() {
  return (
    <ProductRepository />
  );
}

function Orders() {
  return (
    <OrderRepository />
  );
}

function Delivery() {
  return (
    <DeliveryRepository />
  );
}
  


