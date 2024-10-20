"use client";
import Link from "next/link";
import { Connector } from "@/classes/database/SignalConnector";
import { useEffect, useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import * as signalR from "@microsoft/signalr";

type Message = {
    username: string;
    message: string;
};

const Chatroom = ({ params }: { params: { group: string } }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const groupName = decodeURIComponent(params.group);
    const listenerAdded = useRef(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message !== "") {
            console.log("sending message");
            Connector.sendGroupChatMessage(groupName, "Jane Doe", message);
            setMessage("");
        }
    };

    useEffect(() => {
        const setupConnection = async () => {
            try {
                const connection = await Connector.startConnection();
                console.log("Checking setup conditions");
                if (
                    connection?.state ===
                        signalR.HubConnectionState.Connected &&
                    !listenerAdded.current
                ) {
                    console.log("joining group");
                    Connector.joinGroup(groupName, "John Doe");
                    console.log("joined group");
                    await Connector.registerGroupGlobalCallback(
                        (group, username, message) => {
                            console.log("message received");
                            setMessages((prevMessages) => {
                                return [...prevMessages, { username, message }];
                            });
                        }
                    );
                }

                listenerAdded.current = true;
            } catch (err) {
                console.log("Error setting up connection", err);
            }
        };

        setupConnection();

        return () => {
            if (
                Connector.connection &&
                Connector.connection.state ===
                    signalR.HubConnectionState.Connected
            ) {
                console.log("running use effect cleanup");
                Connector.connection.off("ReceiveMessage");
                listenerAdded.current = false;
            }
        };
    }, [Connector.connection]);

    return (
        <div className="mx-auto max-w-4xl p-4">
            <Link href="/" className="text-blue-500 underline">
                Home
            </Link>
            <h1 className="text-2xl text-green-500 mb-2 mt-2">
                Chatroom: {groupName}
            </h1>

            {messages.map(({ username, message }, index) => {
                return (
                    <p key={index}>
                        <span className="text-green-500">{username}: </span>{" "}
                        {message}{" "}
                    </p>
                );
            })}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="message"
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="type"
                    sx={{ mb: 1 }}
                    fullWidth
                    value={message}
                />

                <Button variant="outlined" color="secondary" type="submit">
                    Send
                </Button>
            </form>
        </div>
    );
};

export default Chatroom;
