const url = "http://localhost:3000";
const noteToken = localStorage.getItem("noteToken");

if (!noteToken) {
  window.location.href = "login.html";
}
const mainContainer = document.getElementById("main-container");
const notesContainer = document.getElementById("notes-container");
const notesDataContainer = document.getElementById("notes-data-container");
const loader = document.createElement("div");

document.addEventListener("DOMContentLoaded", function () {
  loader.classList.add("loader");
  document.body.appendChild(loader);
  notesContainer.classList.add("hide");
  const options = {
    method: "GET",
    headers: {
      "auth-token": noteToken,
    },
  };

  const fetchNotes = async () => {
    const res = await fetch(`${url}/api/note/get-notes`, options);
    const { notes: notesData } = await res.json();
    console.log(notesData);
    loader.remove();
    if (notesData.length === 0) {
      const empty = document.createElement("h2");
      empty.style.textAlign = "center !important";
      empty.textContent = "Notes are empty!";
      mainContainer.appendChild(empty);
    } else {
      notesContainer.classList.remove("hide");

      for (let i = 0; i < notesData.length; i++) {
        const { title, notes, _id, tags } = notesData[i];

        const cardListItem = document.createElement("li");
        cardListItem.id = _id;
        cardListItem.classList.add("card");

        const cardDetailsDiv = document.createElement("div");
        cardDetailsDiv.classList.add("card-details");

        const cardTitleParagraph = document.createElement("p");
        cardTitleParagraph.classList.add("text-title");
        cardTitleParagraph.textContent = title; // Set the title text

        const cardBodyParagraph = document.createElement("p");
        cardBodyParagraph.classList.add("text-body");
        cardBodyParagraph.textContent = notes;

        const deleteButton = document.createElement("button");
        const handleNoteDelete = async (id) => {
          console.log(id);
          const options = {
            method: "DELETE",
          };
          const res = await fetch(`${url}/api/note/delete-note/${id}`, options);
          const { msg } = await res.json();
          if (res.ok === true) {
            alert(msg);
            window.location.reload();
          }
        };

        deleteButton.addEventListener("click", () => handleNoteDelete(_id));
        deleteButton.classList.add("card-button");
        deleteButton.textContent = "Delete";

        cardDetailsDiv.appendChild(cardTitleParagraph);
        cardDetailsDiv.appendChild(cardBodyParagraph);
        cardListItem.appendChild(deleteButton);
        cardListItem.appendChild(cardDetailsDiv);

        notesContainer.appendChild(cardListItem);
      }
    }
  };

  fetchNotes();
});
