"use client";
import React, { useEffect, useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import { UserService } from "@/classes/database/UserService";
import { CookieService } from "@/classes/database/CookieService";
import Image from "next/image";
import { Connector, SignalConnector } from "@/classes/database/SignalConnector";
import GroupList from "./components/chat/Grouplist";

type Message = {
    username: string;
    message: string;
};

export default function Home() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const listenerAdded = useRef(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Sending message");
        e.preventDefault();
        if (message !== "") {
            Connector.sendGlobalChatMessage("james franko", message);
            setMessage("");
        }
    };

    useEffect(() => {
        const setupConnection = async () => {
            try {
                const connection = await Connector.startConnection();
                if (connection && !listenerAdded.current) {
                    Connector.registerGlobalCallback((username, message) => {
                        setMessages((prevMessages) => {
                            return [...prevMessages, { username, message }];
                        });
                    });
                }

                listenerAdded.current = true;
            } catch (err) {
                console.log("Error setting up connection", err);
            }
        };

        setupConnection();

        return () => {
            if (Connector.connection) {
                Connector.connection.off("ReceiveMessage");
                listenerAdded.current = false;
            }
        };
    }, []);

    return (
        <div className="mx-auto max-w-4xl p-4">
            <div className="mb-4"></div>
            <h1 className="text-2xl text-green-500 mb-2">Chat Messages</h1>
            {messages.map(({ username, message }, index) => {
                return (
                    <p key={index}>
                        <span className="text-green-500">{username}: </span>{" "}
                        {message}{" "}
                    </p>
                );
            })}
            <form onSubmit={handleSubmit} className="mb-8">
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

            <GroupList />
        </div>
    );
}
