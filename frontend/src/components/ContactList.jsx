import React, { useMemo, useState } from "react";
import { ContactCard } from "./ContactCard";
import { Users, Search, ArrowUpDown, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";


export const ContactList = ({ contacts, isLoading, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredAndSortedContacts = useMemo(() => {
    let result = [...contacts];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.phone.includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison =
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [contacts, searchQuery, sortField, sortOrder]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg border-border/50 animate-fade-in">
        <CardContent className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-border/50 animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Contacts
            <span className="text-sm font-normal text-muted-foreground ml-1">
              ({contacts.length})
            </span>
          </CardTitle>
        </div>

        {contacts.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort Buttons */}
            <div className="flex gap-2">
              <Button
                variant={sortField === "name" ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleSort("name")}
                className="text-xs"
              >
                <ArrowUpDown className="h-3 w-3 mr-1" />
                Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button
                variant={sortField === "created_at" ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleSort("created_at")}
                className="text-xs"
              >
                <ArrowUpDown className="h-3 w-3 mr-1" />
                Date{" "}
                {sortField === "created_at" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">
              No contacts yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Add your first contact using the form
            </p>
          </div>
        ) : filteredAndSortedContacts.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">
              No matches found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search query
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedContacts.map((contact) => (
              <ContactCard
                key={contact._id}
                contact={contact}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
