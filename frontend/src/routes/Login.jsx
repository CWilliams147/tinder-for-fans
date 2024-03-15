import { useState } from "preact/hooks";
import { Form, redirect } from "react-router-dom";
import Nav from "../components/Nav";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const logindata = { name, email, password };

  try {
    const url = `${import.meta.env.VITE_SOURCE_URL}/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindata),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      return redirect("/");
    } else {
      console.log("Login failed:", data.error);
    }
  } catch (error) {
    console.error("ERROR: ", error);
  }
}

const Login = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="onloading-background">
        <div className="login-form">
          <div className="login-header">Log In</div>
          <Form method="post">
            <div className="input-container">
              <label>
                Your Name
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="login-input"
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                Your Email
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="login-input"
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                Your Password
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-input"
                />
              </label>
            </div>
            <button type="submit">Login User</button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
