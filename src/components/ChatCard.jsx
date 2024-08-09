import React from "react";
import "./ChatCard.css";

const getInitials = (name) => {
	if (!name || typeof name !== "string") {
		return "";
	}

	const nameParts = name.trim().split(" ");
	if (nameParts.length === 0) {
		return "";
	}

	if (nameParts.length === 1) {
		return nameParts[0][0].toUpperCase();
	} else {
		const initials = nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
		return initials;
	}
};

const ChatCard = ({ name, icon }) => {
	if (!name || !icon) {
		return null;
	}
	const short = getInitials(name);
	return (
		<div className="main">
			<p className="iconDiv" style={{ backgroundColor: icon }}>
				{short}
			</p>

			<div className="nameDiv">
				<p>{name}</p>
			</div>
		</div>
	);
};

export default ChatCard;
