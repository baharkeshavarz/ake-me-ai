"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return  <Toaster
                  reverseOrder={false}
                  position='top-center'
                  toastOptions={{
                    className: "text-sm",
                    style: {
                      borderRadius: "8px",
                      background: "#333",
                      color: "#fff",
                    },
                  }}
            />
};

export default ToastProvider;
