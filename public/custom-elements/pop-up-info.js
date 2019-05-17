// Create a class for the element
class PopUpInfo extends HTMLElement {
    icon = null;
    observe = ['img'];
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Create spans
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');

        const icon = document.createElement('span');
        this.icon = icon;
        icon.setAttribute('class', 'icon');
        icon.setAttribute('tabindex', 0);

        const info = document.createElement('span');
        info.setAttribute('class', 'info');

        // Take attribute content and put it inside the info span
        const text = this.getAttribute('data-text');
        info.textContent = text;

        console.log('this img', this.getAttribute('img'))
        // Insert icon


        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');
        console.log(style.isConnected);

        style.textContent = `
      .wrapper {
        position: relative;
      }
      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }
      img {
        width: 1.2rem;
      }
      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

        // Attach the created elements to the shadow dom
        shadow.appendChild(style);
        console.log(style.isConnected);
        shadow.appendChild(wrapper);
        wrapper.appendChild(icon);
        wrapper.appendChild(info);
    }

    static get observedAttributes() {
        return ['img'];
    }
    connectedCallback() {
        console.log('Custom element added to page.');
    }
    disconnectedCallback() {
        console.log('Custom element removed from page.');
    }
    adoptedCallback() {
        console.log('Custom element moved to new page.');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom element attributes changed.', name, oldValue, newValue);
        if (name === 'img') {
            this.setImgUrl();
        }
    }

    setImgUrl() {
        let imgUrl;
        console.dir(this);
        if (this.hasAttribute('img')) {
            imgUrl = this.getAttribute('img');
        } else {
            imgUrl = 'img/default.png';
        }

        const img = document.createElement('img');
        img.src = imgUrl;
        this.icon.appendChild(img);
    };
}

// Define the new element
customElements.define('popup-info', PopUpInfo);
