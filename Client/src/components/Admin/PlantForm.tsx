import React, { useState } from "react";
import {
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { BiInfoCircle } from "react-icons/bi";
interface PlantFormProps {
  onPlantAdded: () => void;
}
const PlantForm: React.FC<PlantFormProps> = ({ onPlantAdded }) => {
  const [formValidation, setFormValidation] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    stock: "",
    price: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/plants/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        setFormValidation(json.error);
      } else {
        setFormData({
          name: "",
          description: "",
          image: "",
          stock: "",
          price: "",
        });
        onPlantAdded();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog.Content maxWidth="450px">
      <Dialog.Title>Add Plant</Dialog.Title>

      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              placeholder="Enter the plant name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextArea
              placeholder="Enter the plant description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Image
            </Text>
            <TextField.Root
              placeholder="Enter the plant image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Stock
            </Text>
            <TextField.Root
              type="number"
              placeholder="Enter the stock quantity"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Price
            </Text>
            <TextField.Root
              type="number"
              placeholder="Enter the plant price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>
        </Flex>

        {formValidation && (
          <Callout.Root className="mt-2">
            <Callout.Icon>
              <BiInfoCircle />
            </Callout.Icon>
            <Callout.Text>{formValidation}</Callout.Text>
          </Callout.Root>
        )}

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button type="submit">Add Plant</Button>
        </Flex>
      </form>
    </Dialog.Content>
  );
};
export default PlantForm;
