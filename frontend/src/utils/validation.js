export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex =
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
  return phone.length >= 10 && phoneRegex.test(phone.replace(/\s/g, ""));
};

export const validateContactForm = (data) => {
  const errors = {};

  // Name
  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (data.name.trim().length > 100) {
    errors.name = "Name must be less than 100 characters";
  }

  // Email
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  } else if (data.email.trim().length > 255) {
    errors.email = "Email must be less than 255 characters";
  }

  // Phone
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!validatePhone(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number";
  }

  return errors;
};

export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};
