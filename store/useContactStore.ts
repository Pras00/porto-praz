import { create } from 'zustand';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactState {
  name: string;
  email: string;
  message: string;
  status: FormStatus;
  errors: FormErrors;
  
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setMessage: (message: string) => void;
  resetForm: () => void;
  validateForm: () => boolean;
  submitForm: (onSubmitSuccess?: () => void) => Promise<void>;
}

export const useContactStore = create<ContactState>((set, get) => ({
  name: '',
  email: '',
  message: '',
  status: 'idle',
  errors: {},

  setName: (name) => set((state) => ({ 
    name, 
    errors: { ...state.errors, name: undefined } 
  })),

  setEmail: (email) => set((state) => ({ 
    email, 
    errors: { ...state.errors, email: undefined } 
  })),

  setMessage: (message) => set((state) => ({ 
    message, 
    errors: { ...state.errors, message: undefined } 
  })),

  resetForm: () => set({
    name: '',
    email: '',
    message: '',
    status: 'idle',
    errors: {}
  }),

  validateForm: () => {
    const { name, email, message } = get();
    const errors: FormErrors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else if (message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
      isValid = false;
    }

    set({ errors });
    return isValid;
  },

  submitForm: async (onSubmitSuccess) => {
    const { validateForm } = get();
    
    if (!validateForm()) {
      return;
    }

    set({ status: 'submitting' });

    try {
      // Simulate API call to send message
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      set({ status: 'success' });
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
      set({ status: 'error' });
    }
  }
}));
