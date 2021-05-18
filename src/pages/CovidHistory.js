import { MINIMUM_YEAR, DATE_FORMAT } from "../constants/constants";
import React, { useState } from "react";
import "../App.css";
import "./home.css";
import yes from "../assets/images/yes.svg";
import no from "../assets/images/no.svg";
const moment = require("moment");

const CovidHistory = ({
  covidHistory,
  setIntakeState,
  intakeState,
  setPage,
  page,
}) => {
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [isDiagnosed, setDiagnosed] = useState(false);

  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const item = event.target.value;
    item === "none"
      ? setIntakeState({ ...intakeState, [item]: !isChecked })
      : setIntakeState({ ...intakeState, [item]: isChecked });

    if (item === "covidVaccinationDose1Taken") {
      setCheckedOne(isChecked);
    } else if (item === "covidVaccinationDose2Taken") {
      setCheckedTwo(isChecked);
    }
  };

  const onNext = () => {
    const currentYear = parseInt(moment().year());
    const minimumYear = currentYear - MINIMUM_YEAR;
    const dose1Year = parseInt(
      moment(intakeState.dateOfDose1Vaccination).year()
    );
    const dose2Year = parseInt(
      moment(intakeState.dateOfDose2Vaccination).year()
    );
    if (
      dose1Year > currentYear ||
      dose2Year > currentYear ||
      dose1Year < minimumYear ||
      dose2Year < minimumYear
    ) {
      return;
    }
    setPage(page + 1);
  };

  const yesDiagnosed =() =>{
    setDiagnosed(true)
  }

  const notDiagnosed =() =>{
    setDiagnosed(false)
  }

  return (
    <div className="form-content-wrapper">
      {/* <div className="page-title">Covid History</div> */}
      <div className="covid-diagnosed">
        <div className="covid-tittle">Have you ever been diagnosed positive for COVID?</div>
        <div className="covid-buttons">
          <button 
            className="yes-diagnosed covid-button"
            onClick={yesDiagnosed}
          >
            <img className="button-img" src={yes} alt="tick"></img>
            Yes
          </button>
          <button 
            className="not-diagnosed covid-button"
            onClick={notDiagnosed}
            >
              <img className="button-img" src={no} alt="cross"></img>
              No
          </button>
        </div>
        {isDiagnosed && 
          <div className="date-diagnosed">
            <label>Date of diagnosis</label>
            <input
            className="date-of-diagnosis"
            type="date"
            placeholder="Select date of diagnosis"
            />
          </div>
        }
      </div>
      <div className="health-checklist">
        {covidHistory.map((history, indx) => {
          return (
            <div
              className={
                `${history.type}` === "Boolean"
                  ? "history-list-content"
                  : "input-history"
              }
              key={indx}
            >
              {history.type === "Text" && <label>{history.title}</label>}
              {history.type === "Text" ? (
                <input
                  type="date"
                  id={indx}
                  name={history.field}
                  onChange={handleInputChange}
                  max={moment().format(DATE_FORMAT.yyyymmdd)}
                  disabled={
                    `${history.field}` === "dateOfDose1Vaccination"
                      ? !checkedOne
                      : !checkedTwo
                  }
                />
              ) : (
                <input
                  className="symptoms-checkbox"
                  type="checkbox"
                  id={indx}
                  value={history.field}
                  onChange={handleCheckboxChange}
                />
              )}
              {history.type === "Boolean" && (
                <label for={history.field}>{history.title}</label>
              )}
            </div>
          );
        })}
      </div>
      <button className="submit-button submit-btn" onClick={onNext}>
        NEXT
      </button>
    </div>
  );
};

export default CovidHistory;
