import { useState } from "react";

export default function CapData(props) {
  const [inputList, setInputList] = useState([
    {
      month: "",
      rain: "",
      qoth: "",
      qp: "",
    },
  ]);
  const [m, setM] = useState("");
  const [r, setR] = useState("");
  const [Pt, setPt] = useState("");
  const [Sy, setSy] = useState("");
  const [Qout, setQout] = useState("");
  // const [lag_D, setLagD] = useState("");
  // const [lag_length, setLagLength] = useState("");
  const [A, setA] = useState("");

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[i][name] = value;
    setInputList(list);
  };

  const handleAddInput = () => {
    setInputList([...inputList, { month: "", rain: "", qoth: "", qp: "" }]);
  };

  const handleremoveInput = (i) => {
    if (inputList.length <= 1) {
      return null;
    } else {
      const list = [...inputList];
      list.splice(i, 1);
      setInputList(list);
    }
  };

  const captureData = () => {
    if (inputList[0].rain === "") {
      return null;
    } else {
      const n = inputList.length;
      let pTotal = 0;
      inputList.forEach((x) => {
        pTotal += JSON.parse(x.rain);
      });
      let Pav = pTotal / n;
      const data = {
        inputList,
        n,
        m,
        r,
        Pav,
        Pt,
        Sy,
        Qout,
        // lag_D,
        // lag_length,
        A,
      };
      calcFormulars(data);
    }
  };

  const calcFormulars = (data) => {
    let rib = 0;
    let tre = 0;
    let rainfals = [];
    data.inputList.forEach((item) => {
      let firstPart = JSON.parse(data.n - data.m + 1) * JSON.parse(item.rain);
      let seconPart =
        2 -
        (1 / (JSON.parse(data.Pav) * JSON.parse(data.n - data.m))) *
          (JSON.parse(data.n - data.m + 1) * JSON.parse(item.rain));
      let thridPart = JSON.parse(data.n - data.m + 1) * data.Pt;
      let rb = JSON.parse(data.r) * (firstPart - seconPart * thridPart);
      let crd =
        JSON.parse(data.n - data.m + 1) * JSON.parse(item.rain) -
        (2 -
          ((JSON.parse(data.n - data.m + 1) * JSON.parse(item.rain)) /
            JSON.parse(data.Pav)) *
            JSON.parse(data.n - data.m + 1) *
            data.Pt);
      if (item.qoth !== "") {
        let wlf =
          JSON.parse(1 / data.Sy) * rb -
          (JSON.parse(item.qp) +
            JSON.parse(data.Qout) +
            JSON.parse(item.qoth)) /
            (JSON.parse(data.A) * data.Sy);
        let rech =
          wlf -
          wlf * (JSON.parse(data.m) - 1) * JSON.parse(data.Sy) -
          (JSON.parse(item.qp) +
            JSON.parse(data.Qout) +
            JSON.parse(item.qoth) -
            (JSON.parse(item.qp) +
              JSON.parse(data.Qout) +
              JSON.parse(item.qoth))) /
            data.A;
        let DHcrd =
          (JSON.parse(data.r) / JSON.parse(data.Sy)) * crd -
          (JSON.parse(item.qp) + JSON.parse(data.Qout)) /
            (JSON.parse(data.A) * JSON.parse(data.Sy));
        tre += rech;
        rainfals.push({
          month: item.month,
          qp: item.qp,
          qoth: item.qoth,
          qout: data.Qout,
          rib: rb,
          crd: crd,
          rain: item.rain,
          DHrib: wlf,
          recharge: rech,
          DHcrd,
        });
      } else {
        let wlf =
          JSON.parse(1 / data.Sy) * rb -
          (JSON.parse(item.qp) + JSON.parse(data.Qout) + 0) /
            (JSON.parse(data.A) * data.Sy);
        let rech =
          wlf -
          wlf * (JSON.parse(data.m) - 1) * JSON.parse(data.Sy) -
          (JSON.parse(item.qp) +
            JSON.parse(data.Qout) +
            0 -
            (JSON.parse(item.qp) + JSON.parse(data.Qout) + 0)) /
            data.A;
        let DHcrd =
          (JSON.parse(data.r) / JSON.parse(data.Sy)) * crd -
          (JSON.parse(item.qp) + JSON.parse(data.Qout)) /
            (JSON.parse(data.A) * JSON.parse(data.Sy));
        tre += rech;
        rainfals.push({
          month: item.month,
          qp: item.qp,
          qoth: item.qoth,
          qout: data.Qout,
          rib: rb,
          crd: crd,
          rain: item.rain,
          DHrib: wlf,
          recharge: rech,
          DHcrd,
        });
      }
      rib += rb;
    });
    let details = {
      m: data.m,
      Sy: data.Sy,
      r: data.r,
      pt: data.Pt,
      A: data.A,
      Qout: data.Qout,
      tre,
      rainfals,
      rib,
    };
    props.onGetData(details);
  };

  return (
    <section className="cap_main">
      <div className="table">
        <div className="header-grid-container">
          <div className="grid-item1">Month</div>
          <div className="grid-item1">Rain(mm)</div>
          <div className="grid-item1">
            Q<sub>oth</sub>
          </div>
          <div className="grid-item1">
            Q<sub>p</sub>
          </div>
        </div>
        <hr />
        {inputList.map((x, i) => {
          return (
            <span key={i} className="grid-container">
              <input
                type="number"
                name="month"
                value={x.month}
                className="grid-item"
                onChange={(e) => handleChange(e, i)}
              />
              <input
                type="number"
                name="rain"
                value={x.rain}
                className="grid-item"
                onChange={(e) => handleChange(e, i)}
              />
              <input
                type="number"
                name="qoth"
                value={x.qoth}
                className="grid-item"
                onChange={(e) => handleChange(e, i)}
              />
              <input
                type="number"
                name="qp"
                value={x.qp}
                className="grid-item"
                onChange={(e) => handleChange(e, i)}
              />
              <input
                type="button"
                value="+"
                className="grid-item2"
                onClick={handleAddInput}
              />
              <input
                type="button"
                className="grid-item2"
                value="-"
                onClick={() => handleremoveInput(i)}
              />
            </span>
          );
        })}
      </div>

      <div className="row">
        <div className="mycol-md-4">
          <div className="lable">(m=i):=</div>
          <div className="lable">r:=</div>
          <div className="lable">
            P<sub>t</sub>:=
          </div>
          <div className="lable">
            S<sub>y</sub>:=
          </div>
          <div className="lable">A:=</div>
          <div className="lable">
            Q<sub>out</sub>:=
          </div>
          {/* <div className="lable">lag_D:=</div>
          <div className="lable">lag_length:=</div> */}
        </div>
        <div className="col-md-4">
          <input
            className="param-input"
            value={m}
            onChange={(e) => setM(e.target.value)}
          />
          <input
            className="param-input"
            value={r}
            onChange={(e) => setR(e.target.value)}
          />
          <input
            className="param-input"
            value={Pt}
            onChange={(e) => setPt(e.target.value)}
          />
          <input
            className="param-input"
            value={Sy}
            onChange={(e) => setSy(e.target.value)}
          />
          <input
            className="param-input"
            value={A}
            onChange={(e) => setA(e.target.value)}
          />
          <input
            className="param-input"
            value={Qout}
            onChange={(e) => setQout(e.target.value)}
          />
          {/* <input
            className="param-input"
            value={lag_D}
            onChange={(e) => setLagD(e.target.value)}
          />
          <input
            className="param-input"
            value={lag_length}
            onChange={(e) => setLagLength(e.target.value)}
          /> */}
        </div>
        <input
          type="button"
          className="button"
          value="Execute"
          onClick={captureData}
        />
      </div>
      {/* <pre>{JSON.stringify(inputList, null, 2)}</pre> */}
    </section>
  );
}
