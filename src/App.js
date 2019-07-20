import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from './redux/user/user.selectors';


import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignOut from './pages/sig-in-and-sign-out/sig-in-and-sign-out.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';


import './App.css';



class App extends React.Component{

  // constructor(){
  //   super();
  //   this.state = {
  //     currentUser:null
  //   }
  // }

  unsuscribeFromAuth = null;

  componentDidMount(){
   const { setCurrentUser} =this.props;
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async ( userAuth)=>{
     
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot =>{
          setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
            }
          )
        })
      }else {
        setCurrentUser(userAuth);
      }
      
      
      
    });
  }

  componentWillUnmount(){
    this.unsuscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header ></Header>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route  path='/shop' component={Shop} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route  path='/signin' render={()=>this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignOut></SignInAndSignOut>)} />
        </Switch>
      
      </div>
    );
  }
 
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user=> dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
