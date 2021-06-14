import io from 'socket.io-client';

export default class SocketIOClient {
  // TODO: this needs to be configured to detect when in dev
  static connectToDrinkList() {
    return io('http://10.0.0.36:3000/drink-list');
  }

  static connectToOrderQueue() {
    return io('http://10.0.0.36:3000/order-queue');
  }
}
