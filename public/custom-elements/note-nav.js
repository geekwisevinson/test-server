class NoteNav extends CustomElement {
    name = 'note-nav'

    constructor() {
        super();
        this.createHtml();
    };
    createHtml() {
        this.el = document.createElement('div');
        this.el.style.display = 'flex';
        this.el.style.justifyContent = 'space-around';
        this.wrapper.appendChild(this.el);
        const addNoteLink = document.createElement('a');
        addNoteLink.innerText = 'Add Notes';
        addNoteLink.href = '/pages/add-note.html';
        this.el.appendChild(addNoteLink);

        const getNotesLink = document.createElement('a');
        getNotesLink.innerText = 'Get Notes';
        getNotesLink.href = '/pages/get-notes.html';
        this.el.appendChild(getNotesLink);

        const updateNotesLink = document.createElement('a');
        updateNotesLink.innerText = 'Update Notes';
        updateNotesLink.href = '/pages/update-note.html';
        this.el.appendChild(updateNotesLink);
    }

}

customElements.define('note-nav', NoteNav);
