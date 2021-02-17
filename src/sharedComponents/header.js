import React, { PureComponent } from 'react';
import './header.css';

class Header extends PureComponent {
 logout = () => {
  console.log('logout----');
  localStorage.clear();
  window.location.href = '/';
 };

 back = () => {
  window.location.href = '/productList';
 };
 render() {
  const { showback } = this.props;
  return (
   <div className={`header p-2 d-flex justify-content-end align-items-center`}>
    <button type="button" onClick={this.logout} class="btn btn-primary">
     Logout
    </button>
   </div>
  );
 }
}

export default Header;
