import React from "react";
import { INTEGRITY_TEXTS } from "../texts/IntegrityTexts";

class IntegrityPage extends React.Component {

	render() {
		return (
			<div className="integrityContainer">
				<div className="integrityTitleContainer">
					{INTEGRITY_TEXTS["integrity.title"]}
					<div className="textContainer">
						{INTEGRITY_TEXTS["integrity.text"]}
					</div>
				</div>
				<div className="integritySubContainer">
					{INTEGRITY_TEXTS["userGenerated.title"]}
					<div className="textContainer">
						{INTEGRITY_TEXTS["userGenerated.text"]}
					</div>
				</div>
				<div className="integritySubContainer">
					{INTEGRITY_TEXTS["rights.title"]}
					<div className="textContainer">
						{INTEGRITY_TEXTS["rights.text"]}
					</div>
				</div>
			</div>
		);
	}
}

export default IntegrityPage;