import React from "react";

class Thread extends React.Component {
	render() {
		return (
			<div className="thread">
				<div className="threadHeader">
					<span className="threadTitle">Title</span>
					<span>/Username</span>
				</div>
				<div className="threadMain">
					<div>
						<span>Contents</span>
					</div>
				</div>
				<div className="threadFooter">
					<div className="threadSocialButtons">
						<button>Like</button>
						<button>Dislike</button>
						<button>Share</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Thread;
