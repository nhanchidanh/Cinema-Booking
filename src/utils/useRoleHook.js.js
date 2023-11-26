import { useSelector } from "react-redux";

export const useRoleHook = () => {
  const user = useSelector((state) => state.user);
  const isMangement = user?.position === 1;
  const isEmployee = user?.position === 2;
  return {
    user,
    isMangement,
    isEmployee,
  };
};
