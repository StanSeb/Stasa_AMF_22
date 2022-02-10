import axios from 'axios';
import React, { createContext, Component } from 'react';

export const ReportContext = createContext();

class ReportContextProvider extends Component {
    state = { 
        targetType: null,
        targetId: null,
        popupVisible: false,
        reports: null,
    }

    componentDidMount() {
        this.fetchReports();
    }

    showReportPopup = (reportInfo) => {
        this.setState({ 
            targetType: reportInfo.targetType,
            targetId: reportInfo.targetId,
            popupVisible: true
         });
    }

    hideReportPopup = () => {
        this.setState({
            targetType: null,
            targetId: null,
            popupVisible: false
        });
        // För att om det skapats en ny reports så behöver den hämtas
        this.fetchReports();
    }

    fetchReports() {
        axios.get("/reports")
            .then((response) => {
                this.setState({ reports: response.data});
                console.log(this.state.reports);
            } );
    }
    
    render() { 
        return (
            <ReportContext.Provider value={{
                    ...this.state, 
                    showReportPopup: this.showReportPopup, 
                    hideReportPopup: this.hideReportPopup,
                    fetchReports: this.fetchReports,
                }}>
                {this.props.children}
            </ReportContext.Provider>
        );
    }
}
 
export default ReportContextProvider;