// Import useState hook from React
import { useState } from "react";

// Import core React Native UI components
import { View, Text, TextInput, TouchableOpacity } from "react-native";

// Import picker select component for dropdowns
import RNPickerSelect from "react-native-picker-select";

import styles from "../styles";

// The five categories required by the assignment
const CATEGORIES = [
  { label: "Food", value: "Food" },
  { label: "Transportation", value: "Transportation" },
  { label: "Education", value: "Education" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Other", value: "Other" },
];

// Collects the expense data, validates it, and hands it to the parent
export default function ExpenseForm({ onAddExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    // Description must not be empty or only spaces
    if (description.trim() === "") {
      setError("Please enter an expense description.");
      return;
    }

    // Amount must be a valid positive number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid positive amount.");
      return;
    }

    // A category must be selected
    if (!category) {
      setError("Please select a category.");
      return;
    }

    // Valid input: send it up to ExpenseTracker
    onAddExpense({
      id: Date.now().toString(),
      description: description.trim(),
      amount: parsedAmount,
      category: category,
    });

    // Reset the form
    setDescription("");
    setAmount("");
    setCategory("");
    setError("");
  };

  return (
    <View style={styles.section}>
      <Text style={styles.header}>Add New Expense</Text>

      {error !== "" && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.label}>Expense Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter expense description"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          items={CATEGORIES}
          value={category}
          placeholder={{ label: "Select a category...", value: "" }}
          style={{
            inputAndroid: styles.picker,
            inputIOS: styles.picker,
            inputWeb: styles.picker,
          }}
          useNativeAndroidPickerStyle={false}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
}
