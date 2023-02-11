import {html} from 'lit';
import {PageElementNotFound} from '../assets/styles/pageElementNotFound.js';

export class PageNotFound extends PageElementNotFound {
    render() {
        return html`
            <section class="not-found">
                <h1>404</h1>
                <h2>Oops!</h2>
                <h3>We can't seem to find the page you're looking for...</h3>
            </section>
        `;
    }
}

customElements.define('page-not-found', PageNotFound);
