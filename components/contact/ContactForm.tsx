import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/Button';
import { CheckCircleIcon } from 'lucide-react';
export function ContactForm() {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLDivElement>(null);
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && formRef.current) {
        // Animate the form container
        formRef.current.style.opacity = '1';
        formRef.current.style.transform = 'translateY(0)';
        formRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        // Animate form fields with staggered timing
        formFieldsRef.current.forEach((field, index) => {
          if (field) {
            setTimeout(() => {
              field.style.opacity = '1';
              field.style.transform = 'translateY(0)';
              field.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, 150 * (index + 1));
          }
        });
      }
    }, {
      threshold: 0.2
    });
    if (formRef.current) {
      observer.observe(formRef.current);
    }
    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      message: ''
    };
    let isValid = true;
    if (!formState.fullName.trim()) {
      newErrors.fullName = 'Please enter your name';
      isValid = false;
    }
    if (!formState.email.trim()) {
      newErrors.email = 'Please enter your email';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    if (!formState.message.trim()) {
      newErrors.message = 'Please enter your message';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/contact-form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormState({
          fullName: '',
          email: '',
          phone: '',
          message: ''
        });
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        // If there are validation errors from the server, show them
        if (result.errors && Array.isArray(result.errors)) {
          const serverErrors = { fullName: '', email: '', message: '' };
          result.errors.forEach((error: string) => {
            if (error.toLowerCase().includes('name')) {
              serverErrors.fullName = error;
            } else if (error.toLowerCase().includes('email')) {
              serverErrors.email = error;
            } else if (error.toLowerCase().includes('message')) {
              serverErrors.message = error;
            }
          });
          setErrors(serverErrors);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div ref={formRef} className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-10 shadow-xl hover:border-orange-500/50 transition-all duration-300" style={{
    opacity: 0,
    transform: 'translateY(20px)'
  }}>
      <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-50 transition-colors duration-300">Send a Message</h2>
      {submitStatus === 'success' && <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg animate-fade-in flex items-center">
          <CheckCircleIcon size={20} className="mr-2 text-green-600" />
          Thank you for your message! I'll get back to you as soon as possible.
        </div>}
      {submitStatus === 'error' && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg animate-fade-in">
          There was an error sending your message. Please try again or contact
          me directly.
        </div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div ref={el => { if (el) formFieldsRef.current[0] = el; }} style={{
        opacity: 0,
        transform: 'translateY(15px)'
      }}>
          <label htmlFor="fullName" className="block text-slate-700 dark:text-slate-300 font-medium mb-2 transition-colors duration-300">
            Full Name <span className="text-orange-500">*</span>
          </label>
          <input type="text" id="fullName" name="fullName" value={formState.fullName} onChange={handleChange} placeholder="Your full name" className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ${errors.fullName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`} />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>
        <div ref={el => { if (el) formFieldsRef.current[1] = el; }} style={{
        opacity: 0,
        transform: 'translateY(15px)'
      }}>
          <label htmlFor="email" className="block text-slate-700 dark:text-slate-300 font-medium mb-2 transition-colors duration-300">
            Email Address <span className="text-orange-500">*</span>
          </label>
          <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} placeholder="your@email.com" className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div ref={el => { if (el) formFieldsRef.current[2] = el; }} style={{
        opacity: 0,
        transform: 'translateY(15px)'
      }}>
          <label htmlFor="phone" className="block text-slate-700 dark:text-slate-300 font-medium mb-2 transition-colors duration-300">
            Phone Number <span className="text-slate-500 dark:text-slate-500">(Optional)</span>
          </label>
          <input type="tel" id="phone" name="phone" value={formState.phone} onChange={handleChange} placeholder="+27 (12) 345-6789" className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" />
        </div>
        <div ref={el => { if (el) formFieldsRef.current[3] = el; }} style={{
        opacity: 0,
        transform: 'translateY(15px)'
      }}>
          <label htmlFor="message" className="block text-slate-700 dark:text-slate-300 font-medium mb-2 transition-colors duration-300">
            Message <span className="text-orange-500">*</span>
          </label>
          <textarea id="message" name="message" value={formState.message} onChange={handleChange} rows={5} placeholder="Tell us about your project..." className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ${errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none`} />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        <div ref={el => { if (el) formFieldsRef.current[4] = el; }} className="pt-2" style={{
        opacity: 0,
        transform: 'translateY(15px)'
      }}>
          <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span> : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>;
}