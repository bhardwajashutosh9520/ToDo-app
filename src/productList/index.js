import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getProductList } from '../reducer/product';

class Index extends PureComponent {
 componentDidMount() {
  const { getProductList } = this.props;
  getProductList();
 }

 gotoProductDetail = (id) => {
  console.log('go');
  window.location.href = `/productDetail/${id}`;
 };

 render() {
  const { productList } = this.props;
  let showList;
  if (productList) {
   showList = productList.map((item) => {
    return (
     <tr>
      <td>{item.name}</td>
      <td>
       <img src={item.image} height="40px" width="40px" />
      </td>
      <td>{item.price}</td>
      <td>{item.excluding_gst_price}</td>
      <td>{item.rating}</td>
      <td>{item.discount_off}</td>
      <td>
       <button
        type="button"
        onClick={() => this.gotoProductDetail(item.product_id)}
        class="btn btn-primary"
       >
        Go
       </button>
      </td>
     </tr>
    );
   });
  }
  return (
   <div className="container mt-5">
    <div>
     <h3>Product List</h3>
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
      {showList}
     </table>
    </div>
   </div>
  );
 }
}

const mapStateToProps = (state) => ({
 productList: state.product.productList,
});

const mapDispatchToProps = (dispatch) => {
 return {
  getProductList: () => dispatch(getProductList()),
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
