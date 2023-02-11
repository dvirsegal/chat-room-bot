import {html, LitElement} from "lit";
import {registerToSocket} from '../socket/socket';
import {usersList} from "../assets/styles/usersList.js";

const UNSUBSCRIBERS = [];

export class UsersList extends LitElement {

    static styles = [usersList];

    constructor() {
        super();
        this.onlineUsers = null;
        this.currentUser = null;
    }

    static get properties() {
        return {
            onlineUsers: {type: Array},
            currentUser: {type: String}
        };
    }

    connectedCallback() {
        super.connectedCallback();
        UNSUBSCRIBERS.push(
            registerToSocket(
                'onlineUsers',
                ([{users}]) => (this.onlineUsers = users)
            )
        );
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        UNSUBSCRIBERS.forEach(cb => cb());
    }

    render() {
        return this.onlineUsers
            ? html`
                    <div class="title">Online Users:</div>
                    ${this.onlineUsers?.map(
                            user => html`
                                <div class="user">
                                    <span class="status-indicator"></span>
                                    ${user}
                                    ${user === this.currentUser
                                            ? html`<span class="you">- You</span>`
                                            : ''}
                                </div>`
                    )}`
            : html`
                    <div>To see who's connected, please log in!</div>`;
    }
}
