import { useState, useEffect } from "react";

export const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine);
  const handelChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handelChange);
    window.addEventListener("offline", handelChange);
    return () => {
      window.removeEventListener("online", handelChange);
      window.removeEventListener("offline", handelChange);
    };
  }, []);
  return status;
};
