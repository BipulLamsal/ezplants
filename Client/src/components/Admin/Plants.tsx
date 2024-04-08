import React, { useEffect, useState } from "react";
import { Button, Dialog, Link, Table } from "@radix-ui/themes";
import { BiAddToQueue, BiEdit } from "react-icons/bi";
import { CgRemove } from "react-icons/cg";
import PlantForm from "./PlantForm";
import PlantEditForm from "./PlantEditForm"; // Import the PlantEditForm component

interface Plant {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: string;
}

const Plants: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/plants");
      if (!response.ok) {
        throw new Error("Failed to fetch plants data");
      }
      const data = await response.json();
      setPlants(data.plants);
    } catch (error) {
      console.error("Error fetching plants data:", error);
    }
  };

  const handlePlantAdded = async () => {
    await fetchPlants();
  };

  const handleDeletePlant = async (plantId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/plants/${plantId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete plant");
      }
      await fetchPlants();
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button className="mt-2 cursor-pointer">
            <BiAddToQueue /> Add New Plant
          </Button>
        </Dialog.Trigger>
        <PlantForm onPlantAdded={handlePlantAdded} />
      </Dialog.Root>

      <Table.Root variant="surface" className="mt-4">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Stock</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Operations</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {plants.map((plant) => (
            <Table.Row key={plant._id}>
              <Table.RowHeaderCell>{plant.name}</Table.RowHeaderCell>
              <Table.Cell>{plant.description}</Table.Cell>
              <Table.Cell>
                <Link href={plant.image} target="_blank">
                  view
                </Link>
              </Table.Cell>
              <Table.Cell>${plant.price}</Table.Cell>
              <Table.Cell>{plant.stock}</Table.Cell>
              <Table.Cell>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button variant="outline" className="cursor-pointer mx-1">
                      <BiEdit /> Edit
                    </Button>
                  </Dialog.Trigger>
                  <PlantEditForm
                    plantData={plant}
                    onUpdatePlant={handlePlantAdded}
                  />
                </Dialog.Root>

                <Button
                  variant="outline"
                  className="cursor-pointer mx-1"
                  onClick={() => handleDeletePlant(plant._id)}
                >
                  <CgRemove /> Remove
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Plants;
