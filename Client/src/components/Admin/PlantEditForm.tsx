import React, { useState, useEffect, useRef } from "react";
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
  plantData: {
    _id: string;
    name: string;
    description: string;
    image: string;
    stock: string;
    price: string;
  };
  onUpdatePlant: () => void;
}

const PlantEditForm: React.FC<PlantFormProps> = ({
  plantData,
  onUpdatePlant,
}) => {
  const [formValidation, setFormValidation] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: plantData.name,
    description: plantData.description,
    image: plantData.image,
    stock: plantData.stock,
    price: plantData.price,
  });
  const buttonRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    setFormData(plantData);
  }, [plantData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleClose = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log(`http://localhost:3000/api/plants/${formData._id}`);
      const response = await fetch(
        `http://localhost:3000/api/plants/${formData._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            image: formData.image,
            stock: formData.stock,
            price: formData.price,
          }),
        }
      );
      let json = await response.json();
      console.log(json);
      if (!json.success) {
        setFormValidation(json.error);
      } else {
        onUpdatePlant();
        handleClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog.Content maxWidth="450px">
      <Dialog.Title>Edit Plant</Dialog.Title>

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
            <Button variant="soft" color="gray" ref={buttonRef}>
              Cancel
            </Button>
          </Dialog.Close>
          <Button type="submit" onClick={handleSubmit}>
            Update Plant
          </Button>
        </Flex>
      </form>
    </Dialog.Content>
  );
};

export default PlantEditForm;
