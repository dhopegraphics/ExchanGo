import React, { createContext, useContext, useRef } from "react";

import Toast, { IToast } from "@/hooks/Toast";

const ToastContext = createContext<{
  showToast: (
    text: string,
    type: "info" | "success" | "error",
    duration: number
  ) => void;
}>({
  showToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toastRef = useRef<IToast>(null);

  const showToast = (
    text: string,
    type: "info" | "success" | "error",
    duration: number
  ) => {
    toastRef.current?.show(text, type, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast ref={toastRef} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
