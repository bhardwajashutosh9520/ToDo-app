import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getProductDetails } from '../reducer/product';
import { get } from 'lodash';

class Index extends PureComponent {
 componentDidMount() {
  const { getProductDetails, match } = this.props;
  getProductDetails(match.params.id);
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


const mapDispatchToProps = (dispatch) => {
 return {
  getProductDetails: (payload) => dispatch(getProductDetails(payload)),
 };
};

export default connect(null, mapDispatchToProps)(Index);
