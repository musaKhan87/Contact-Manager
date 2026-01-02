import { useState, useCallback, useMemo } from "react";

import { User, Mail, Phone, MessageSquare, Send, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { validateContactForm, isFormValid } from "../utils/validation";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export const ContactForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy[field];
          return copy;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (field) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const validationErrors = validateContactForm(formData);
      if (validationErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
      }
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const validationErrors = validateContactForm(formData);
      setErrors(validationErrors);
      setTouched({ name: true, email: true, phone: true });

      if (isFormValid(validationErrors)) {
        await onSubmit(formData);
        setFormData(initialFormData);
        setTouched({});
      }
    },
    [formData, onSubmit]
  );

  const currentErrors = useMemo(
    () => validateContactForm(formData),
    [formData]
  );

  const canSubmit = useMemo(() => {
    return (
      isFormValid(currentErrors) &&
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim()
    );
  }, [currentErrors, formData]);

  return (
    <Card className="shadow-lg border-border/50">
      <CardHeader>
        <CardTitle>Add New Contact</CardTitle>
        <CardDescription>Fill in the details to add a contact</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium flex items-center gap-2"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className={`transition-all ${
                touched.name && errors.name
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
              aria-invalid={touched.name && !!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {touched.name && errors.name && (
              <p
                id="name-error"
                className="text-sm text-destructive animate-fade-in"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`transition-all ${
                touched.email && errors.email
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {touched.email && errors.email && (
              <p
                id="email-error"
                className="text-sm text-destructive animate-fade-in"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Phone className="h-4 w-4 text-muted-foreground" />
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              className={`transition-all ${
                touched.phone && errors.phone
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
              aria-invalid={touched.phone && !!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {touched.phone && errors.phone && (
              <p
                id="phone-error"
                className="text-sm text-destructive animate-fade-in"
              >
                {errors.phone}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-sm font-medium flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              Message{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Enter any additional notes..."
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="min-h-[100px] resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground text-right">
              {formData.message.length}/1000
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full font-medium"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Contact...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Add Contact
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
