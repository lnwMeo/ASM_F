import { Navigate } from "react-router-dom";
import useAsmStore from "../store/asm-store";

const ProtectRouter = ({ element }) => {
  const user = useAsmStore((state) => state.user);
  const token = useAsmStore((state) => state.token);
  if (!user || !token) {
    return <Navigate to="/loginAD" replace />;
  }
  return element;
};

export default ProtectRouter;
