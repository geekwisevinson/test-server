// Create a class for the element
class CustomElement extends HTMLElement {
    wrapper = null;
    name = '';
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Create spans
        const wrapper = document.createElement('span');
        this.wrapper = wrapper;
        wrapper.setAttribute('class', 'wrapper');


        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');
        console.log(style.isConnected);

        style.textContent = `
      .wrapper {
        position: relative;
      }
    `;

        // Attach the created elements to the shadow dom
        shadow.appendChild(style);
        console.log(style.isConnected);
        shadow.appendChild(wrapper);

    }

    static get observedAttributes() {
        return ['img'];
    }
    connectedCallback() {
        console.log(`Custom element ${this.name} added to page.`);
    }
    disconnectedCallback() {
        console.log(`Custom element ${this.name} removed from page.`);
    }
    adoptedCallback() {
        console.log(`Custom element ${this.name} moved to new page.`);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Custom element ${this.name} attributes changed.`, name, oldValue, newValue);
    }
}


