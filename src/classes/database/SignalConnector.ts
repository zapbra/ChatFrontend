import * as signalR from "@microsoft/signalr";

const hubURL = process.env.NEXT_PUBLIC_HUB_ADDRESS ?? "";

export class Connector {
    static connection: signalR.HubConnection | null = null;

    static async startConnection() {
        try {
            if (this.connection == null) {
                this.connection = new signalR.HubConnectionBuilder()
                    .withUrl(hubURL)
                    .build();
                await this.connection.start();
            }
        } catch (err) {
            console.log("Failed to start connection", err);
        }

        return this.connection;
    }

    static closeConnection() {
        if (this.connection != null) {
            this.connection.stop().then(() => {
                console.log("Connection stopped");
            });
        } else {
            console.log("Connection does not exist");
        }
    }

    static async sendGlobalChatMessage(username: string, message: string) {
        try {
            if (this.connection != null) {
                await this.connection.invoke("SendMessage", username, message);
            } else {
                throw new Error("Connection does not exist");
            }
        } catch (err) {
            console.log("Failed to send global chat message", err);
        }
    }

    static async registerGlobalCallback(
        callbackFunction: (username: string, message: string) => void
    ) {
        try {
            if (this.connection != null) {
                this.connection.on("ReceiveMessage", (username, password) =>
                    callbackFunction(username, password)
                );
            } else {
                throw new Error("Connection does not exist");
            }
        } catch (err) {
            console.log("Failed to register global callback", err);
        }
    }

    static async joinGroup(group: string) {
        try {
            if (this.connection) {
                this.connection.invoke("AddToGroup", group);
            }
        } catch (err) {
            console.log(`Failed to join group: ${group}`, err);
        }
    }

    static async leaveGroup(group: string) {
        try {
            if (this.connection) {
                this.connection.invoke("RemoveFromGroup", group);
            }
        } catch (err) {
            console.log(`Failed to leave group: ${group}`, err);
        }
    }
}
