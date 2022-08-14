import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Info = (msg) => {
  toast.warn(msg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
  });
};
