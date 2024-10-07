export type StateMessage = {
  isValid: boolean;
  message: string;
};

export class UserValidationService {
  static emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  static minUsernameLength = 3;
  static maxUsernameLength = 20;
  static minPasswordLength = 8;

  static isEmailValid(email: string): StateMessage {
    const stateMessage = { isValid: true, message: "" };
    // make sure email is provided and not empty
    if (email == null || email.length == 0) {
      stateMessage.isValid = false;
      stateMessage.message = "Email not provided";
      // make sure email matches the regex
    } else if (!this.emailPattern.test(email)) {
      stateMessage.isValid = false;
      stateMessage.message =
        "Email does not match the format of example@hotmail.com";
    }
    return stateMessage;
  }

  static isUsernameValid(username: string): StateMessage {
    const stateMessage = { isValid: true, message: "" };
    // make sure username is provided and not empty
    if (username == null || username.length == 0) {
      stateMessage.isValid = false;
      stateMessage.message = "Username not provided";
    } else if (username.length < this.minUsernameLength) {
      stateMessage.isValid = false;
      stateMessage.message = `Username is too short. Minimum length is ${this.minUsernameLength}`;
    } else if (username.length > this.maxUsernameLength) {
      stateMessage.isValid = false;
      stateMessage.message = `Username is too long. Maximum length is ${this.maxUsernameLength}`;
    }

    return stateMessage;
  }

  static isPasswordValid(password: string): StateMessage {
    const stateMessage = { isValid: true, message: "" };
    // make sure username is provided and not empty
    if (password == null || password.length == 0) {
      stateMessage.isValid = false;
      stateMessage.message = "Password not provided";
    } else if (password.length < this.minPasswordLength) {
      stateMessage.isValid = false;
      stateMessage.message = `Password is too short. Minimum length is ${this.minPasswordLength}`;
    }

    return stateMessage;
  }
}
