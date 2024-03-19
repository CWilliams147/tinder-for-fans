import { useState } from "preact/hooks";
import { Form, redirect } from "react-router-dom";
import Nav from "../components/Nav";
import supabase from "../supabase";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const loginData = { email, password };

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    console.log(data);

    const response = { data, error };
    const statusCode = response.status;

    if (statusCode === 200) {
      const data = await response.json();
      const { session, user } = data;
      localStorage.clear();
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("access_token", session.access_token);
      localStorage.setItem("refresh_token", session.refresh_token);
      localStorage.setItem("expiration", session.expires_at);
    }
    return redirect("/");
    // return statusCode === 200 ? true : false;
  } catch (error) {
    console.error("ERROR: ", error);
  }
  return redirect("/");
}

const Login = ({ history }) => {
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
