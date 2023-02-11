import {html, LitElement} from 'lit';
import Header from './header.js';

import {attachRouter} from '../router/index.js';

export class App extends LitElement {
    connectedCallback() {
        super.connectedCallback();

        if ('Notification' in window) {
            const currentPermission = Notification.permission;
            if (currentPermission !== 'granted') {
                Notification.requestPermission()
                    .then(permission => console.log(`Notification permission: ${permission}`));
            }
        }
    }

    render() {
        return html`
            ${Header()}
            <main role="main"></main>
        `;
    }

    createRenderRoot() {
        return this;
    }

    firstUpdated = () => {
        attachRouter(this.querySelector('main'));
    };
}

customElements.define('app-index', App);
