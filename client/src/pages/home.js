import {html, LitElement} from "lit";
import {connect as connectSocket, registerToSocket} from '../socket/socket';
import {UsersList} from "../components/usersList.js";
import {ChatRoom} from "../components/chatRoom.js";

import confetti from 'canvas-confetti';


export class PageHome extends LitElement {

    constructor() {
        super();

        this.username = null;

        registerToSocket('usernameTaken', (userName) => {
            alert(`Username ${userName} is already taken! Please choose another one.`);
            window.location.reload();
        })
    }

    static get properties() {
        return {
            username: {type: String}
        };
    }

    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <div class="home-container">
                ${!this.username
                        ? html`
                            <div class="login-overlay">
                                <div class="login-container">
                                    <div class="title">
                                        <img src="/src/assets/images/logo.png" class="logo" alt="site logo"/>
                                        Welcome to Chit Chat App!<br/>
                                        Please Enter your username to start chatting:
                                    </div>
                                    <form @submit=${this._loginUser}>
                                        <input class="ca-input" type="text" id="username"/>
                                        <button
                                                class="ca-button"
                                                type="button"
                                                @click=${this._loginUser}
                                        >
                                            Login
                                        </button>
                                    </form>
                                </div>
                            </div>`
                        : ''}
                <users-list .currentUser=${this.username}></users-list>
                <chat-room .currentUser=${this.username}></chat-room>
            </div>`;
    }

    _loginUser(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();

        if (!username) {
            alert('Username was not entered!');
            return;
        }

        if (username.toLowerCase() === 'bot') {
            alert('Please choose another username..');
            return;
        }

        this.username = username;
        connectSocket(username);

        new AudioFX("src/assets/sound/welcome.mp3", function () {
            this.play();
        });

        const defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            shapes: ['star'],
            colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
        };

        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ['star']
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle']
        });
    }
}


customElements.define('users-list', UsersList);
customElements.define('chat-room', ChatRoom);
customElements.define('home-page', PageHome);
