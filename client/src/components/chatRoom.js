import {html, LitElement} from 'lit';
import moment from 'moment/src/moment';
import {registerToSocket, sendMessage} from '../socket/socket';
import {inputStyles, loader, slideLeftAnimation, slideRightAnimation} from '../assets/styles/generalStyles.js';
import {chatRoom} from "../assets/styles/chatRoom.js";

const REGISTERED = [];
const USER_COLORS = {};

export class ChatRoom extends LitElement {
    constructor() {
        super();
        this.messages = null;
        this.currentUser = null;
    }

    static get properties() {
        return {
            messages: {type: Array},
            currentUser: {type: String}
        };
    }

    static get styles() {
        return [
            inputStyles,
            loader,
            slideLeftAnimation,
            slideRightAnimation,
            chatRoom
        ];
    }

    get usernameInput() {
        return this.shadowRoot.getElementById('message');
    }

    get latestMessage() {
        return this.shadowRoot.querySelector('.message:last-child');
    }


    connectedCallback() {
        super.connectedCallback();
        REGISTERED.push(
            registerToSocket('message', ([sender, content, timestamp]) =>
                this.#handleMessage(sender, content, timestamp)));

        REGISTERED.push(
            registerToSocket('getHistory', ([{messages}]) => this.#getHistory(messages))
        );
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        this.latestMessage?.scrollIntoView();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        REGISTERED.forEach((cb) => cb());
    }

    render() {
        return !this.currentUser
            ? html`
                    <div>Login to see message history!</div>`
            : !this.messages
                ? html`
                            <div class="loader"></div>`
                : html`
                            <div class="message-container" id="message-container">
                                ${this.messages.map(({sender, timestamp, content}, index) => {
                                    const isFirstInBundle =
                                            index === 0 || this.messages[index - 1].sender !== sender;
                                    const isMe = sender === this.currentUser;

                                    return html`
                                        <div
                                                class=${`message ${isMe ? 'me' : ''} ${
                                                        isFirstInBundle ? 'first' : ''
                                                }`}
                                        >
                                            ${isFirstInBundle ? html`
                                                <div class="tail"></div>` : ''}
                                            <div class="timestamp">${moment(timestamp).fromNow()}</div>
                                            ${isFirstInBundle
                                                    ? html`
                                                        <div
                                                                class="sender"
                                                                style=${isMe ? '' : `color: ${USER_COLORS[sender]}`}
                                                        >
                                                            ${sender}:
                                                        </div>`
                                                    : ''}
                                            <div class="content">${content}</div>
                                        </div>`;
                                })}
                            </div>
                            <div class="send-message">
                                <form @submit=${this.#sendMessage}>
                                    <input
                                            class="ca-input"
                                            type="text"
                                            placeholder="Enter your message here.."
                                            id="message"
                                    />
                                    <button @mouseover=${this.#hoverIn} @mouseout=${this.#hoverOut}
                                            @click=${this.#sendMessage} class="ca-button">
                                        Send
                                    </button>
                                </form>
                            </div>
                            <body>
                            </body>
                `;
    }


    #hoverIn(e) {
        if (e.type === 'mouseover') {
            e.target.style.backgroundColor = 'RoyalBlue';
        }
    }

    #hoverOut(e) {
        if (e.type === 'mouseout') {
            e.target.style.backgroundColor = '#075E54';
        }
    }

    /**
     * Generate a random hsl color
     *
     * @returns {String} hsl css color string with a random hue, constant saturation of 100 and random lightness
     */
    #getRandomColor() {
        return `hsl(${Math.round(Math.random() * 360)}, 100%, ${Math.round(
            Math.random() * (45 - 25) + 25
        )}%)`;
    }

    #getUniqueSenders(messages) {
        const unique = [];

        messages?.map(
            ({sender}) => !unique.includes(sender) && unique.push(sender)
        );

        return unique;
    }

    /**
     * Handle incoming messages
     * @param sender
     * @param content
     * @param timestamp
     */
    #handleMessage(sender, content, timestamp) {
        if (!USER_COLORS[sender]) USER_COLORS[sender] = this.#getRandomColor();

        this.messages = [
            ...(this.messages || []),
            {sender, content, timestamp}
        ];

        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('New message arrived!', {
                body: `${sender}: ${content}`,
                icon: '/src/assets/images/logo.png',
                timestamp
            });
        }
    }

    /**
     * Get the message history
     * @param messages
     */
    #getHistory(messages) {
        const uniqueSenders = this.#getUniqueSenders(messages);

        uniqueSenders.map(
            (sender) => (USER_COLORS[sender] = this.#getRandomColor())
        );

        this.messages = [...(this.messages || []), ...messages];
    }


    /**
     * Send a message
     * @param event
     */
    #sendMessage(event) {
        event.preventDefault();
        const messageContent = this.usernameInput.value.trim();

        if (!messageContent) {
            alert('Please enter a message before sending!');
            return;
        }

        this.usernameInput.value = '';
        sendMessage(messageContent);
    }
}


