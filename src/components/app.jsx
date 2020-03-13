import React from "react";
// import Utils from "../utils/index";
//import Utils from "Utils/index";
import Utils from "Utils";
import ExactUtils from "ExactUtils";

class App extends React.Component {
  render() {
    Utils.printLog("Hello world!");
    ExactUtils.printLog("Exact Hello world!");
    return <div>Hello world!</div>;
  }
}

export default App;
