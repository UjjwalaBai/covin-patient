import React, { useState } from "react";
import PatientChecklist from "./PatientChecklist";
import PatientVitalForm from "./PatientVitalForm";
import Submission from "./Submission";
import * as patientService from "../services/patient";

const PatientVitals = () => {
  const [temperature, setTemperature] = useState("");
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [bpUpperRange, setBpUpperRange] = useState("");
  const [bpLowerRange, setBpLowerRange] = useState("");
  const [page, setPage] = useState(1);
  const [state, setState] = useState({
    feverOrChills: false,
    cough: false,
    difficultyBreathing: false,
    fatigueMuscleOrBodyAches: false,
    headache: false,
    newlossOfTasteOrSmell: false,
    soreThroat: false,
    congestionOrRunnyNose: false,
    nauseaOrVomiting: false,
    diarrhea: false,
    none: false,
  });

  let today = new Date().toLocaleDateString();

  const FOLLOWING_STATUS = {
    pageNum: page,
  };

  const onSubmit = async () => {
    setPage(page + 1);

    await patientService.createPatientIntake({
      appointmentId: "8b4b9415-6d68-4cdd-a6e8-b1ba6b93b822",
      patientId: "d3de6b96-c263-45c3-8e1a-1d687c024bae",
      temperature,
      respiratoryRate: "82",
      bpLowerRange,
      bpUpperRange,
      vitalsMeasureOn: today,
      oxygenLevel,
      pulseRate,
    });
    await patientService.createPatientVitals({
      patientId: "d3de6b96-c263-45c3-8e1a-1d687c024bae",
      form: state,
    });
  };

  const onclose = () => {
    console.log("closed");
  };

  return (
    <div>
      <div className="header-wrapper">
        <div>Name: Amit shah</div>
        <div>Phone: +91982134576</div>
      </div>

      <div className="content-wrapper">
        <div className="form-wrapper">
          {FOLLOWING_STATUS.pageNum === 1 && (
            <PatientChecklist state={state} setState={setState} />
          )}
          {FOLLOWING_STATUS.pageNum === 2 && (
            <PatientVitalForm
              setTemperature={setTemperature}
              setOxygenLevel={setOxygenLevel}
              setPulseRate={setPulseRate}
              setBpUpperRange={setBpUpperRange}
              setBpLowerRange={setBpLowerRange}
            />
          )}
          {FOLLOWING_STATUS.pageNum === 3 && <Submission />}
        </div>

        {FOLLOWING_STATUS.pageNum === 1 ? (
          <button
            className="submit-button"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        ) : FOLLOWING_STATUS.pageNum === 2 ? (
          <button className="submit-button" onClick={onSubmit}>
            Submit
          </button>
        ) : (
          <button className="submit-button" onClick={onclose}>
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default PatientVitals;
