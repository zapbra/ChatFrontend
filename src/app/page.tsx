"use client";
import { UserService } from "@/classes/database/UserService";
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

  return (
    <div>
      <div
        onClick={callUserService}
        className="m-4 p-4 bg-red-500 text-white max-w-40 text-center cursor-pointer mx-auto hover:bg-red-700"
      >
        click me bitch
      </div>
    </div>
  );
}
