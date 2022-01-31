import React from "react";
import { RULES_TEXTS } from "../texts/RulesTexts";

class RulesPage extends React.Component {

	constructor() {
		super();
		this.state = {
			btnText1: RULES_TEXTS["rules.more"],
			expanded1: false,
			btnText2: RULES_TEXTS["rules.more"],
			expanded2: false,
			btnText3: RULES_TEXTS["rules.more"],
			expanded3: false,
			btnText4: RULES_TEXTS["rules.more"],
			expanded4: false,
			btnText5: RULES_TEXTS["rules.more"],
			expanded5: false,
			btnText6: RULES_TEXTS["rules.more"],
			expanded6: false,
			btnText7: RULES_TEXTS["rules.more"],
			expanded7: false,
			btnText8: RULES_TEXTS["rules.more"],
			expanded8: false,
			btnText9: RULES_TEXTS["rules.more"],
			expanded9: false,
			btnText10: RULES_TEXTS["rules.more"],
			expanded10: false,
			btnText11: RULES_TEXTS["rules.more"],
			expanded11: false
		}
	}

	toggleExpand(index) {
		switch (index) {
			default: {
				console.log("Error");
				break;
			}
			case 1: {
				if (this.state.btnText1 === RULES_TEXTS["rules.more"]) {
					this.setState({ btnText1: RULES_TEXTS["rules.less"] })
				} else {
					this.setState({ btnText1: RULES_TEXTS["rules.more"] })
				}
				this.setState({ expanded1: !this.state.expanded1 });
				break;
			}
			case 2: {
				if (this.state.btnText2 === RULES_TEXTS["rules.more"]) {
					this.setState({ btnText2: RULES_TEXTS["rules.less"] })
				} else {
					this.setState({ btnText2: RULES_TEXTS["rules.more"] })
				}
				this.setState({ expanded2: !this.state.expanded2 });
				break;
			}
			case 3: {
				if (this.state.btnText3 === RULES_TEXTS["rules.more"]) {
					this.setState({ btnText3: RULES_TEXTS["rules.less"] })
				} else {
					this.setState({ btnText3: RULES_TEXTS["rules.more"] })
				}
				this.setState({ expanded3: !this.state.expanded3 });
				break;
			}
			case 4: {
				if (this.state.btnText4 === RULES_TEXTS["rules.more"]) {
					this.setState({ btnText4: RULES_TEXTS["rules.less"] })
				} else {
					this.setState({ btnText4: RULES_TEXTS["rules.more"] })
				}
				this.setState({ expanded4: !this.state.expanded4 });
				break;
			}
			case 5: {
				if (this.state.btnText5 === RULES_TEXTS["rules.more"]) {
					this.setState({ btnText5: RULES_TEXTS["rules.less"] })
				} else {
					this.setState({ btnText5: RULES_TEXTS["rules.more"] })
				}
				this.setState({ expanded5: !this.state.expanded5 });
				break;
			}
			case 6: {
				if (this.state.btnText6 === RULES_TEXTS["rules.more"]) {
					this.setState({ btnText6: RULES_TEXTS["rules.less"] })
				} else {
					this.setState({ btnText6: RULES_TEXTS["rules.more"] })
				}
				this.setState({ expanded6: !this.state.expanded6 });
				break;
			}
			case 7: {
				if (this.state.btnText7 === RULES_TEXTS["rules.more"]) {
					this.setState({ btnText7: RULES_TEXTS["rules.less"] })
				} else {
					this.setState({ btnText7: RULES_TEXTS["rules.more"] })
				}
				this.setState({ expanded7: !this.state.expanded7 });
				break;
			}
			case 8: {
				if (this.state.btnText8 === RULES_TEXTS["rules.more"]) {
					this.setState({ btnText8: RULES_TEXTS["rules.less"] })
				} else {
					this.setState({ btnText8: RULES_TEXTS["rules.more"] })
				}
				this.setState({ expanded8: !this.state.expanded8 });
				break;
			}
			case 9: {
				if (this.state.btnText9 === RULES_TEXTS["rules.more"]) {
					this.setState({ btnText9: RULES_TEXTS["rules.less"] })
				} else {
					this.setState({ btnText9: RULES_TEXTS["rules.more"] })
				}
				this.setState({ expanded9: !this.state.expanded9 });
				break;
			}
			case 10: {
				if (this.state.btnText10 === RULES_TEXTS["rules.more"]) {
					this.setState({ btnText10: RULES_TEXTS["rules.less"] })
				} else {
					this.setState({ btnText10: RULES_TEXTS["rules.more"] })
				}
				this.setState({ expanded10: !this.state.expanded10 });
				break;
			}
			case 11: {
				if (this.state.btnText11 === RULES_TEXTS["rules.more"]) {
					this.setState({ btnText11: RULES_TEXTS["rules.less"] })
				} else {
					this.setState({ btnText11: RULES_TEXTS["rules.more"] })
				}
				this.setState({ expanded11: !this.state.expanded11 });
				break;
			}
		}
	}

	render() {
		return (
			<div className="rulesContainer">
				<div className="rulesTitleContainer">
					{RULES_TEXTS["rules.title"]}
				</div>
				<div className="beforeRegistrationContainer">
					{RULES_TEXTS["accountActivation.title"]}
					{RULES_TEXTS["accountActivation.text"]}
				</div>
				<div className="netEtikettContainer">
					{RULES_TEXTS["netEtikett.title"]}
					{RULES_TEXTS["netEtikett.text"]}
					<div className="paragraphContainer">
						<ul>
							<li>
								{RULES_TEXTS["paragraph1_1.title"]}
								{RULES_TEXTS["paragraph1_1.text"]}
							</li>
							<li>
								{RULES_TEXTS["paragraph1_2.title"]}
								{RULES_TEXTS["paragraph1_2.text"]}
							</li>
							<li>
								{RULES_TEXTS["paragraph1_3.title"]}
								{RULES_TEXTS["paragraph1_3.text"]}
							</li>
							<li>
								{RULES_TEXTS["paragraph1_4.title"]}
								{RULES_TEXTS["paragraph1_4.text"]}
							</li>
							<li>
								{RULES_TEXTS["paragraph1_5.title"]}
								{RULES_TEXTS["paragraph1_5.text"]}
							</li>
							<li>
								{RULES_TEXTS["paragraph1_6.title"]}
								{RULES_TEXTS["paragraph1_6.text"]}
							</li>
							<li>
								{RULES_TEXTS["paragraph1_7.title"]}
								{RULES_TEXTS["paragraph1_7.text"]}
							</li>
							<li>
								{RULES_TEXTS["paragraph1_8.title"]}
								{RULES_TEXTS["paragraph1_8.text"]}
								<button className="moreInfoClick" onClick={() => this.toggleExpand(1)}>{this.state.btnText1}</button>
								<div className="paragraphMoreContainer" style={{ display: this.state.expanded1 ? 'block' : 'none' }}>
									{RULES_TEXTS["paragraph1_8.more"]}
								</div>
							</li>
							<li>
								{RULES_TEXTS["paragraph1_9.title"]}
								{RULES_TEXTS["paragraph1_9.text"]}
							</li>
							<li>
								{RULES_TEXTS["paragraph1_10.title"]}
								{RULES_TEXTS["paragraph1_10.text"]}
							</li>
						</ul>
					</div>
				</div>
				<div className="rulesParagraphContainer">
					{RULES_TEXTS["rulesParagraph.title"]}
					{RULES_TEXTS["rulesParagraph.text"]}
					<div className="paragraphContainer">

						<ul>
							<li>
								{RULES_TEXTS["paragraph2_1.title"]}
								{RULES_TEXTS["paragraph2_1.text"]}
								<button className="moreInfoClick" onClick={() => this.toggleExpand(2)}>{this.state.btnText2}</button>
								<div className="paragraphMoreContainer" style={{ display: this.state.expanded2 ? 'block' : 'none' }}>
									{RULES_TEXTS["paragraph2_1.more"]}
								</div>
							</li>
							<li>
								{RULES_TEXTS["paragraph2_2.title"]}
								{RULES_TEXTS["paragraph2_2.text"]}
								<button className="moreInfoClick" onClick={() => this.toggleExpand(3)}>{this.state.btnText3}</button>
								<div className="paragraphMoreContainer" style={{ display: this.state.expanded3 ? 'block' : 'none' }}>
									{RULES_TEXTS["paragraph2_2.more"]}
								</div>
							</li>
							<li>
								{RULES_TEXTS["paragraph2_3.title"]}
								{RULES_TEXTS["paragraph2_3.text"]}
								<button className="moreInfoClick" onClick={() => this.toggleExpand(4)}>{this.state.btnText4}</button>
								<div className="paragraphMoreContainer" style={{ display: this.state.expanded4 ? 'block' : 'none' }}>
									{RULES_TEXTS["paragraph2_3.more"]}
								</div>
							</li>
							<li>
								{RULES_TEXTS["paragraph2_4.title"]}
								{RULES_TEXTS["paragraph2_4.text"]}
								<button className="moreInfoClick" onClick={() => this.toggleExpand(5)}>{this.state.btnText5}</button>
								<div className="paragraphMoreContainer" style={{ display: this.state.expanded5 ? 'block' : 'none' }}>
									{RULES_TEXTS["paragraph2_4.more"]}
								</div>
							</li>
							<li>
								{RULES_TEXTS["paragraph2_5.title"]}
								{RULES_TEXTS["paragraph2_5.text"]}
								<button className="moreInfoClick" onClick={() => this.toggleExpand(6)}>{this.state.btnText6}</button>
								<div className="paragraphMoreContainer" style={{ display: this.state.expanded6 ? 'block' : 'none' }}>
									{RULES_TEXTS["paragraph2_5.more"]}
								</div>
							</li>
							<li>
								{RULES_TEXTS["paragraph2_6.title"]}
								{RULES_TEXTS["paragraph2_6.text"]}
								<button className="moreInfoClick" onClick={() => this.toggleExpand(7)}>{this.state.btnText7}</button>
								<div className="paragraphMoreContainer" style={{ display: this.state.expanded7 ? 'block' : 'none' }}>
									{RULES_TEXTS["paragraph2_6.more"]}
								</div>
							</li>
							<li>
								{RULES_TEXTS["paragraph2_7.title"]}
								{RULES_TEXTS["paragraph2_7.text"]}
								<button className="moreInfoClick" onClick={() => this.toggleExpand(8)}>{this.state.btnText8}</button>
								<div className="paragraphMoreContainer" style={{ display: this.state.expanded8 ? 'block' : 'none' }}>
									{RULES_TEXTS["paragraph2_7.more"]}
								</div>
							</li>
							<li>
								{RULES_TEXTS["paragraph2_8.title"]}
								{RULES_TEXTS["paragraph2_8.text"]}
								<button className="moreInfoClick" onClick={() => this.toggleExpand(9)}>{this.state.btnText9}</button>
								<div className="paragraphMoreContainer" style={{ display: this.state.expanded9 ? 'block' : 'none' }}>
									{RULES_TEXTS["paragraph2_8.more"]}
								</div>
							</li>
							<li>
								{RULES_TEXTS["paragraph2_9.title"]}
								{RULES_TEXTS["paragraph2_9.text"]}
								<button className="moreInfoClick" onClick={() => this.toggleExpand(10)}>{this.state.btnText10}</button>
								<div className="paragraphMoreContainer" style={{ display: this.state.expanded10 ? 'block' : 'none' }}>
									{RULES_TEXTS["paragraph2_9.more"]}
								</div>
							</li>
							<li>
								{RULES_TEXTS["paragraph2_10.title"]}
								{RULES_TEXTS["paragraph2_10.text"]}
								<button className="moreInfoClick" onClick={() => this.toggleExpand(11)}>{this.state.btnText11}</button>
								<div className="paragraphMoreContainer" style={{ display: this.state.expanded11 ? 'block' : 'none' }}>
									{RULES_TEXTS["paragraph2_10.more"]}
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className="miscContainer">
					{RULES_TEXTS["misc.title"]}
					<div className="paragraphContainer">
						<ul>
							<li>
								{RULES_TEXTS["paragraph3_1.title"]}
								{RULES_TEXTS["paragraph3_1.text"]}
							</li>
							<li>
								{RULES_TEXTS["paragraph3_2.title"]}
								{RULES_TEXTS["paragraph3_2.text"]}
							</li>
							<li>
								{RULES_TEXTS["paragraph3_3.title"]}
								{RULES_TEXTS["paragraph3_3.text"]}
							</li>
						</ul>
					</div>
				</div>
				<footer>
					{RULES_TEXTS["footer.text"]}
				</footer>
			</div >
		);
	}
}

export default RulesPage;