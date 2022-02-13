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
        let loggedInUser = this.context.loggedInUser;
        let targetType = this.props.targetType;

        if(!loggedInUser) {
            // Don't show report button if user is not logged in.
            return null;
        }

        // Target is a comment
        if(targetType === 2) {
            let messageObject = this.props.targetObj;

            // Don't show button if comment creator is logged in user.
            if(messageObject.creatorId === loggedInUser.id) {
                return null;
            }
        } else if(targetType === 3) {
            // Target is a group.
            const groupObject = this.props.targetObj;

            // Don't show button if logged in user is group owner.
            if(groupObject.user_id === loggedInUser.id) {
                return null;
            }
        }

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
