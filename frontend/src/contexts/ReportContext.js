import axios from 'axios';
import React, { createContext, Component } from 'react';
import { AuthContext } from './AuthContext';

export const ReportContext = createContext();

class ReportContextProvider extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            reportPopup: {
                targetType: null, // For report popup
                targetId: null,
                visible: false,
            },
            reports: null,
            reportsFetched: false,
        }

        this.getRelevantReports = this.getRelevantReports.bind(this);
        this.approveReport = this.approveReport.bind(this);
        this.terminateUser = this.blacklistMember.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.deleteReport = this.deleteReport.bind(this);
        this.terminateGroup = this.terminateGroup.bind(this);
        this.terminateThread = this.terminateThread.bind(this);
        this.handleCommitReport = this.handleCommitReport.bind(this);
        this.fetchReports = this.fetchReports.bind(this);
        this.fetchComment = this.fetchComment.bind(this);
        this.fetchGroup = this.fetchGroup.bind(this);
        this.fetchThread = this.fetchThread.bind(this);
        this.fetchMember = this.fetchMember.bind(this);
    }

    componentDidMount() {
        this.fetchReports();
    }
 
    fetchReports() {
        const loggedInUser = this.context.loggedInUser;
        if(!loggedInUser) return;

        console.log("Logged in user: " , loggedInUser);

        axios.get(`/reports/relevant/${loggedInUser.id}`)
            .then((response) => {
                this.setState({ reports: response.data});
            });
    }

    componentDidUpdate() {
        if(this.state.reportsFetched === false) {
            if(this.context.loggedInUser) {
                console.log("123 LOGGED IN USER IS: ", this.context.loggedInUser);
                this.setState({ reportsFetched: true });
                this.fetchReports();
            }
        }
    }

    /* 
    ################################################################################
    #   FÖLJANDE FUNKTIONER ÄR INTE DIREKT RELATERADE TILL REPORTS,                #
    #   MEN DE ÄR HÄR ÄNDÅ FÖR ATT JAG VILL KUNNA KOMMA ÅT DEM FRÅN ANDRA STÄLLEN. #
    #   DETTA ÄR LITE SLARVIGT MEN SORRY.... /Philip                               #
    ################################################################################
    */

    fetchMember(memberId, onResponse) {
        axios.get(`/rest/member/${memberId}`)
        .then((response) => {
            onResponse(response.data);
        });
    }

    fetchComment(commentId, onResponse) {
        axios.get(`/rest/comments/${commentId}`)
            .then(response => {
                onResponse(response.data);
            })
    }

    fetchGroup(groupId, onResponse) {
        axios.get(`/rest/groups/getById/${groupId}`)
            .then(response => {
                onResponse(response.data);
            })
    }

    fetchThread(threadId, onResponse) {
        axios.get(`/rest/threads/byId/${threadId}`)
            .then(response => {
                onResponse(response.data);
            })
    }

    showReportPopup = (reportInfo) => {
        this.setState({ 
            reportPopup: {
                targetType: reportInfo.targetType,
                targetId: reportInfo.targetId,
                popupVisible: true
            }
         });
    }

    hideReportPopup = () => {
        this.setState({
            reportPopup: {
                targetType: null,
                targetId: null,
                popupVisible: false
            }
        });
    }

    handleCommitReport(report, approve) {
        // First, ask the user if he/she wants to continue
        if(!window.confirm(`Are you sure you want to ${ approve ? "approve" : "reject" } this report?`)) {
            return; // if the user clicks "no", this function will return/exit.
        }

        if(!approve) {
            // The user doesn't approve the report. Let's delete it and not do anything with the target (blacklist user etc).
            this.deleteReport(report, (deleted) => { // This is a callback. Will be called when report is deleted (or if it couldn't - then deleted will be false)
                if(deleted) {
                    this.fetchReports();
                    alert("The report was deleted.");
                } else {
                    alert("The report could not be deleted.");
                }
            });
        } else {
            this.approveReport(report, (success, message) => {
                if(success) {
                    console.log("Report action performed.");
                    this.deleteReport(report, deleted => {
                        if(deleted) {
                            this.fetchReports();
                            console.log("Report deleted.");
                            alert("Success! Report dealt with: " + message);
                        } else {
                            alert("Report could not be removed but action taken. This should not happen...");
                        }
                    });
                } else {
                    alert("Something went while committing report: " + message);
                }
            });
        }
    }

    /**
     * Returns all the reports that the logged in user is allowed to manage.
     */
    getRelevantReports() {
        console.log(this.state.reports);
        return this.state.reports;
    }

    deleteReport(report, onResponse /* <-- this is a (callback)function that will be called when an answer from backend has arrived. */) {
        axios({
            method: 'delete',
            url: '/report',
            data: {
                id: report.id
            }
        }).then(response => {
            console.log("Response.data == ", response.data);
            if(response.data === true) {
                // Fetch the reports again because the list has changed.
                onResponse(true);
            } else {
                // Could not delete report.
                onResponse(false);
            }
        })
    }
    
    approveReport(report, onResponse) { // Gör detta i ReportContext.
        let targetTypeString = report.targetType.name;
        let targetId = report.targetId;

        switch(targetTypeString) {
            case "user":
            case "member":
                this.blacklistMember(targetId, onResponse);
                break;
            case "comment":
                this.deleteComment(targetId, onResponse);
                break;
            case "group":
                this.terminateGroup(targetId, onResponse);
                break;
            case "thread":
                this.terminateThread(targetId, onResponse);
                break;
            default:
                break;
        }
    }

    blacklistMember(memberId, onResponse) {
        this.fetchMember(memberId, member => {
            axios.post("/rest/member/userToBlacklist", member)
            .then(response => onResponse(response.data !== null, response.data));
        });
    }

    deleteComment(commentId, onResponse) {
        axios.delete(`/rest/comments/${commentId}`)
            .then(response => {
                let success = response.data;
                if(success === true) {
                    onResponse(true, "The comment was deleted.");
                } else {
                    onResponse(false, "The comment could not be deleted. Maybe it already is?");
                }
            });
    }

    terminateGroup(groupId, onResponse) {
        axios.put(`/rest/groups/deleteGroup/${groupId}`)
            .then(response => {
                let deletedGroup = response.data;
                if(deletedGroup.deletionTimestamp) {
                    onResponse(true, "Group terminated.");
                } else {
                    onResponse(false, "Could not terminate group.");
                }
            });
    }

    terminateThread(threadId, onResponse) { // Gör detta i ReportContext.
        axios.put(`/rest/threads/deleteThread/${threadId}`)
            .then(response => {
                let message = response.data;
                if(message.includes("OK")) {
                    onResponse(true, message);
                } else {
                    onResponse(false, "Could not terminate thread.");
                }
            });
    }
    
    render() { 
        return (
            <ReportContext.Provider value={{
                    ...this.state, 
                    showReportPopup: this.showReportPopup, 
                    hideReportPopup: this.hideReportPopup,
                    fetchReports: this.fetchReports,
                    getRelevantReports: this.getRelevantReports,
                    handleCommitReport: this.handleCommitReport,
                    fetchComment: this.fetchComment,
                    fetchGroup: this.fetchGroup,
                    fetchThread: this.fetchThread,
                    fetchMember: this.fetchMember,
                }}>
                {this.props.children}
            </ReportContext.Provider>
        );
    }
}
 
export default ReportContextProvider;