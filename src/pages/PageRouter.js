import React from "react";
import PatientIntakeForm from "./PatientIntakeForm";
import FileDownload from "./FileDownload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TermsAndConditionPDF from "./TermAndConditionPDF";

const PageRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/termsAndConditions" component={TermsAndConditionPDF} />
          <Route exact path="/file/:container/:file" component={FileDownload} />
          <Route path="/:hashKey" component={PatientIntakeForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default PageRouter;
