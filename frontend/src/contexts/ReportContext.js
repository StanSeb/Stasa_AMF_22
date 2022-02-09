import React, { createContext, Component } from 'react';

export const ReportContext = createContext();

class ReportContextProvider extends Component {
    state = { 
        targetType: null,
        targetId: null,
        popupVisible: false
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
    }
    
    render() { 
        return (
            <ReportContext.Provider value={{
                    ...this.state, 
                    showReportPopup: this.showReportPopup, 
                    hideReportPopup: this.hideReportPopup
                }}>
                {this.props.children}
            </ReportContext.Provider>
        );
    }
}
 
export default ReportContextProvider;