// Import useState hook from React
import { useState } from "react";

// Import core React Native UI components
import { View, Text, ScrollView } from "react-native";

import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import styles from "../styles";

// Owns the expense data and wires the form and the list together
export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);

  // Append a new expense to the existing ones
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  // Keep every expense except the one that was tapped
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Sum of every recorded amount
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal Expense Tracker</Text>
      <Text style={styles.subtitle}>Track and manage your daily expenses</Text>

      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total Expenses</Text>
        <Text style={styles.totalAmount}>৳ {total.toFixed(2)}</Text>
      </View>

      <ExpenseForm onAddExpense={addExpense} />

      <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
    </ScrollView>
  );
}
