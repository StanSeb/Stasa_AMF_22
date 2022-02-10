import React from "react";
import { ReportContext } from "../contexts/ReportContext";
import ReportListItem from "./ReportListItem";
import './ReportList.scss';

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
    this.state = {
    };
  }

  componentDidMount() {
  }

  renderReportItems() {
    let reports = this.context.reports;

    if(reports != null) {
        let reportElements = new Array();

        for(let report of reports) {
            reportElements.push(<ReportListItem key={report.id} report={report} />);
        }
        return reportElements;
    }
  }

  render() {
    const { fetchReports, reports } = this.context;

    console.log("REPORTS:", reports);

    return (
        <div id="report-list-container">
            { this.renderReportItems() }
        </div>
    );

  }
}

export default ReportList;
