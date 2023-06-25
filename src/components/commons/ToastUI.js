import { Toaster } from "react-hot-toast";

export const ToastUI = () => (
  <Toaster
    toastOptions={{
      success: {
        style: {
          background: "#67c69a",
        },
      },
      error: {
        style: {
          background: "red",
        },
      },
    }}
  />
);