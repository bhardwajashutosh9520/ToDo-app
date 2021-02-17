import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getProductDetails } from '../reducer/product';
import { get } from 'lodash';

class Index extends PureComponent {
 componentDidMount() {
  const { getProductDetails, id } = this.props;
  console.log('Call te product list  api');
  getProductDetails(1353);
 }

 render() {
  const product = JSON.parse(localStorage.getItem('ProductDetail'));
  const product_detail = get(product, 'product_detail', {});
  const name = get(product_detail, 'name', '');
  return (
   <div className="container mt-5">
    <div>
     <h3>Details of Product {name}</h3>
     <table class="table table-striped table-hover">
      <tr>
       <th>Name:</th>
       <th>Image</th>
       <th>Price</th>
       <th>excludingGstPrice</th>
       <th>rating</th>
       <th>discount_off</th>
       <th>View details</th>
      </tr>
     </table>
    </div>
   </div>
  );
 }
}

// const mapStateToProps = (state) => ({
//  userData: state.auth.user_data,
//  saved: state.user.saved,
//  companyMemberList: state.company.companyMemberList,
// });

const mapDispatchToProps = (dispatch) => {
 return {
  getProductDetails: (payload) => dispatch(getProductDetails(payload)),
 };
};

export default connect(null, mapDispatchToProps)(Index);
