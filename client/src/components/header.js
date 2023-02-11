import {html} from 'lit';

const LOGO_IMAGE_FILE = "/src/assets/images/logo.png";

const Header = () => html`
    <header class="header">
        <img src="${LOGO_IMAGE_FILE}" alt="Site logo"/>
        <div class="logo">Chit Chat App</div>
    </header>
`;

export default Header;
