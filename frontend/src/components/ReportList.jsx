import React from "react";
import { ReportContext } from "../contexts/ReportContext";
import ReportListItem from "./ReportListItem";
import './ReportList.scss';
import { AuthContext } from "../contexts/AuthContext";
import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";

/*
Should use properties from context.
*/

const TYPE_USER = 1;
const TYPE_COMMENT = 2;
const TYPE_GROUP = 3;
const TYPE_THREAD = 4;

const DESCRIPTION_MAX_LENGTH = 500;

class ReportList extends React.Component {
  static contextType = ReportContext;

  constructor(props) {
    super(props);
  }

  renderReportItems() {
    // ONLY RENDER THE REPORTS THAT ARE RELEVANT FOR THE USER!

    let reports = this.context.reports;

    if(reports) {
        let reportElements = new Array();

        for(let report of reports) {
            reportElements.push(<ReportListItem key={report.id} report={report} />);
        }
        return reportElements;
    }
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ isLoggedIn }) => {
          if(isLoggedIn) {

            const { reports } = this.context;

            if(!reports || reports.length === 0) {
              return (
                <div id="report-list-container">
                  <div>There are no reports to show.</div>
                </div>
              );
            }

            return (
              <div id="report-list-container">
                Here are all the reports!
                { this.renderReportItems() }
              </div>
            )
          }
        }}
        </AuthContext.Consumer>
    );

  }
}

export default ReportList;
