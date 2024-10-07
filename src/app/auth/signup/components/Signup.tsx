"use client";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { UserService } from "@/classes/database/UserService";
import {
  StateMessage,
  UserValidationService,
} from "@/classes/database/UserValidationService";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [serverError, setServerError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // reset error states
    setEmailError(false);
    setEmailErrorMessage("");
    setUsernameError(false);
    setUsernameErrorMessage("");
    setPasswordError(false);
    setPasswordErrorMessage("");
    setServerError("");

    const emailValidMessage: StateMessage =
      UserValidationService.isEmailValid(email);
    const usernameValidMessage: StateMessage =
      UserValidationService.isUsernameValid(username);
    const passwordValidMessage: StateMessage =
      UserValidationService.isPasswordValid(password);

    // validate fields
    if (!emailValidMessage.isValid) {
      setEmailError(true);
      setEmailErrorMessage(emailValidMessage.message);
    }
    if (!usernameValidMessage.isValid) {
      setUsernameError(true);
      setUsernameErrorMessage(usernameValidMessage.message);
    }
    if (!passwordValidMessage.isValid) {
      setPasswordError(true);
      setPasswordErrorMessage(passwordValidMessage.message);
    }

    console.log(`email ${email}, username ${username}, password = ${password}`);

    // if all is good, create user in database
    if (
      emailValidMessage.isValid &&
      usernameValidMessage.isValid &&
      passwordValidMessage.isValid
    ) {
      const { success, body } = await UserService.signupUserLogin(
        email,
        username,
        password,
        "user"
      );
      // successfully created user
      if (success) {
        alert("successfully created user");
      } else {
        setServerError(body.message + "\n" + body.details);
      }
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-4xl mb-8">Register Form</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="username"
          onChange={(e) => setUsername(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="type"
          sx={{ mb: 1 }}
          fullWidth
          value={username}
          error={usernameError}
        />
        <p className="text-red-500 mb-4">{usernameErrorMessage}</p>

        <TextField
          label="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 1 }}
          fullWidth
          value={email}
          error={emailError}
        />
        <p className="text-red-500 mb-4">{emailErrorMessage}</p>

        <TextField
          label="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          sx={{ mb: 1 }}
          fullWidth
          value={password}
          error={passwordError}
        />
        <p className="text-red-500 mb-4">{passwordErrorMessage}</p>
        <p className="text-red-500 py-2" style={{ whiteSpace: "pre-wrap" }}>
          {serverError}
        </p>
        <Button variant="outlined" color="secondary" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Signup;
