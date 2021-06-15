import io from 'socket.io-client';

export default class SocketIOClient {
  static connectToDrinkList() {
    return io(this.getURL('drink-list'));
  }

  static connectToOrderQueue() {
    return io(this.getURL('order-queue'));
  }

  static getURL(path) {
    if (process.env.NODE_ENV === 'development') {
      return `localhost:3000/${path}`;
    }
    return `/${path}`;
  }
}
