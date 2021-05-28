import "./main.css";

export default function ShowData(props) {
  return (
    <div className="my-row-mg">
      <div className="my-col-8">
        <div className="my-row-mg">
          <div className="my-col">Month</div>
          <div className="my-col">Rain(mm)</div>
          <div className="my-col">Q<sub>oth</sub></div>
          <div className="my-col">Q<sub>p</sub></div>
          <div className="my-col">dh_obs</div>
          <div className="my-col">dh(crd)</div>
          <div className="my-col">dh(rib)</div>
          <div className="my-col">Re(rib)</div>
        </div>
        <hr />
      </div>
    </div>
  );
  //   <pre>{JSON.stringify(props.data, null, 2)}</pre>;
}
