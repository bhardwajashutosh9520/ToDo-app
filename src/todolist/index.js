import React, { PureComponent } from "react";
import ToDoForm from "./todoForm";
class Index extends PureComponent {
  render() {
    return (
      <div className="container-fluid mt-5">
        <ToDoForm />
      </div>
    );
  }
}

export default Index;
