import { toast } from "react-hot-toast";

export const notifySuccess = (message = "Success") =>
  toast.success(message, {
    icon: "👏",
  });