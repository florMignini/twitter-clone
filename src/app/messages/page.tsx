"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export const Messages = () => {
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return(
    <h1>Messages</h1>
    )
};
