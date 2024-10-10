"use client";
import { UserService } from "@/classes/database/UserService";
import { CookieService } from "@/classes/database/CookieService";
import Image from "next/image";

export default function Home() {
  async function callUserService() {
    const response = await UserService.signupUserLogin(
      "test1@gmail.com",
      "blabla",
      "blabla",
      ""
    );
    console.log("response");
    console.log(response);
  }

  const addCookie = () => {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth() + 1).toUTCString();
    console.log("date");
    console.log(date);
    document.cookie = `salad=greek; path=/; expires=${date}`;
  };

  const cookies = document.cookie;

  console.log("cookies in page");
  console.log(cookies);

  return (
    <div>
      <div
        onClick={callUserService}
        className="m-4 p-4 bg-red-500 text-white max-w-40 text-center cursor-pointer mx-auto hover:bg-red-700"
      >
        click me bitch
      </div>

      <div
        onClick={addCookie}
        className="m-4 p-4 bg-blue-500 text-white max-w-40 text-center cursor-pointer mx-auto hover:bg-blue-700"
      >
        click me to add a cookie
      </div>
    </div>
  );
}
