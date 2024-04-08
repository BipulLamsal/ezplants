import React, { useEffect, useState } from "react";
import { Table } from "@radix-ui/themes";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customers");
      if (!response.ok) {
        throw new Error("Failed to fetch transaction data");
      }
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  return (
    <div>
      <Table.Root variant="surface" className="mt-4">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Total Requested</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Total Expenses</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((tra) => (
            <Table.Row key={tra._id}>
              <Table.RowHeaderCell>{tra.fullname}</Table.RowHeaderCell>
              <Table.Cell>{tra.email}</Table.Cell>
              <Table.Cell>{tra.numTransactions}</Table.Cell>
              <Table.Cell>$ {tra.totalPrice}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default UserTable;
