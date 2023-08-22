/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const user = { username, password };
    console.log("🚀 ~ file: login.js:17 ~ handleLogin ~ user:", user);
    await handleSubmit(user);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>

      {/* <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form> */}
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
