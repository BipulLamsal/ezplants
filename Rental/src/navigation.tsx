import { useState, useRef, useEffect } from "react";
import { Box, Button, Flex, Separator, Text, Dialog, TextField, Badge } from "@radix-ui/themes";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const Navigation = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password: string) => password.length >= 8;

    const validateForm = () => {
        if (!email || !password || (!isLogin && (!nickname || !confirmPassword))) {
            toast.error("All fields are required.");
            return false;
        }
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
        if (!validatePassword(password)) {
            toast.error("Password must be at least 8 characters long.");
            return false;
        }
        if (!isLogin && password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return false;
        }
        return true;
    };

    const handleAuth = async () => {
        if (!validateForm()) return;

        const url = isLogin
            ? "https://needed-narwhal-charmed.ngrok-free.app/api/token"
            : "https://needed-narwhal-charmed.ngrok-free.app/api/register";

        let payload;

        if (isLogin) {
            payload = new FormData();
            payload.append("username", email);
            payload.append("password", password);
        } else {
            payload = { email, password, nickname, confirmPassword };
        }

        try {
            const response = await axios.post(url, payload, {
                headers: isLogin
                    ? { "Content-Type": "multipart/form-data" }
                    : { "Content-Type": "application/json" },
            });


            if (response.status === 200) {
                const data = response.data;

                if (isLogin) {
                    localStorage.setItem("token", data.access_token);

                    const user_response = await axios.get("https://needed-narwhal-charmed.ngrok-free.app/api/user", {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                    })
                    if (response.status === 200) {
                        const user_data = user_response.data
                        localStorage.setItem("user", user_data.id);
                        localStorage.setItem("nickname", user_data.nickname);
                    }

                    setIsLoggedIn(true);
                }
                closeButtonRef.current?.click();
                toast.success(isLogin ? "Login successful!" : "Registration successful!");
                setInterval(() => {
                    window.location.reload();
                }, 1000)

            } else {
                const errorMessage = response.data?.detail || "Unexpected error occurred.";
                toast.error(errorMessage);
            }
        } catch (error: any) {
            closeButtonRef.current?.click();
            if (error.response) {
                const errorMessage = error.response.data?.detail || "Something went wrong!";
                toast.error(errorMessage);
            } else if (error.request) {
                toast.error("No response from server. Please try again later.");
            } else {
                toast.error(error.message || "An error occurred.");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("nickname");
        setIsLoggedIn(false);
        toast.success("Logout successful!");
        setInterval(() => {
            window.location.reload();
        }, 1000)
    };

    return (
        <Box>
            <Toaster />
            <Flex justify="between" align="center" className="pt-5">
                <Box>
                    <Text weight="bold" size="5">
                        CarRental
                    </Text>
                </Box>

                {isLoggedIn ? <Flex gap="2" direction="row" justify="center">


                    <Button
                        size="2"
                        variant="solid"
                        className="cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    <Badge size="3">{localStorage.getItem("nickname")}</Badge>


                </Flex> : (
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button size="2" variant="solid" className="cursor-pointer">
                                Login / Register
                            </Button>
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth="450px">
                            <Dialog.Title>{isLogin ? "Login" : "Register"}</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                                {isLogin
                                    ? "Enter your login credentials"
                                    : "Enter your details to create an account"}
                            </Dialog.Description>

                            <Flex direction="column" gap="3">
                                {!isLogin && (
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Nickname
                                        </Text>
                                        <TextField.Root
                                            placeholder="Enter your nickname"
                                            value={nickname}
                                            onChange={(e) => setNickname(e.target.value)}
                                        />
                                    </label>
                                )}
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Email Address
                                    </Text>
                                    <TextField.Root
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Password
                                    </Text>
                                    <TextField.Root
                                        placeholder="Secret Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </label>

                                {!isLogin && (
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Confirm Password
                                        </Text>
                                        <TextField.Root
                                            placeholder="Confirm your password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </label>
                                )}
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray" ref={closeButtonRef}>
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Button onClick={handleAuth}>
                                    {isLogin ? "Login" : "Register"}
                                </Button>

                            </Flex>

                            <Flex mt="4">
                                <Text size="2">
                                    {isLogin ? "New user?" : "Already registered?"}{" "}
                                    <Text
                                        as="span"
                                        className="cursor-pointer"
                                        color="lime"
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        {isLogin ? "Register here" : "Login here"}
                                    </Text>
                                </Text>

                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                )}
            </Flex>
            <Separator my="3" size="4" />
        </Box>
    );
};

export default Navigation;
``
