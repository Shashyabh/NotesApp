import React, { useEffect, useState } from "react";
import "./HomePage.css";
import ChatCard from "./ChatCard";
import NotesDetails from "./NotesDetails";
import RightHomePage from "./RightHomePage";

const HomePage = () => {
	const [allNotes, setAllNotes] = useState(() => {
		const savedNotes = localStorage.getItem("allNotes");
		return savedNotes ? JSON.parse(savedNotes) : [];
	});

	const [notesDataToSend, setNotesDataToSend] = useState(null);
	const [selectedCardBG, setSelectedCardBG] = useState(null);

	const [showNotesPage, setShowNotesPage] = useState(true);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [input, setInput] = useState({
		groupName: "",
		groupColor: "",
	});

	const createNewNotes = () => {
		setIsPopupOpen(true);
	};

	// const openPopup = () => setIsPopupOpen(true);
	const closePopup = () => setIsPopupOpen(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newNote = { name: input.groupName, color: input.groupColor };
		setAllNotes((prevNotes) => [...prevNotes, newNote]);
		setInput({ groupName: "" });
		closePopup();
	};

	useEffect(() => {
		localStorage.setItem("allNotes", JSON.stringify(allNotes));
	}, [allNotes]);

	//Notes card clicked & show the all notes
	const handleClickOnNotesCard = (item, i) => {
		setShowNotesPage(false);
		setNotesDataToSend(item);
		setSelectedCardBG(i);
	};
	const handleBackToHomePage = () => {
		setShowNotesPage(true);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			const popupElement = document.querySelector(".popupContent");
			if (popupElement && !popupElement.contains(event.target) && isPopupOpen) {
				closePopup();
			}
		};

		// Add event listener to detect clicks outside the popup
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Clean up the event listener when the component unmounts
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isPopupOpen]); // handleClickOutside is now defined inside useEffect

	return (
		<div className="first">
			{/* Left segment */}

			<div className="left">
				<div className="pocketNotes">
					<h1>Pocket Notes</h1>
				</div>

				<div
					className={`${showNotesPage ? "notesCreateButton" : "notesCreateButtonDis"}`}
					onClick={createNewNotes}
				>
					<div className="plusIcon">+</div>
				</div>

				<div className="chatCard">
					{allNotes.length >= 1 &&
						allNotes.map((item, i) => (
							<div
								key={i}
								style={{
									backgroundColor: selectedCardBG === i ? "#2F2F2F2B" : "white",
									cursor: "pointer",
									borderRadius: "20px",
									width: "100%",
								}}
								onClick={() => handleClickOnNotesCard(item, i)}
							>
								<ChatCard key={i} name={item?.name} icon={item?.color} />
							</div>
						))}
				</div>
			</div>

			{/* Right segment */}

			<div className={`${showNotesPage ? "rightHomePage" : "right"}`}>
				{showNotesPage ? (
					<RightHomePage />
				) : (
					<NotesDetails onBack={handleBackToHomePage} item={notesDataToSend} />
				)}
			</div>

			{isPopupOpen && (
				<form className="popupOverlay" onSubmit={handleSubmit}>
					<div className="popupContent">
						<span className="popupHeading">Create New Notes group</span>
						<label>
							Group Name
							<input
								className="groupNameInput"
								type="text"
								placeholder="Enter your group name...."
								value={input.groupName}
								onChange={(e) =>
									setInput((prev) => ({ ...prev, groupName: e.target.value }))
								}
							/>
						</label>
						<div className="radioInput">
							<p>Choose colour</p>
							<input
								type="radio"
								name="color"
								className="radioButton"
								id="radio-1"
								value="#B38BFA"
								checked={input.groupColor === "#B38BFA"}
								onChange={(e) =>
									setInput((prev) => ({ ...prev, groupColor: e.target.value }))
								}
							/>
							<label
								style={{ backgroundColor: "#B38BFA" }}
								htmlFor="radio-1"
								className="label"
							></label>
							<input
								type="radio"
								name="color"
								className="radioButton"
								id="radio-2"
								value="#FF79F2"
								checked={input.groupColor === "#FF79F2"}
								onChange={(e) =>
									setInput((prev) => ({ ...prev, groupColor: e.target.value }))
								}
							/>
							<label
								style={{ backgroundColor: "#FF79F2" }}
								htmlFor="radio-2"
								className="label"
							></label>
							<input
								type="radio"
								name="color"
								className="radioButton"
								id="radio-3"
								value="#43E6FC"
								checked={input.groupColor === "#43E6FC"}
								onChange={(e) =>
									setInput((prev) => ({ ...prev, groupColor: e.target.value }))
								}
							/>
							<label
								style={{ backgroundColor: "#43E6FC" }}
								htmlFor="radio-3"
								className="label"
							></label>
							<input
								type="radio"
								name="color"
								className="radioButton"
								id="radio-4"
								value="#F19576"
								checked={input.groupColor === "#F19576"}
								onChange={(e) =>
									setInput((prev) => ({ ...prev, groupColor: e.target.value }))
								}
							/>
							<label
								style={{ backgroundColor: "#F19576" }}
								htmlFor="radio-4"
								className="label"
							></label>
							<input
								type="radio"
								name="color"
								className="radioButton"
								id="radio-5"
								value="#0047FF"
								checked={input.groupColor === "#0047FF"}
								onChange={(e) =>
									setInput((prev) => ({ ...prev, groupColor: e.target.value }))
								}
							/>
							<label
								style={{ backgroundColor: "#0047FF" }}
								htmlFor="radio-5"
								className="label"
							></label>
							<input
								type="radio"
								name="color"
								className="radioButton"
								id="radio-6"
								value="#6691FF"
								checked={input.groupColor === "#6691FF"}
								onChange={(e) =>
									setInput((prev) => ({ ...prev, groupColor: e.target.value }))
								}
							/>
							<label
								style={{ backgroundColor: "#6691FF" }}
								htmlFor="radio-6"
								className="label"
							></label>
						</div>

						<button type="submit">Create</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default HomePage;
