import { useContext } from "react";
import { AuthContext } from "../lib/authContext";

export const useAuth = () => {
    return useContext(AuthContext);
}