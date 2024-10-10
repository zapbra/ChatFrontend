import * as signalR from "@microsoft/signalr";

export class SignalConnector {
  hub_url = process.env.NEXT_PUBLIC_HUB_ADDRESS ?? "";
  private connection: signalR.HubConnection;
  static instance: SignalConnector;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.hub_url)
      .build();
    this.connection.start().catch((err) => document.write(err));
  }

  public static getInstance(): SignalConnector {
    if (!SignalConnector.instance) {
      SignalConnector.instance = new SignalConnector();
    }
    return SignalConnector.instance;
  }
}
