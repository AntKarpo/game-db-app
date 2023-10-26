import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateUser() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  async function addUser(user) {
    const response = await fetch(`/api/Review/index.js`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.error("Error creating user:", response.status);
    }
  }

}
