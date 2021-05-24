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
          <Route path="/file/:container/:file" component={FileDownload} />
          <Route path="/:hashKey" component={PatientIntakeForm} />
          <Route exact path="/pdfPage" component={TermsAndConditionPDF} />
        </Switch>
      </div>
    </Router>
  );
};

export default PageRouter;
