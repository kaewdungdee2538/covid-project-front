import "./BodyFormComponent.css";
import DateLabelComponent from "../date-label/DateLabelComponent";
import HorizontalGraph from "../graph/horizontal-graph/HorizontalGraph";
import useInterval from "../../utils/interval/useInterval";
import { useState, useEffect } from "react";
import { getCovidRecordAll } from "../../utils/api/get_record/get_record_api";
import CalculateGrapthWidthPercent from "../../utils/api/calculate_width/calculate_width_percent";
import {getColorForCountry} from '../../utils/api/get_color/get_color_for_country'
import swal from "sweetalert";
import moment from "moment";
function BodyFormComponent(props) {
  const dateStart = moment("2021-02-28").format("YYYY-MM-DD");
  const [widthInput, setWidthInput] = useState(1);
  const [currentDate, setCurrentDate] = useState(dateStart);
  const [covidObj, setCovidObj] = useState(null);
  let horizontalGraph = null;
  useEffect(() => {
    getCovidData();
  }, []);
  //-----------Interval
  useInterval(() => {
    getCovidData();
  }, 1500);
  //------------get Covid Data
  async function getCovidData() {
    getCovidRecordAll({ currentDate })
      .then((res) => {
        if (res.result) {
          const result = res.result;
          setCovidObj(result);
        } else if (res.statusCode === 401) {
        } else swal("Warning!", res.error, "warning");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((value) => {
        document.body.style.cursor = "default";
        setNewDate();
      });
  }
  //------------Set Date
  function setNewDate() {
    if (moment(currentDate) >= moment("2021-03-31")) {
      setCurrentDate(dateStart);
    } else {
      setCurrentDate(moment(currentDate).add(1, "day").format("YYYY-MM-DD"));
    }
  }
  //------------------------Set Date
  let dateLabelComponent = null;
  if (currentDate) {
    dateLabelComponent = (
      <DateLabelComponent
        inputText={moment(currentDate).format("DD/MM/YYYY")}
      />
    );
  }
  //-------------------------Set graph

  if (covidObj) {
    let indexKey = 0;
    horizontalGraph = covidObj.map((item) => {
      const percent = CalculateGrapthWidthPercent(
        covidObj[0].cases,
        item.cases
      );
      indexKey++;
      return (
        <HorizontalGraph
          key={Date.now.toString() + indexKey}
          textInput={`${item.country} ${item.cases}`}
          widthInput={percent + "%"}
          colorInput={getColorForCountry(item.country)}
        />
      );
    });
  }
  //-------------------------------Reponse from
  return (
    <div className="body-app" key={Date.now.toString()}>
      <div className="body-contain">
        {dateLabelComponent}
        <div className="item-contain">{horizontalGraph}</div>
      </div>
    </div>
  );
}

export default BodyFormComponent;
