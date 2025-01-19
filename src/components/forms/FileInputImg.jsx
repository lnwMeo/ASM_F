import { useEffect, useState ,useRef} from "react";
import PropTypes from "prop-types";
const FileInputImg = ({ onFileSelect, reset = false }) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null); // สร้าง ref สำหรับ <input type="file" />
  useEffect(() => {
    if (reset) {
      setPreview(null);
      setSelectedFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [reset]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div>
      {preview && (
        <img src={preview} alt="Preview" className="w-full xl:max-w-md" />
      )}
      <input
        className="w-full px-1 py-1 border rounded-md mt-1 bg-white"
        ref={inputRef}
        type="file"
        onChange={handleFileChange} required
      />
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      <p className="mt-1 text-xs text-gray-600" id="file_input_help">
        png, jpg, or webp
      </p>
    </div>
  );
};

// เพิ่ม propTypes เพื่อการตรวจสอบ props
FileInputImg.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  reset: PropTypes.bool,
};


export default FileInputImg;
