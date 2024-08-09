import React, { useEffect, useState } from "react";
import "./NotesDetails.css";
import ChatCard from "./ChatCard";
import btn from "../images/btn.png";
import arrow from "../images/arrow.png";
import "./ChatCard.css";

const NotesDetails = ({ item, onBack }) => {
	const [notes, setNotes] = useState(() => {
		const savedNotes = localStorage.getItem(`notes_${item?.name}`);
		return savedNotes ? JSON.parse(savedNotes) : [];
	});
	const [input, setInput] = useState({ content: "" });

	useEffect(() => {
		if (item?.name) {
			const savedNotes = localStorage.getItem(`notes_${item.name}`);
			//console.log("1st Use Effect" + savedNotes);
			if (savedNotes) {
				//console.log("1st Use Effect" + savedNotes);
				setNotes(JSON.parse(savedNotes));
			} else {
				setNotes([]);
			}
		}
	}, [item?.name]);

	useEffect(() => {
		if (item?.name) {
			//const savedNotes = localStorage.getItem(`notes_${item.name}`);
			// console.log("2nd Use Effect" + savedNotes);
			localStorage.setItem(`notes_${item.name}`, JSON.stringify(notes));
		}
	}, [notes, item?.name]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const now = new Date();
		const formattedDate = now.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
		const formattedTime = now.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
		var newNote = {};

		if (input.content === "") {
			return null;
		} else {
			newNote = {
				date: formattedDate,
				time: formattedTime,
				content: input.content,
			};
		}

		//console.log("Notes" + newNote);
		setNotes((prevNotes) => {
			const updatedNotes = [...prevNotes, newNote];
			console.log("updatedNotes" + updatedNotes);
			localStorage.setItem(`notes_${item.name}`, JSON.stringify(updatedNotes));
			return updatedNotes;
		});
		setInput({ content: "" });
	};

	const handleBackForm = () => {
		onBack();
	};

	return (
		<div className="mainDiv">
			<div className="navDiv">
				<img onClick={handleBackForm} className="arrowImg" src={arrow} alt="" />
				<div>
					<ChatCard name={item?.name} icon={item?.color} />
				</div>
			</div>
			<div className="contentDiv">
				{notes.length != 0 &&
					notes.map((note, i) => (
						<div key={i} className="card">
							<div className="content">{note.content}</div>
							<div className="dateAndTime">
								<div>{note.date}</div>
								<div className="circleDot"></div>
								<div>{note.time}</div>
							</div>
						</div>
					))}
			</div>

			<div className="inputDiv">
				<img
					onClick={handleSubmit}
					className={`${input.content.length == 0 ? "submitButtonDisable" : "submitButton"}`}
					src={btn}
					alt="Submit"
				/>
				<textarea
					className="textArea"
					placeholder="Enter your text here..........."
					value={input.content}
					onChange={(e) => setInput({ content: e.target.value })}
					rows={6}
					cols={89}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							handleSubmit(e);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default NotesDetails;
