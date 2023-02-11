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
  }

  .message {
    margin-top: 10px;
    min-width: 150px;
    position: relative;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: var(--light-background);
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.15);
    animation: SlideRight 0.3s ease-out;
  }

  .message.first {
    margin-top: 25px;
  }

  .message.me {
    background-color: var(--primary);
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
    background-color: var(--light-background);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
  }

  .message.me .tail {
    background-color: var(--primary);
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
    color: var(--borders-dark);
    margin-top: -5px;
  }

  .message.me .timestamp {
    color: white;
  }

  .sender {
    font-size: 16px;
    font-weight: bold;
  }

  .content {
    font-size: 14px;
  }

  .send-message {
    width: 100%;
    display: flex;
    padding: 20px;
    border-top: 1px solid var(--borders);
    box-sizing: border-box;
    height: 80px;
    background-color: white;
  }

  .send-message form {
    width: 100%;
    display: flex;
  }

  .ca-button {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }

  .ca-input {
    flex-grow: 1;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;
