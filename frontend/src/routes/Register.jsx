import React from "react";
import { useState } from "preact/hooks";
import { Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const logindata = { name, email, password };
  try {
    const url = `${import.meta.env.VITE_SOURCE_URL}/register`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindata),
    };
    console.log(url);
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(response);
    console.log(data);
  } catch (error) {
    console.error("ERROR: ", error);
    return false;
  }
  return redirect("/");
}

const Register = () => {
  return (
    <>
      <h2>Register</h2>
      <Form method="post">
        <label>
          Your Name
          <input type="text" name="name" />
        </label>
        <label>
          Your Email
          <input type="text" name="email" />
        </label>
        <label>
          Your Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Register User</button>
      </Form>
    </>
  );
};
export default Register;
