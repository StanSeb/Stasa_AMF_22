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
  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }

  renderRenderAuthorizedReports(reports) {
    // Renders all reports relevant for the logged in user.

    if(!reports) {
      return;
    }

    /*
    för att visa user report behöver du vara:
    * moderator/groupadmin för gruppen som member är med i
    ATT HÄMTA: member.group

    för att visa group report behöver du vara:
    * superadmin

    för att visa thread report behöver du vara:
    * moderator/groupadmin

    för att visa comment report behöver du vara:
    * moderator/groupadmin
    */

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
      <ReportContext.Consumer>
        {({ reports }) => {
          if(this.context.isLoggedIn) {
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
                { this.renderRenderAuthorizedReports(reports) }
              </div>
            )
          }
        }}
        </ReportContext.Consumer>
    );

  }
}

export default ReportList;
