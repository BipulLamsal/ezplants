import { Badge, Button, Flex, Table } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import axios from "axios";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const token = localStorage.getItem("token");
    const fetchNotifications = async () => {
        try {
            const response = await axios.get("https://needed-narwhal-charmed.ngrok-free.app/api/bookings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotifications(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleApprove = async (notificationId: string) => {

        try {
            await axios.put(
                `https://needed-narwhal-charmed.ngrok-free.app/api/booking/${notificationId}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            fetchNotifications();
        } catch (error) {
            console.error("Error approving notification:", error);
        }
    };

    const handleComplete = async (notificationId: string) => {
        try {
            await axios.put(
                `https://needed-narwhal-charmed.ngrok-free.app/api/booking/${notificationId}/complete`, {},
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            fetchNotifications();
        } catch (error) {
            console.error("Error completing notification:", error);
        }
    };

    const handleCancel = async (notificationId: string) => {
        try {
            await axios.put(
                `https://needed-narwhal-charmed.ngrok-free.app/api/booking/${notificationId}/cancel`, {},
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            fetchNotifications();
        } catch (error) {
            console.error("Error canceling notification:", error);
        }
    };

    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Car Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Car Owner</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Car RequestedBy</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>DropOff Location</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {notifications.map((notification: any) => (
                    <Table.Row key={notification.car_id}>
                         <Table.RowHeaderCell>{notification.created_at}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{notification.car_name}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{notification.requested_to_email}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{notification.requested_by_email}</Table.RowHeaderCell>
                        <Table.Cell>{notification.dropoff_location}</Table.Cell>
                        <Table.Cell>
                            <Badge
                                color={
                                    notification.status === "pending"
                                        ? "lime"
                                        : notification.status === "approved"
                                            ? "blue"
                                            : notification.status === "completed"
                                                ? "green"
                                                : "red"
                                }
                                size="3"
                            >
                                {notification.status}
                            </Badge>
                        </Table.Cell>
                        <Table.Cell>
                            <Flex gapX="4">
                                {notification.status === "pending" &&
                                    notification.requested_to === localStorage.getItem("user") && (
                                        <Button
                                            variant="soft"
                                            color="blue"
                                            onClick={() => handleApprove(notification._id)}
                                        >
                                            Approve
                                        </Button>
                                    )}
                                {notification.status === "booked" &&

                                    <Button
                                        variant="soft"
                                        color="green"
                                        onClick={() => handleComplete(notification._id)}
                                    >
                                        Complete
                                    </Button>
                                }
                                {notification.status !== "completed" &&
                                    <Button
                                        variant="soft"
                                        color="red"
                                        onClick={() => handleCancel(notification._id)}
                                    >
                                        Cancel
                                    </Button>}
                            </Flex>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
};

export default Notification;
