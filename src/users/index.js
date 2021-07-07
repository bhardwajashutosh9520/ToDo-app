import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getUserList } from "../reducer/product";
import InfiniteScroll from "react-infinite-scroll-component";

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { getUserList } = this.props;
    getUserList({ page: 1 });
  }

  fetchData = () => {
    const { getUserList } = this.props;
    const { page } = this.state;
    getUserList({ page: page + 1 });
    this.setState({ page: page + 1 });
  };

  render() {
    const { userData } = this.props;
    let showUserList = [];
    if (userData && userData.length > 0) {
      showUserList = userData.map((item) => {
        return (
          <tr>
            <th scope="row">{item.id}</th>
            <td>
              {" "}
              <img
                src={item.avatar}
                alt={item.name}
                width="80px"
                heoght="80px"
                style={{ borderRadius: "10px" }}
              />
            </td>
            <td>{`${item.first_name} ${item.last_name}`}</td>
            <td>{item.email}</td>
          </tr>
        );
      });
    }

    return (
      <div className="container-fluid mt-5">
        <InfiniteScroll
          dataLength={showUserList.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={true}
          loader={<h4></h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Avatar</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>{showUserList}</tbody>
          </table>
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.product.userData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: (payload) => dispatch(getUserList(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
