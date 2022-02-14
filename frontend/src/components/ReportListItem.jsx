import React from "react";
import './ReportListItem.scss';
import axios from 'axios';
import { ReportContext } from "../contexts/ReportContext";

class ReportListItem extends React.Component {
    static contextType = ReportContext;

    constructor(props) {
        super(props);
        
        this.state = { 
            report: null,
            targetDescription: "",
            targetObject: null,
        };

        this.getReport = this.getReport.bind(this);
        this.handleReportAction = this.handleReportAction.bind(this);
    }

    componentDidMount() {
        this.fetchReportTarget();
    }

    getReport() {
        return this.props.report;
    }

    async handleReportAction(approveReport) {
        await this.context.handleCommitReport(this.getReport(), approveReport);
    }

    fetchReportTarget() { // Gör detta i ReportContext.
        
        const { 
            fetchComment,
            fetchGroup,
            fetchThread,
            fetchMember,
        } = this.context;
        
        let report  = this.getReport();
        let targetTypeString = report.targetType.name;
        let targetId = report.targetId;

        switch(targetTypeString) {
            case "user":
            case "member":
                fetchMember(targetId, member => {
                    const { group, user } = member;
                    // const {  }
                    this.setState({
                        targetObject: member,
                        targetDescription: `Member ${user.username} in group "${group.title}" (ID ${group.id})`
                    })
                });
                break;
            case "comment":
                fetchComment(targetId, comment => {
                    this.setState({ 
                        targetObject: comment,
                        targetDescription: "Comment with ID " + comment.id
                     });
                });
                break;
            case "group":
                fetchGroup(targetId, group => {
                    this.setState({
                        targetObject: group,
                        targetDescription: `Group "${group.title}" with ID ${group.id}`
                    });
                });
                break;
            case "thread":
                fetchThread(targetId, thread => {
                    this.setState({
                        targetObject: thread,
                        targetDescription: `Thread with ID ${thread.id} and title "${thread.title}"`
                    })
                });
                break;
            default:
                break;
        }
    }

    renderAttachment() {
        if(this.getReport().targetType.name === "comment") {
            return this.renderComment();
        }
    }

    renderComment() {
        let commentObject = this.state.targetObject;

        if(commentObject == null) return;

        return (
            <div className="attachment-container">
                <div>Attached comment:</div>
                <div className="attachment">{commentObject.content}</div>
            </div>
        );
        
    }

    render() {
        let report = this.getReport();
        return ( 
            <div className="report-list-item-container">
                <div className="top">
                    <div className="left">
                        <div>Reporter: { report.reporter.username }</div>
                        <div>Target: { this.state.targetDescription }</div>
                        <div>Report description: { report.description }</div>
                    </div>
                    <div className="right">
                        <button className="btn-accept-report" onClick={() => this.handleReportAction(true)}>Approve</button>
                        <button className="btn-reject-report" onClick={() => this.handleReportAction(false)}>Reject</button>
                    </div>
                </div>
                <div className="bottom">
                    { this.renderAttachment() }
                </div>
            </div>
        );
        /* <Observer value={this.props.description} didUpdate={this.getReportTarget} /> */
    }
}
 
export default ReportListItem;