import React from "react";
import axios from "axios";
import './ReportPopup.scss';
import { ReportContext } from "../contexts/ReportContext";

/*
Should use properties from context.
*/

const TYPE_USER = 1;
const TYPE_COMMENT = 2;
const TYPE_GROUP = 3;
const TYPE_THREAD = 4;

const DESCRIPTION_MAX_LENGTH = 500;

class ReportPopup extends React.Component {
  static contextType = ReportContext;

  constructor(props) {
    super(props);
    this.state = {
      description: "",
      targetTypes: null,
      descriptionLength: 0,
      popupShown: false,
      error: {
        isPresent: false,
        description: null
      },
      success: {
        status: false,
        report: null,
      }
      // reporter hämtas med whoAmI i backend.
    };
    // this.hidePopup = this.hidePopup.bind(this);
  }

  componentDidMount() {
    // get all target types
    axios.get("/reports/types")
      .then((response) => this.setState({ targetTypes: response.data}) );
  }

  submitReport = (e) => {
    e.preventDefault();

    let targetType = this.context.targetType;
    let targetId = this.context.targetId;
    let description = this.state.description;
    let loggedUserId = this.props.userObj.id;

    const reportObj = {
      targetType: {
        id: targetType
      },
      targetId: targetId,
      description: description
    }

    function unknownServerError() {
      this.setState({ error: { isPresent: true, description: "An unknown server error occurred when submitting report." } });
    }

    axios.post(`http://localhost:8080/report/${loggedUserId}`, reportObj)
      .catch((error) => {
        console.log("STATE: ", this.state);
        if(error.response) {
          let response = error.response;
          if(response.data && response.data.message) {
            this.setState({ error: { isPresent: true, description: response.data.message } });
          } else {
            unknownServerError();
          }
        } else {
          unknownServerError();
        }
      })
      .then((response) => {
        this.setState({ success: { status: true, report: response.data } });
        console.log("State: ", this.state);
      });
  }

  hidePopup() {
    this.setState({ error: { isPresent: false, description: "" }, success: { status: false, report: null } });
    this.context.hideReportPopup();
  }
  
  targetTypeName(id) {
    let targetTypes = this.state.targetTypes;
    if(targetTypes === null || id === null) return;
    return targetTypes.filter(type => type.id == id)[0].name;
  }

  targetToString() {
    let targetType = this.context.targetType;
    let typeName = this.targetTypeName(targetType);
    let propertyType;

    switch(targetType) {
      case TYPE_USER:
        propertyType = "name";
        break;
      case TYPE_GROUP:
        propertyType = "name";
        break;
      case TYPE_THREAD:
        propertyType = "title";
        break;
      case TYPE_COMMENT:
        propertyType = "id";
        break;
      default:
        propertyType = "unknown";
        break;
    }

    let output = "Report " + typeName;
    return output;
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  descriptionInputSize() {
    let descriptionLength = this.state.description.length;
    return (descriptionLength + "/" + DESCRIPTION_MAX_LENGTH);
  }

  render() {
    const { targetType, targetId, popupVisible } = this.context;

    let errorBox = null;
    let error = this.state.error;
    if(error.isPresent) {
      errorBox = (
        <div id="error-box">
          <div id="error-header">There was an error when submitting the report!</div>
          <div id="error-description">{ error.description }</div>
        </div>
      )
    }

    let successBox = null;
    let successObj = this.state.success;
    if(successObj.status === true) {
      successBox = (
        <div id="success-box">
          Report submitted with ID { successObj.report.id }
        </div>
      )
    }

    if(popupVisible) {
      return (
        <div id="report-popup-container">
          <div id="dialog">
            <div id="dialog-topbar">
              <span id="target"> {this.targetToString()} </span>
              <div id="btn-dialog-exit" onClick={() => this.hidePopup()}>
                X
              </div>
            </div>
            <form id="report-form" onSubmit={this.submitReport}>
                { errorBox }
                { successBox }
                <div id="description-title">Description:</div>
                <textarea id="description-input" type="text" onChange={this.handleDescriptionChange} />
                <div id="description-characters-container">
                  <div id="description-characters">{this.descriptionInputSize()}</div>
                </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ReportPopup;
