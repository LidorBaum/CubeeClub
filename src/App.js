
import { Header } from './cmps/Header2';
import { Home } from './pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Product } from './pages/Product';
import { LoginSignup } from './pages/LoginSignup'
import { AuthProvider } from './contexts/AuthContext'
import { CartContext } from './contexts/CartContext';
import { Dashboard } from './pages/Dashboard';
import PrivateRoute from './cmps/PrivateRoute';
import { useEffect, useState } from 'react';
import Cookies, { set } from 'js-cookie';
import { Cart } from './pages/Cart';
import { collection, getDocs } from 'firebase/firestore';
import {db} from './firebase'


function App() {

  const [cart, setCart] = useState([])
  const [users, setUsers] = useState([])
  const usersCollRef = collection(db, 'Users')
  useEffect(() => {
    if (Cookies.get('cart')) {
      const cartJson = JSON.parse(Cookies.get('cart'));
      setCart(cartJson);
    }
    else {
      // Cookies.set('cart', JSON.stringify([1,2,3]))
    }
  }, [])

  useEffect(()=>{
    const getUsers = async () =>{
      const data  = await getDocs(usersCollRef);
      setUsers(data.docs.map(doc=>({...doc.data(), id: doc.id})))
    }
    getUsers()
  },[])

  return (
    <AuthProvider>
      <CartContext.Provider value={{ cart, setCart }}>
        <div className="App">
          <Router>

            <Header />
            {users.map((user)=>{
              return(
              <h1>{user.name}</h1>
              )
            })}
            <div className="content">
              <Switch>
                <Route
                  path="/"
                  exact
                  component={Home}
                />
                <Route
                  path="/login"
                  exact
                  component={LoginSignup}
                />
                <Route
                  path="/cart"
                  exact
                  component={Cart}
                />
                <PrivateRoute
                  path="/dashboard"
                  exact
                  component={Dashboard}
                />
                <Route
                  path="/products/:productId"
                  component={Product}
                />
              </Switch>
            </div>
          </Router>

        </div>
      </CartContext.Provider>
    </AuthProvider>
  );
}

export default App;
