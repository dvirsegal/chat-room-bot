import {css} from 'lit';

export const chatRoom = css`
  @media (max-width: 767px) {
    :host {
      width: 100% !important;
    }
  }

  :host {
    width: 80%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
    box-sizing: border-box;
    background-color: #36393F;
  }

  .message-container {
    width: 100%;
    padding: 20px 10vw;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    background-color: #36393F;
  }

  .message {
    margin-top: 10px;
    min-width: 150px;
    position: relative;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: #42464B;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.5);
    animation: SlideRight 0.3s ease-out;
  }

  .message.first {
    margin-top: 25px;
  }

  .message.me {
    background-color: #7289DA;
    color: white;
    align-self: flex-end;
    animation: SlideLeft 0.3s ease-out;
  }

  .tail {
    position: absolute;
    height: 20px;
    width: 20px;
    top: 0;
    left: -10px;
    background-color: #42464B;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
  }

  .message.me .tail {
    background-color: #7289DA;
    clip-path: polygon(0 0, 100% 0, 0 100%, 0 0);
    left: auto;
    right: -10px;
    top: 0;
  }

  .timestamp {
    align-self: flex-end;
    right: 0;
    font-size: 12px;
    font-style: italic;
    color: #b9bbbe;
    margin-top: -5px;
  }

  .message.me .timestamp {
    color: white;
  }

  .sender {
    font-size: 16px;
    font-weight: bold;
    color: white;
  }

  .content {
    font-size: 14px;
    color: white;
  }

  .send-message {
    width: 100%;
    display: flex;
    padding: 20px;
    border-top: 1px solid #2f3136;
    box-sizing: border-box;
    height: 80px;
    background-color: #232629;
  }

  .send-message form {
    width: 100%;
    display: flex;
  }

  .ca-button {
    background-color: #075E54;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    color: #fff;
  }

  .ca-input {
    background-color: #232629;
    color: #fff;
    flex-grow: 1;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

`;
