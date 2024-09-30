import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types for the context
interface ReminderContextType {
  isReminderEnabled: boolean;
  selectedDay: string | null;
  selectedTime: string | null;
  receiveUpdates: boolean;
  notifications: string[];
  toggleReminder: () => void;
  setDay: (day: string) => void;
  setTime: (time: string) => void;
  toggleUpdates: () => void;
  addNotification: (notification: string) => void;
  clearNotifications: () => void;
}

// Create default values for the context
const ReminderContext = createContext<ReminderContextType | undefined>(
  undefined
);

// Provide a custom hook to use the context
export const useReminder = () => {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error("useReminder must be used within a ReminderProvider");
  }
  return context;
};

// Define the provider component
interface ReminderProviderProps {
  children: ReactNode;
}

export const ReminderProvider: React.FC<ReminderProviderProps> = ({
  children,
}) => {
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [selectedTime, setSelectedTime] = useState<string>("09:30");
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Toggle reminder enabled/disabled
  const toggleReminder = () => {
    setIsReminderEnabled((prev) => !prev);
  };

  // Set the day for the reminder
  const setDay = (day: string) => {
    setSelectedDay(day);
  };

  // Set the time for the reminder
  const setTime = (time: string) => {
    setSelectedTime(time);
  };

  // Toggle whether the user wants to receive updates
  const toggleUpdates = () => {
    setReceiveUpdates((prev) => !prev);
  };

  // Add a notification to the list
  const addNotification = (notification: string) => {
    setNotifications((prev) => [...prev, notification]);
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <ReminderContext.Provider
      value={{
        isReminderEnabled,
        selectedDay,
        selectedTime,
        receiveUpdates,
        notifications,
        toggleReminder,
        setDay,
        setTime,
        toggleUpdates,
        addNotification,
        clearNotifications,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
