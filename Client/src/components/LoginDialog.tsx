import {
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useLoginButton } from "../context/LoginContext";
import { useLoginAPI } from "../hooks/useLogin";
import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";

const LoginDialog = () => {
  const { toggleLogin } = useLoginButton();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { isLoading, error, loginStatus, login } = useLoginAPI();
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    login(formData.email, formData.password);
    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <Dialog.Content maxWidth="450px">
      <Dialog.Title>Login to Ezplant 🪴</Dialog.Title>
      <Dialog.Description>
        Access the vast majority of decorative plant with ease.
      </Dialog.Description>

      <Flex direction="column" gap="3" mt="5">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Email
          </Text>
          <TextField.Root
            defaultValue="student@example.com"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </label>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Password
          </Text>
          <TextField.Root
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </label>

        {error || loginStatus ? (
          <Callout.Root className="mt-2">
            <Callout.Icon>
              <BiInfoCircle></BiInfoCircle>
            </Callout.Icon>
            <Callout.Text>
              {error ? error : loginStatus ? loginStatus : ""}
            </Callout.Text>
          </Callout.Root>
        ) : (
          ""
        )}

        <Text size="2">
          Don't have an account?{" "}
          <Text
            weight="bold"
            color="teal"
            className="cursor-pointer"
            onClick={toggleLogin}
          >
            Sign up
          </Text>
        </Text>
      </Flex>

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Button onClick={handleSubmit}>Login</Button>
      </Flex>
    </Dialog.Content>
  );
};
export default LoginDialog;
