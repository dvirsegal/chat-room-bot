import {html, LitElement} from "lit";
import {connect as connectSocket, registerToSocket} from '../socket/socket';
import {UsersList} from "../components/usersList.js";
import {ChatRoom} from "../components/chatRoom.js";

import confetti from 'canvas-confetti';

const USERNAME_TAKEN_MESSAGE = userName =>
    `Username ${userName} is already taken! Please choose another one.`;
const USERNAME_REQUIRED_MESSAGE = 'Username was not entered!';
const USERNAME_RESTRICTED_MESSAGE = 'Please choose another username..';
const AUDIO_FX_FILE = "src/assets/sound/welcome.mp3";
const LOGO_IMAGE_FILE = "/src/assets/images/logo.png";


export class PageHome extends LitElement {

    constructor() {
        super();
        this.username = null;
        this.registerUsernameTakenHandler();
    }

    static get properties() {
        return {
            username: {type: String}
        };
    }

    registerUsernameTakenHandler() {
        registerToSocket('usernameTaken', (userName) => {
            alert(USERNAME_TAKEN_MESSAGE(userName));
            window.location.reload();
        });
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
                                        <img src="${LOGO_IMAGE_FILE}" class="logo" alt="site logo"/>
                                        Welcome to Chit Chat!<br/>
                                        Please enter your username to start chatting:
                                    </div>
                                    <form @submit=${this.#loginUser}>
                                        <input class="ca-input" type="text" id="username"/>
                                        <button
                                                class="ca-button"
                                                type="button"
                                                @click=${this.#loginUser}
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


    /**
     * Login user to the chat room
     * @param event {Event}
     */
    #loginUser = event => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();

        if (!username) {
            alert(USERNAME_REQUIRED_MESSAGE);
            return;
        }

        if (username.toLowerCase() === 'bot') {
            alert(USERNAME_RESTRICTED_MESSAGE);
            return;
        }

        this.username = username;
        connectSocket(username);
        this.#playAudioFX(AUDIO_FX_FILE);
        this.#dispenseConfetti();
    };

    /**
     * Play audio file using AudioFX library
     * @param audioFile
     */
    #playAudioFX(audioFile) {
        new AudioFX(audioFile, function () {
            this.play();
        });
    }

    /**
     * Dispense confetti using canvas-confetti library
     */
    #dispenseConfetti() {
        confetti({
            spread: 360,
            ticks: 200,
            gravity: 1,
            decay: 0.98,
            startVelocity: 25,
            colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
            particleCount: 40,
            scalar: 1.2,
            shapes: ['star']
        });
    }
}


customElements.define('users-list', UsersList);
customElements.define('chat-room', ChatRoom);
customElements.define('home-page', PageHome);
