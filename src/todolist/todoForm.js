import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import { FormGroup } from "react-bootstrap";
import { startLogin } from "../reducer/product";

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      editIndex: null,
      editedValue: "",
    };
  }

  componentDidMount() {
    this.getList();
  }

  addItem = (values) => {
    const { initialize } = this.props;
    const prevItem = JSON.parse(localStorage.getItem("todoList")) || [];
    const list = [];
    list.push(values.todoItem);
    if (prevItem && prevItem.length > 0) {
      const updateList = [...prevItem, values.todoItem];
      localStorage.setItem("todoList", JSON.stringify(updateList));
    } else {
      localStorage.setItem("todoList", JSON.stringify(list));
    }
    initialize({ todoItem: "" });
    this.setState({ editIndex: null, editedValue: "" });
    this.getList();
  };

  deleteItem = (item, index) => {
    const todolist = JSON.parse(localStorage.getItem("todoList"));
    const updatedList = todolist.filter((e, i) => i !== index);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    this.setState({ editIndex: null, editedValue: "" });
    this.getList();
  };

  updateItem = () => {
    const { formData } = this.props;
    const { editIndex, editedValue } = this.state;
    const todolist = JSON.parse(localStorage.getItem("todoList"));
    const updatedList = todolist.map((element, i) => {
      if (i === editIndex) {
        return editedValue;
      }
      return element;
    });
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    this.setState({ editIndex: null, editedValue: "" });
    this.getList();
  };

  getList = () => {
    const todolist = JSON.parse(localStorage.getItem("todoList")) || [];
    this.setState({ list: todolist });
  };

  render() {
    const { handleSubmit } = this.props;
    const { list, editIndex, editedValue } = this.state;
    let showToDoList;
    if (list && list.length > 0) {
      showToDoList = list.map((item, index) => {
        return (
          <li key={index} className="mb-2">
            <div className="d-flex justify-content-between">
              {editIndex === index ? (
                <form className="d-flex">
                  <FormGroup name="formGroup" className="mb-3">
                    <div>
                      <Field
                        name={`${item}_${index}`}
                        className="form-control form-control-sm"
                        component="input"
                        type="text"
                        placeholder="enter item"
                        size="sm"
                        required
                        onChange={(e) =>
                          this.setState({ editedValue: e.target.value })
                        }
                      />
                    </div>
                  </FormGroup>
                </form>
              ) : (
                item
              )}

              <div>
                {editIndex === index ? (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={this.updateItem}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      this.setState({ editIndex: index, editedValue: "" })
                    }
                  >
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm ml-2"
                  onClick={() => this.deleteItem(item, index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        );
      });
    }

    return (
      <div className="container-fluid mt-5 col-md-4">
        <h3>My Awesome to-do app is here</h3>
        <div>
          <h3>Add item in to do list</h3>
        </div>
        <div>
          <form onSubmit={handleSubmit(this.addItem)} className="d-flex">
            <FormGroup name="formGroup" className="mb-3">
              <div>
                <Field
                  name="todoItem"
                  className="form-control form-control-sm"
                  component="input"
                  type="text"
                  placeholder="enter item"
                  size="sm"
                  required
                />
              </div>
            </FormGroup>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary btn-sm ml-2">
                Add
              </button>
            </div>
          </form>
        </div>
        <div>
          <h3>To do list</h3>
          <ul className="m-0 p-0">{showToDoList}</ul>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "todoform",
})(Index);
