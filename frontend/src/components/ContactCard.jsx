import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/Button";
import {
  Mail,
  Phone,
  MessageSquare,
  Trash2,
  Loader2,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

export const ContactCard = ({ contact, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(contact._id || contact.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const getInitials = (name = "") => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name = "") => {
    const colors = [
      "bg-blue-500",
      "bg-emerald-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-rose-500",
      "bg-cyan-500",
    ];
    if (!name) return colors[0];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const formattedDate = contact.created_at
    ? (() => {
        const d = new Date(contact.created_at);
        return isNaN(d.getTime()) ? "Unknown date" : format(d, "MMM d, yyyy");
      })()
    : "Unknown date";

  return (
    <Card className="group shadow-sm hover:shadow-md transition-all duration-200 border-border/50 animate-slide-up">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-full ${getAvatarColor(
              contact.name
            )} flex items-center justify-center text-white font-semibold text-sm`}
          >
            {getInitials(contact.name)}
          </div>

          {/* Contact Info */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground truncate">
                {contact.name || "Unnamed"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Delete contact"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="space-y-1.5 text-sm">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors truncate"
                >
                  <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{contact.email}</span>
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{contact.phone}</span>
                </a>
              )}
            </div>

            {contact.message && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground pt-1">
                <MessageSquare className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                <p className="line-clamp-2">{contact.message}</p>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
              <Calendar className="h-3 w-3" />
              <span>Added {formattedDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
