import React from "react";
import { render, screen } from "@testing-library/react";
import { NotificationList } from "./notification-list.component";

describe("Notification", () => {
  test("Renders notification list component", () => {
    render(<NotificationList />);
    expect(screen.getByText(/Notifications/)).toBeInTheDocument();
  });
});

describe("Notification", () => {
  test("Renders message from creators", () => {
    render(<NotificationList />);
    expect(screen.getByText("Message from creators")).toBeInTheDocument();
  });
});
