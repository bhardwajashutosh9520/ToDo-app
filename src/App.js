import React, { PureComponent } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginForm from './login';
import ProductList from './productList/index';
import ProductDetail from './productDetail/index';

class App extends PureComponent {
 render() {
  const { myname, changeName } = this.props;
  return (
   <div>
    <Router>
     <div>
      <Switch>
       <Route path="/productList">
        <ProductList />
       </Route>
       <Route path="/productDetail/:id" component={ProductDetail} />
       <Route path="/">
        <LoginForm />
       </Route>
      </Switch>
     </div>
    </Router>
   </div>
  );
 }
}

export default App;
