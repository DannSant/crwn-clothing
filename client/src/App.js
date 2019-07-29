import React, {useEffect} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from './redux/user/user.selectors';


import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignOut from './pages/sig-in-and-sign-out/sig-in-and-sign-out.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {checkUserSession} from './redux/user/user.actions';



import './App.css';




const App = ({checkUserSession,currentUser})=>{

  //La propiedad que mandamos en el segundo argumento de useEffect es la propiedad que el hook va a "vigilar" y cada vez que cambie, ejecuta la funcion
  //Si no le mandamos nada se va a ejecutar siempre que cualquier propiedad se actualice (en este caso si se actualiza currentUSer) o si el componente padre vuelve a ejecutar su render (en caso que se actualice una de las propiedades del padre)
  //si mandamos un arreglo vacio se ejecuta solo al inicio de la aplicacion (component did mount)
  //En este caso, si mandamos un arreglo vacio funciona, sin embargo si la propiedad checkUserSession fuera recibida desde un componente padre, y esta llegase a cambiar la funcion se ejecutaria constantemente
  //No vemos este efecto debido a que este componente (App) es el que está hasta arriba, y no tiene padre
  //aun asi, se recomienda mandar la funcion checkUserSession en el arreglo para "vigilarla" aunque de todos modos esta no va a cambiar ya que la recibimos del metodo dispatchToProps 
  useEffect(()=>{
    checkUserSession();  
  },[checkUserSession]);

  return (
    <div>
      <Header ></Header>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route  path='/shop' component={Shop} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route  path='/signin' render={()=>currentUser ? (<Redirect to='/' />) : (<SignInAndSignOut></SignInAndSignOut>)} />
      </Switch>
    
    </div>
  );  
 
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch)=>({
  checkUserSession:()=>dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
