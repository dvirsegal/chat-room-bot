import {html} from 'lit';


export const renderPageNotFound = () => {
    import('../../pages/notFound.js');

    return html`
        <page-not-found></page-not-found>`;
};
