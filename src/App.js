import "./App.css";
import "./components/main.css";
import Header from "./components/header";
import CapData from "./components/captureData";
import ShowData from "./components/showData";
import { useState } from "react";

const selctOptions = [
  { value: "data1", lable: "data1" },
  { value: "data2", lable: "data2" },
  { value: "data3", lable: "data3" },
];

function App() {
  const [page, setPage] = useState("showData");
  const [details, setDetails] = useState({});

  const getData = (data) => {
    if (data) {
      setDetails(data);
      setPage("showData");
    }
  };

  const headerOptions = () => {
    if (page === "main") {
      return (
        <div className="header">
          <div className="my-col-md-1">
            <img src="../assets/images/rib.png" height="30px" width="50px" />
          </div>
          <div className="my-col-md-2">RIB CACULATOR</div>
          <div className="my-col-md-3">
            <select
              style={{ width: "30%", borderRadius: "10%" }}
              name="cars"
              id="cars"
              onChange={(e) => console.log(e.target.value)}
            >
              {selctOptions.map((x) => {
                return <option value={x.value}>{x.lable}</option>;
              })}
            </select>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="my-col-md-1">
            <img src="../assets/images/rib.png" height="30px" width="50px" />
          </div>
          <div className="my-col-md-2">RIB DATA</div>
          <div className="my-col-md-3">
            <div className="right-div">
              <i
                className="fa fa-arrow-alt-circle-left"
                style={{ color: "#ccc", fontSize: 25, marginRight: "10%" }}
                type="button"
                onClick={() => setPage("main")}
              />
              <i
                className="fa fa-save"
                style={{ color: "#ccc", fontSize: 25, marginRight: "10%" }}
                type="button"
              />

              <select
                style={{ width: "30%", borderRadius: "10%" }}
                name="cars"
                id="cars"
                onChange={(e) => console.log(e.target.value)}
              >
                {selctOptions.map((x) => {
                  return <option value={x.value}>{x.lable}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <Header options={headerOptions()} />
      {page === "main" ? (
        <CapData onGetData={getData} />
      ) : (
        <ShowData data={details} />
      )}
    </div>
  );
}

export default App;
