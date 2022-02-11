import React from "react";
import './ReportListItem.scss';
import axios from 'axios';

class ReportListItem extends React.Component {
    constructor(props) {
        super(props);
        this.getReport = this.getReport.bind(this);
        this.handleReportAction = this.handleReportAction.bind(this);
        this.deleteReport = this.deleteReport.bind(this);
        this.approveReport = this.approveReport.bind(this);
        this.terminateUser = this.terminateUser.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.terminateGroup = this.terminateGroup.bind(this);
        this.terminateThread = this.terminateThread.bind(this);
    }

    state = { 
        report: null,
        targetDescription: "",
        targetObject: null,
     };

    componentDidMount() {
        this.fetchReportTarget();
    }

    getReport() {
        return this.props.report;
    }

    handleReportAction(approveReport) {

        if(!window.confirm(`Are you sure you want to ${ approveReport ? "approve" : "reject" } this report?`)) {
            return;
        }

        if(!approveReport) {
            // Delete the report
            if(this.deleteReport()) {
                alert("The report was deleted.");
            } else {
                alert("The report could not be deleted.");
            }
        } else {
            this.approveReport();
        }

    }

    deleteReport() {
        axios({
            method: 'delete',
            url: '/report',
            data: {
                id: this.getReport().id
            }
        }).then(response => {
            if(response.data === true) {
                window.location.reload();
                return true;
            } else {
                window.location.reload();
                return false;
            }
        })
    }

    approveReport() {
        let report = this.getReport();
        let targetTypeString = report.targetType.name;
        let targetId = report.targetId;

        switch(targetTypeString) {
            case "user":
                this.terminateUser(targetId);
                break;
            case "comment":
                this.deleteComment(targetId);
                break;
            case "group":
                this.terminateGroup(targetId);
                break;
            case "thread":
                this.terminateThread(targetId);
                break;
            default:
                break;
        }
        
    }

    terminateUser(userId) {
        axios.put(`/auth/terminateUser/${userId}`)
            .then(response => {
                let message = response.data;
                if(message.includes("avstängd")) {
                    alert("User terminated.");
                    this.deleteReport();
                } else {
                    alert("Could not terminate user. Reason: " + message);
                }
            });
    }

    deleteComment(commentId) {
        axios.delete(`/rest/comments/${commentId}`)
            .then(response => {
                let success = response.data;
                if(success === true) {
                    alert("Comment deleted.");
                    this.deleteReport();
                } else {
                    alert("Could not Delete comment.");
                }
            });
    }

    terminateGroup(groupId) {
        axios.put(`/rest/groups/deleteGroup/${groupId}`)
            .then(response => {
                let deletedGroup = response.data;
                if(deletedGroup.deletionTimestamp) {
                    alert("Group terminated.");
                    this.deleteReport();
                } else {
                    alert("Could not terminate group.");
                }
            });
    }

    terminateThread(threadId) {
        axios.put(`/rest/threads/deleteThread/${threadId}`)
            .then(response => {
                let message = response.data;
                if(message.includes("OK")) {
                    alert("Thread terminated.");
                    this.deleteReport();
                } else {
                    alert("Could not terminate thread.");
                }
            });
    }

    fetchReportTarget() {
        let report  = this.getReport();
        let targetTypeString = report.targetType.name;
        let targetId = report.targetId;

        switch(targetTypeString) {
            case "user":
                this.fetchUser(targetId);
                break;
            case "comment":
                this.fetchComment(targetId);
                break;
            case "group":
                this.fetchGroup(targetId);
                break;
            case "thread":
                this.fetchThread(targetId);
                break;
            default:
                break;
        }
    }

    fetchUser(userId) {
        axios.get(`/rest/users/${userId}`)
            .then((response) => {
                this.setState({ 
                    targetObject: response.data,
                    targetDescription: "User " + response.data.username
                 });
            });
    }

    fetchComment(commentId) {
        axios.get(`/rest/comments/${commentId}`)
            .then(response => {
                this.setState({ 
                    targetObject: response.data,
                    targetDescription: "Comment with ID " + response.data.id
                 });
            })
    }

    fetchGroup(groupId) {
        axios.get(`/rest/groups/getById/${groupId}`)
            .then(response => {
                let group = response.data;
                this.setState({
                    targetObject: group,
                    targetDescription: `Group with ID ${group.id} and title "${group.title}"`
                });
            })
    }

    fetchThread(threadId) {
        axios.get(`/rest/threads/byId/${threadId}`)
            .then(response => {
                let thread = response.data;
                this.setState({
                    targetObject: response.data,
                    targetDescription: `Thread with ID ${thread.id} and title "${thread.title}"`
                })
            })
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
                        <button className="btn-accept-report" onClick={() => this.handleReportAction(true)}>Accept</button>
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