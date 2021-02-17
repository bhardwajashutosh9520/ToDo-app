import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getProductDetails } from '../reducer/product';
import { get } from 'lodash';
import Header from '../sharedComponents/header';

class Index extends PureComponent {
 componentDidMount() {
  const { getProductDetails, match } = this.props;
  getProductDetails(match.params.id);
 }

 render() {
  const { productDetails } = this.props;
  const product_detail = get(productDetails, 'product_detail', {});
  const name = get(product_detail, 'name', '');
  return (
   <div>
    <Header />
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
   </div>
  );
 }
}

const mapStateToProps = (state) => ({
 productDetails: state.product.productDetails,
});

const mapDispatchToProps = (dispatch) => {
 return {
  getProductDetails: (payload) => dispatch(getProductDetails(payload)),
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
