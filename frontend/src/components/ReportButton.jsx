import React from "react";
import './ReportListItem.scss';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import { ReportContext } from "../contexts/ReportContext";

class ReportButton extends React.Component {
    static contextType = AuthContext;
    
    constructor(props) {
        /*
        props: report
            
        */
        super(props);
        this.handleReport = this.handleReport.bind(this);
        this.getText = this.getText.bind(this);
    }

     componentDidMount() {
        // this.fetchReportTarget();
    }

    handleReport(showReportPopup) {

        let targetType = this.props.targetType;
        let targetId = this.props.targetId;

        showReportPopup({
            targetType: targetType,
            targetId: targetId
        });
    }

    getText() {
        let customText = this.props.customText;
        if(customText) {
            return customText;
        } else {
            return "Report";
        }
    }

    render() {
        return (
            <ReportContext.Consumer>{(context => {
                const { showReportPopup } = context;
                return (
                    <button onClick={() => this.handleReport(showReportPopup)}>{ this.getText() }</button>
                );
            })}
            </ReportContext.Consumer>
        );
    }
}

export default ReportButton;
