export class UserService {
  static apiUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

  /**
   * Fetches and returns a list of all the users of the application
   * @returns {Array.<Object>} The list of users
   */
  static async getUsers() {
    try {
      const response = await fetch(`${this.apiUrl}/api/Users`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.log("Error fetching users:", error);
      throw error;
    }
  }

  static async signupUserLogin(
    email: string,
    username: string,
    password: string,
    roleName: string
  ) {
    const roleId = this.getRoleIdByName(roleName);

    try {
      const response = await fetch(`${this.apiUrl}/api/Users/Userlogins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { roleId: roleId },
          username,
          password,
          email,
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = {
          message: "An error occured creating the user",
          details: "",
        };
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.log("error data");
          console.log(errorData);
          errorMessage.message = errorData?.message ?? "No message provided";
          errorMessage.details = errorData?.details ?? "No details provided";
        } else {
          errorMessage = { message: await response.text(), details: "" };
        }

        throw errorMessage;
      }

      return {
        success: true,
        body: await response.json(),
      };
    } catch (error) {
      return { success: false, body: error };
    }
  }

  /**
   *
   * @param {string} roleName
   * @returns {int} The id of the role to use for db inserts mainly
   */
  static getRoleIdByName(roleName: string): number {
    return 1;
  }
}
