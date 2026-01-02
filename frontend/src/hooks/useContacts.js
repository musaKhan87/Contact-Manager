import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "https://contact-manager-xb8v.onrender.com/api/contacts";

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GET - Fetch all contacts
  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(API_URL);
      setContacts(data);
    } catch (error) {
      console.error("Fetch contacts error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // POST - Create contact
  const createContact = useCallback(async (formData) => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/json" },
      });

      // Add new contact to UI immediately
      setContacts((prev) => [data.contact, ...prev]);

      return data.contact;
    } catch (error) {
      console.error("Create contact error:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // DELETE - Remove contact
  const deleteContact = useCallback(async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete contact error:", error);
      throw error;
    }
  }, []);

  return {
    contacts,
    isLoading,
    isSubmitting,
    fetchContacts,
    createContact,
    deleteContact,
  };
};
