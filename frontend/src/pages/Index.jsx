import { useEffect, useCallback } from "react";
import { ContactList } from "../components/ContactList";
import { BookUser } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useContacts } from "../hooks/useContacts";
import { ContactForm } from "../components/ContactForm";

const Index = () => {
  const {
    contacts,
    isLoading,
    isSubmitting,
    fetchContacts,
    createContact,
    deleteContact,
  } = useContacts();

  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        await createContact(data);
        toast({
          title: "Success!",
          description: `${data.name} has been added to your contacts.`,
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add contact. Please try again.",
          variant: "destructive",
        });
      }
    },
    [createContact, toast]
  );

  const handleDelete = useCallback(
    async (id) => {
      const contact = contacts.find((c) => c.id === id);
      try {
        await deleteContact(id);
        toast({
          title: "Contact deleted",
          description: contact
            ? `${contact.name} has been removed.`
            : "Contact removed.",
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete contact. Please try again.",
          variant: "destructive",
        });
      }
    },
    [deleteContact, contacts, toast]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookUser className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Contact Manager
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your contacts efficiently
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div className="lg:order-1">
            <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>

          {/* List Column */}
          <div className="lg:order-2">
            <ContactList
              contacts={contacts}
              isLoading={isLoading}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto py-6">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          Contact Management App — Built with React
        </div>
      </footer>
    </div>
  );
};

export default Index;
