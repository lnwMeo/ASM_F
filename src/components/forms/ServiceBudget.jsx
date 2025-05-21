import { useEffect, useState } from "react";
import { CalculateTotalAmount } from "../../utils/CalculateTotalAmount";
import PropTypes from "prop-types";
const ServiceBudget = ({ onFieldsChange, reset = false }) => {
  const [fields, setFields] = useState([{ ServiceBudgetname: "", Amount: 0 }]);

  useEffect(() => {
    if (reset) {
      setFields([{ ServiceBudgetname: "", Amount: 0 }]);
    }
  }, [reset]);

  const handleFieldChange = (index, key, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field
    );
    setFields(updatedFields);
    onFieldsChange(updatedFields);
  };

  const addField = () => {
    setFields([...fields, { ServiceBudgetname: "", Amount: 0 }]);
  };

  const removeField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
    onFieldsChange(updatedFields);
  };

  const totalAmount = CalculateTotalAmount(
    fields.map((f) => ({ amount: f.Amount }))
  );

  return (
    <div>
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex gap-1  items-center justify-between mb-2"
        >
          <input
            type="text"
            className="w-3/5 px-1 py-1 border rounded-md"
            placeholder="กรอก ชื่อวัสดุอุปกรณ์"
            value={field.ServiceBudgetname}
            onChange={(e) =>
              handleFieldChange(index, "ServiceBudgetname", e.target.value)
            } required
          />
          <input
            type="number"
            className="w-1/5 px-1 py-1 border rounded-md"
            placeholder="กรอกเป็นตัวเลข"
            value={field.Amount}
            onChange={(e) =>
              handleFieldChange(index, "Amount", Number(e.target.value) || 0)
            } required
          />
          <p>บาท</p>

          {index === 0 ? (
            <button
              type="button"
              onClick={addField}
              className="bg-indigo-800 px-4 rounded-sm py-1 text-gray-50 hover:bg-indigo-900"
            >
              เพิ่ม
            </button>
          ) : (
            <button
              type="button"
              onClick={() => removeField(index)}
              className="bg-red-500 px-4 rounded-sm py-1 text-gray-50 hover:bg-red-700"
            >
              ลบ
            </button>
          )}
        </div>
      ))}

      <div className="mt-4 flex justify-end">
        <p className="text-md font-semibold">
          ยอดรวม: <span className="text-blue-600 text-xl">{totalAmount}</span> บาท
        </p>
      </div>
    </div>
  );
};

// เพิ่ม propTypes เพื่อการตรวจสอบ props
ServiceBudget.propTypes = {
  onFieldsChange: PropTypes.func.isRequired,
  reset: PropTypes.bool,
};

export default ServiceBudget;
