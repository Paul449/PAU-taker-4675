let noteForm; // structure of the note
let noteTitle; // note's title field
let noteText; // note's text field
let saveNoteBtn; // button to save note on the left-hand column
let newNoteBtn; // button to create a new note
let noteList; // on the left-hand column

if (window.location.pathname === '/notes') { //window.location.pathname returns the pathname of the current page
  noteForm = document.querySelector('.note-form'); //targets the structure of the note, both textareas(Note Title and Note Text)
  noteTitle = document.querySelector('.note-title'); // targets specifically the Note Title textarea
  noteText = document.querySelector('.note-textarea'); // targets specifically the note's text textarea (notes.html)
  saveNoteBtn = document.querySelector('.save-note'); //targets the save note button to the left-hand column (notes.html)
  newNoteBtn = document.querySelector('.new-note'); // targets the new note button to create a new note (notes.html)
  clearBtn = document.querySelector('.clear-btn'); // targets the clear form button to delete the content inside when typing  (notes.html)
  noteList = document.querySelectorAll('.list-container .list-group'); // targets the note list located on the left-hand column (notes.html)
}

// function which allow us to show an element
const show = (elem) => {
  elem.style.display = 'inline'; //show  specific button on the navigation bar
};

// function which allow us to hide an element
const hide = (elem) => { // adding a button as argument
  elem.style.display = 'none'; // means hiding or not showing specific element(button)
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {}; //text entered when typing on the textareas, for example; showing buttons on the top-right of the navigation bar
// function refering to the "new note" button
const getNotes = () => 
  fetch('/api/notes', { // notes refers to a collection
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
// function refering to the "save note" button
const saveNote = (note) =>
  fetch('/api/notes', { // notes refers to a collection of notes as reference to saved notes 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

const renderActiveNote = () => {
  hide(saveNoteBtn); // hide function to hide "save note button"
  hide(clearBtn); //hide function to hide "clear form button"

  if (activeNote.id) {
    show(newNoteBtn);
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    hide(newNoteBtn);
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  show(clearBtn);
  renderActiveNote();
};

// Renders the appropriate buttons based on the state of the form
const handleRenderBtns = () => {
  show(clearBtn);
  if (!noteTitle.value.trim() && !noteText.value.trim()) {
    hide(clearBtn);
  } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', renderActiveNote);
  noteForm.addEventListener('input', handleRenderBtns);
}

getAndRenderNotes();
