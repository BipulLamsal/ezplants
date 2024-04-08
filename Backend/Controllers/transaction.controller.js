const Transaction = require("../Models/transaction.model");

exports.createTransactions = async (req, res) => {
  try {
    const transactions = [];
    for (const plant of req.body) {
      const { _id, quantity } = plant;
      const transactionData = {
        plant: _id,
        quantity,
        customer: req.user.id,
        transactionDateTime: new Date(),
        approveStatus: false,
      };
      const transaction = new Transaction(transactionData);
      const savedTransaction = await transaction.save();
      transactions.push(savedTransaction);
    }
    res.status(201).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("plant")
      .populate("customer")
      .sort({ transactionDateTime: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
