import { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Text,
    Card,
    Grid,
    Button,
    Dialog,
    Badge,
    DropdownMenu,
    TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Car {
    _id: string;
    name: string;
    model: string;
    seats: number;
    rate: number;
    travelled: number;
    location: string;
    available: boolean;
    image_url: string;
    owned: boolean;
    owner_id: string;
    created_at: string;
}

const Rent: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [dropoffLocation, setDropoffLocation] = useState<string>("");
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: "https://needed-narwhal-charmed.ngrok-free.app/api",
        headers: {
            'ngrok-skip-browser-warning': '69420',
            Authorization: `Bearer ${token}`,
        },
    });

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axiosInstance.get<Car[]>("/rental");
                const updatedCars = response.data.map((car) => {
                    return car;
                });
                setCars(updatedCars);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleBooking = async (car: Car) => {
        try {
            const payload = {
                car_id: car._id.toString(),
                car_name: car.name,
                requested_by: localStorage.getItem("user"),
                requested_to: car.owner_id,
                dropoff_location: dropoffLocation,
            };

            await axiosInstance.post("/booking", payload);

            toast.success("Booking request sent successfully!");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to send booking request");
        }
    };

    if (loading) {
        return <Text size="5">Loading...</Text>;
    }

    if (error) {
        return (<Flex justify="center" align="center" direction="column">
            <Text size="6" color="lime" weight="bold">Login/Register To Continue</Text>
            <Box>


                <img src="/image.webp"></img>
            </Box>
        </Flex>)
    }

    return (
        <Grid columns={{ xs: "1", sm: "2", md: "3" }} gap="4">
            {cars.map((car) => (
                <Dialog.Root key={car._id}>
                    <Dialog.Trigger>
                        <Card
                            variant="surface"
                            className="p-4 shadow-md cursor-pointer"
                        >
                            <Box>
                                <img
                                    src={car.image_url}
                                    alt={car.name}
                                    className="h-30 object-cover rounded-md mb-3"
                                />
                                <Badge
                                    size="3"
                                    color={car.available ? "lime" : "red"}
                                    variant="surface"
                                    className="py-2 absolute top-5 left-5"
                                >
                                    {car.available ? "Available" : "Unavailable"}
                                </Badge>
                                <Text size="3" weight="bold" color="gray">{car.name}</Text>
                                <Flex justify="between" mt="2">
                                    <Box>
                                        <Badge size="3" color="lime" variant="soft">
                                            ₹{car.rate.toFixed(2)} / KM
                                        </Badge>
                                        <Badge size="3" color="lime" variant="solid">More Info</Badge>
                                    </Box>
                                </Flex>
                            </Box>
                        </Card>
                    </Dialog.Trigger>
                    <Dialog.Content className="rounded-lg shadow-lg bg-white p-6 max-w-md mx-auto">
                        <Dialog.Title>
                            <Flex justify="between" align="center" className="mb-4">
                                <Text size="7" weight="bold" color="gray">
                                    {car.name}
                                </Text>
                                <Button
                                    variant="ghost"
                                    size="2"
                                    aria-label="Close Dialog"
                                >
                                    ✖️
                                </Button>
                            </Flex>
                        </Dialog.Title>

                        <Box>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Button variant="soft">
                                        Details
                                        <DropdownMenu.TriggerIcon />
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Item>
                                        Seats: {car.seats}
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item>
                                        Travelled: {car.travelled.toFixed(2)} km
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item>
                                        Location: {car.location}
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item>
                                        CreatedAt: {car.created_at}
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            <img
                                src={car.image_url}
                                alt={car.name}
                                className="w-full h-50 object-cover rounded-md mt-4"
                            />
                        </Box>

                        {!car.owned && car.available ? (
                            <Flex className="mt-4">
                                <TextField.Root
                                    placeholder="Drop-off location"
                                    className="w-full"
                                    value={dropoffLocation}
                                    onChange={(e) => setDropoffLocation(e.target.value)}
                                >
                                    <TextField.Slot side="right">
                                        <Button
                                            variant="solid"
                                            onClick={() => handleBooking(car)}
                                        >
                                            Request
                                        </Button>
                                    </TextField.Slot>
                                </TextField.Root>
                            </Flex>
                        ) : (
                            <Badge variant="solid" size="3" mt="4">
                                {car.owned ? "Owned Car" : "Unavilable For Rent"}
                            </Badge>
                        )}
                    </Dialog.Content>
                </Dialog.Root>
            ))}
        </Grid>
    );
};

export default Rent;
