export const CalculateTotalAmount = (fields) => {
  return fields.reduce(
    (sum, field) => sum + (parseFloat(field.amount) || 0),
    0
  );
};
