import React from "react";
import moment from "moment";
import { DatePicker } from "antd";
// import Utils from "../utils/index";
//import Utils from "Utils/index";
import Utils from "Utils";
import ExactUtils from "ExactUtils";

class App extends React.Component {
  render() {
    Utils.printLog("Hello world!");
    ExactUtils.printLog("Exact Hello world!");
    return (
      <div>
        Hello world! {moment().format("YYYY-MM-DD HH:mm:ss")}
        <DatePicker
          onChange={(date, dateString) => {
            console.log(date, dateString);
          }}
        />
      </div>
    );
  }
}

export default App;
