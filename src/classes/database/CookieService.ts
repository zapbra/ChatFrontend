import { cookies } from "next/headers";

export type CookieObject = {
  auth_expiry_time: Date;
  authenticated: boolean;
  email: string;
  email_status_description: string;
  is_email_validated: boolean;
  user_id: number;
  user_state_id: number;
  username: string;
};

const requiredCookies = [
  "auth_expiry_time",
  "authenticated",
  "email",
  "email_status_description",
  "is_email_validated",
  "user_id",
  "user_state_id",
  "username",
];

export class CookieService {
  static getCookies(): CookieObject | null {
    const cookieStore = cookies();

    // Return null if any required cookies are missing
    for (const cookie of requiredCookies) {
      if (!cookieStore.get(cookie)?.value) {
        return null;
      }
    }

    const cookieObject: CookieObject = {
      auth_expiry_time: new Date(
        decodeURIComponent(cookieStore.get("auth_expiry_time")?.value ?? "")
      ),
      authenticated:
        cookieStore.get("authenticated")?.value.toLowerCase() === "true",
      email: decodeURIComponent(cookieStore.get("email")?.value ?? ""),
      email_status_description:
        cookieStore.get("email_status_description")?.value ?? "",
      is_email_validated:
        cookieStore.get("is_email_validated")?.value.toLowerCase() === "true",
      user_id: parseInt(cookieStore.get("user_id")?.value ?? "0"),
      user_state_id: parseInt(cookieStore.get("user_state_id")?.value ?? "0"),
      username: decodeURIComponent(cookieStore.get("username")?.value ?? ""),
    };

    return cookieObject;
  }
}
