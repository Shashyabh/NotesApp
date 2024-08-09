import React from "react";
import img from "../images/img.png";
import "./RightHomePage.css";
import lock from "../images/lock.png";
const RightHomePage = () => {
	return (
		<div className="mainnDiv">
			<img style={{ width: "490px", height: "250px" }} src={img} alt="" />
			<h1>Pocket Notes</h1>
			<p>
				Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4
				linked devices and 1 mobile phone
			</p>
			<div className="footerPara">
				<div>
					<img className="lockImage" src={lock} alt="" />
				</div>
				<p>end-to-end encrypted</p>
			</div>
		</div>
	);
};

export default RightHomePage;
