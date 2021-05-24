import io from 'socket.io-client';

export default class SocketIOClient {
  static socket;
  
  // TODO: this needs to be configured to detect when in dev
  static initSocket() {
    this.socket = io('http://localhost:3000');
  }
}
