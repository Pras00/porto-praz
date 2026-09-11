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
  errorMessage?: string;
  
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
  errorMessage: undefined,

  setName: (name) => set((state) => ({ 
    name, 
    status: state.status === 'error' ? 'idle' : state.status,
    errorMessage: undefined,
    errors: { ...state.errors, name: undefined } 
  })),

  setEmail: (email) => set((state) => ({ 
    email, 
    status: state.status === 'error' ? 'idle' : state.status,
    errorMessage: undefined,
    errors: { ...state.errors, email: undefined } 
  })),

  setMessage: (message) => set((state) => ({ 
    message, 
    status: state.status === 'error' ? 'idle' : state.status,
    errorMessage: undefined,
    errors: { ...state.errors, message: undefined } 
  })),

  resetForm: () => set({
    name: '',
    email: '',
    message: '',
    status: 'idle',
    errors: {},
    errorMessage: undefined,
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
    const { validateForm, name, email, message } = get();
    
    if (!validateForm()) {
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey.trim() === '' || accessKey === 'your_web3forms_access_key_here') {
      set({
        status: 'error',
        errorMessage: 'Web3Forms Access Key belum dikonfigurasi di file .env.local',
      });
      return;
    }

    set({ status: 'submitting', errorMessage: undefined });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey.trim(),
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          from_name: `${name.trim()} (Portfolio)`,
          subject: `New message from ${name.trim()} via Portfolio`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        set({ status: 'success', name: '', email: '', message: '', errorMessage: undefined });
        if (onSubmitSuccess) onSubmitSuccess();
      } else {
        set({
          status: 'error',
          errorMessage: data.message || 'Gagal mengirim pesan. Silakan coba lagi nanti.',
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      set({
        status: 'error',
        errorMessage: 'Terjadi gangguan jaringan saat mengirim pesan. Silakan coba lagi.',
      });
    }
  }
}));
