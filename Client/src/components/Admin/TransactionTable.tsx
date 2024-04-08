import React, { useEffect, useState } from "react";
import { Table } from "@radix-ui/themes";

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/transaction");
      if (!response.ok) {
        throw new Error("Failed to fetch transaction data");
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  return (
    <div>
      <Table.Root variant="surface" className="mt-4">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Plant</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Total Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Customer Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {transactions.map((tra) => (
            <Table.Row key={tra._id}>
              <Table.RowHeaderCell>{tra.plant.name}</Table.RowHeaderCell>
              <Table.Cell>{tra.quantity}</Table.Cell>
              <Table.Cell>$ {tra.plant.price * tra.quantity}</Table.Cell>
              <Table.Cell>{tra.customer.email}</Table.Cell>
              <Table.Cell>{tra.transactionDateTime}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TransactionTable;
