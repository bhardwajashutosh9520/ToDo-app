import React, { PureComponent } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TodoList from "./todolist";
import Users from "./users";

class App extends PureComponent {
  render() {
    const { myname, changeName } = this.props;
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <TodoList />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
