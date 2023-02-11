import {removeMetaTag, setMetaTag} from '../../components/html-meta-manager/utils.js';

import {PageElement} from './pageElement.js';

export class PageElementNotFound extends PageElement {
    connectedCallback() {
        super.connectedCallback();

        setMetaTag('name', 'render:status_code', '404');
    }

    disconnectedCallback() {
        removeMetaTag('name', 'render:status_code');

        super.disconnectedCallback();
    }
}
