import {
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useLoginButton } from "../context/LoginContext";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { BiInfoCircle } from "react-icons/bi";
const RegisterDialog = () => {
  const { toggleLogin } = useLoginButton();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { isLoading, error, registerStatus, register } = useRegister();
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    register(formData.fullname, formData.email, formData.password);
    setFormData({
      fullname: "",
      email: "",
      password: "",
    });
  };
  return (
    <Dialog.Content maxWidth="450px">
      <Dialog.Title>Signup to Ezplant 🪴</Dialog.Title>
      <Dialog.Description>
        Access the vast majority of decorative plant with ease.
      </Dialog.Description>
      <Flex direction="column" gap="3" mt="5">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Full Name
          </Text>
          <TextField.Root
            defaultValue="John Doe"
            placeholder="Enter your Name"
            name="fullname"
            onChange={handleChange}
            value={formData.fullname}
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Email
          </Text>
          <TextField.Root
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <Text size="2">
          Already have an account?{" "}
          <Text
            weight="bold"
            color="teal"
            className="cursor-pointer"
            onClick={toggleLogin}
          >
            Login
          </Text>
        </Text>
      </Flex>
      {error || registerStatus ? (
        <Callout.Root className="mt-2">
          <Callout.Icon>
            <BiInfoCircle></BiInfoCircle>
          </Callout.Icon>
          <Callout.Text>
            {error ? error : registerStatus ? registerStatus : ""}
          </Callout.Text>
        </Callout.Root>
      ) : (
        ""
      )}

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Button
          onClick={handleSubmit}
          loading={isLoading}
          onSubmit={handleSubmit}
        >
          Login
        </Button>
      </Flex>
    </Dialog.Content>
  );
};
export default RegisterDialog;
