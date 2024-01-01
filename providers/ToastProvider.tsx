"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return  <Toaster
                  reverseOrder={false}
                  position='top-center'
                  toastOptions={{
                    style: {
                      borderRadius: "8px",
                      background: "#333",
                      color: "#fff",
                    },
                  }}
            />
};

export default ToastProvider;
