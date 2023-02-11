import {html, LitElement} from 'lit';
import Header from './header.js';

import {attachRouter} from '../router/index.js';

export class App extends LitElement {
    static permission = 'granted';

    connectedCallback() {
        super.connectedCallback();
        this.#checkNotificationPermission();
    }

    #checkNotificationPermission() {
        if ('Notification' in window) {
            const currentPermission = Notification.permission;
            if (currentPermission !== App.permission) {
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
