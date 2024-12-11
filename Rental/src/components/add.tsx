import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
    Box,
    Text,
    Flex,
    TextField,
    Button,
    Grid,
    Table,
    DropdownMenu,
    Dialog
} from "@radix-ui/themes";
import toast from "react-hot-toast";

const Add = () => {
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        model: "",
        seats: 1,
        rate: 1,
        travelled: 0,
        location: "",
        available: true,
        image_url: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editCarId, setEditCarId] = useState<string | null>(null);
    const openButtonRef = useRef<HTMLButtonElement>(null);

    const fetchCars = async () => {
        try {
            const response = await axios.get("https://needed-narwhal-charmed.ngrok-free.app/api/rental_user", {
                headers: { 'ngrok-skip-browser-warning': '69420',Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setCars(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Failed to fetch cars:", error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "available" ? value === "true" : value
        }));
    };

    const handleSave = async () => {
        try {
            if (isEditing && editCarId) {
                await axios.put(`https://needed-narwhal-charmed.ngrok-free.app/api/rental/${editCarId}`, formData, {
                    headers: {'ngrok-skip-browser-warning': '69420', Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
            } else {
                await axios.post("https://needed-narwhal-charmed.ngrok-free.app/api/rental", formData, {
                    headers: { 'ngrok-skip-browser-warning': '69420', Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
            }
            setFormData({
                name: "",
                model: "",
                seats: 1,
                rate: 1,
                travelled: 0,
                location: "",
                available: true,
                image_url: ""
            });
            setIsEditing(false);
            setEditCarId(null);
            toast.success("Saved Rental Car successfully!");
            fetchCars();
        } catch (error) {
            console.error("Failed to save car:", error);
        }
    };

    const handleEdit = (car: any) => {
        setIsEditing(true);
        setEditCarId(car._id);
        setFormData(car);
        openButtonRef.current?.click();
    };

    const handleDelete = async (carId: string) => {
        try {
            await axios.delete(`https://needed-narwhal-charmed.ngrok-free.app/api/rental/${carId}`, {
                headers: { 'ngrok-skip-browser-warning': '69420', Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            fetchCars();
            toast.success("Deleted Rental Car successfully!");
        } catch (error) {
            console.error("Failed to delete car:", error);
        }
    };

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button ref={openButtonRef}>Add</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="720px">
                    <AddForm setFormData={setFormData} formData={formData} handleInputChange={handleInputChange} />
                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button onClick={handleSave}>Save</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>

            <Table.Root variant="surface" mt="4">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Car Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Available</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>More Info</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {cars.map((car: any) => (
                        <Table.Row key={car._id}>
                            <Table.RowHeaderCell>{car.name}</Table.RowHeaderCell>
                            <Table.Cell>{car.available ? "Yes" : "No"}</Table.Cell>
                            <Table.Cell>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger>
                                        <Button variant="soft">
                                            Details
                                            <DropdownMenu.TriggerIcon />
                                        </Button>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content>
                                        <DropdownMenu.Item>Created at: {car.created_at}</DropdownMenu.Item>
                                        <DropdownMenu.Item>Expires on: {car.expiration || "N/A"}</DropdownMenu.Item>
                                        <DropdownMenu.Item>Created By: {car.owner_id}</DropdownMenu.Item>
                                        <DropdownMenu.Item>Location: {car.location}</DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Table.Cell>
                            <Table.Cell>
                                <Flex gap="3" align="center">
                                    <Button size="2" variant="soft" onClick={() => handleEdit(car)}>
                                        Edit
                                    </Button>
                                    <Button
                                        size="2"
                                        variant="soft"
                                        color="red"
                                        onClick={() => handleDelete(car._id)}
                                    >
                                        Delete
                                    </Button>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    );
};

const AddForm = ({ setFormData, formData, handleInputChange }: any) => {
    return (
        <Box>
            <Grid columns={{ xs: "1", sm: "2" }} gap="4">
                <Flex direction="column" gap="1">
                    <Text size="4" color="gray" weight="medium">
                        Car Name
                    </Text>
                    <TextField.Root
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Huyndai Creta"
                    >
                    </TextField.Root>
                </Flex>
                <Flex direction="column" gap="1">
                    <Text size="4" color="gray" weight="medium">
                        Model
                    </Text>
                    <TextField.Root
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        placeholder="2016 variant"
                    >
                    </TextField.Root>
                </Flex>
                <Flex direction="column" gap="1">
                    <Text size="4" color="gray" weight="medium">
                        KM Run
                    </Text>
                    <TextField.Root
                        name="travelled"
                        value={formData.travelled}
                        onChange={handleInputChange}
                        placeholder="1200"
                    >
                    </TextField.Root>
                </Flex>
                <Flex direction="column" gap="1">
                    <Text size="4" color="gray" weight="medium">
                        Price per KM
                    </Text>
                    <TextField.Root
                        name="rate"
                        value={formData.rate}
                        onChange={handleInputChange}
                        placeholder="$20"
                    >
                    </TextField.Root>
                </Flex>
                <Flex direction="column" gap="1">
                    <Text size="4" color="gray" weight="medium">
                        No. of Seats
                    </Text>
                    <TextField.Root
                        name="seats"
                        value={formData.seats}
                        onChange={handleInputChange}
                        placeholder="4"
                    >
                    </TextField.Root>
                </Flex>
                <Flex direction="column" gap="1">
                    <Text size="4" color="gray" weight="medium">
                        Location
                    </Text>
                    <TextField.Root
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Current Car Location"
                    >
                    </TextField.Root>
                </Flex>
                <Flex direction="column" gap="1">
                    <Text size="4" color="gray" weight="medium">
                        Image URL
                    </Text>
                    <TextField.Root
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                    >
                    </TextField.Root>
                </Flex>
                <Flex direction="column" gap="1">
                    <Text size="4" color="gray" weight="medium">
                        Available
                    </Text>
                    <label>
                        <input
                            type="checkbox"
                            name="available"
                            checked={formData.available}
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    available: e.target.checked,
                                }))
                            }
                        />

                    </label>
                </Flex>
            </Grid>
        </Box >
    );
};

export default Add;
