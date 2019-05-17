class GetNotes extends CustomElement {
    name = 'get-notes';
    el = null;
    constructor() {
        super();
        this.createHtml();
    }

    createHtml() {
        this.el = document.createElement('div');
        this.wrapper.appendChild(this.el);
        this.getNotes();
    }
    getNotes() {
        gql(`{ notes {name noteNumber flatName sharpName frequency } }`, res => {
            this.el.innerHTML = JSON.stringify(res.data.notes);
        });
    }
}

// Define the new element
customElements.define('get-notes', GetNotes);
