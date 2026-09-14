import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

/**
 * Contact Form Validation Schema
 * 
 * Validates all user inputs with appropriate length limits
 * and format requirements for security and data integrity.
 */
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * ContactForm Component
 * 
 * Contact form with real-time validation, loading states, and toast notifications.
 * Currently UI-only (no backend integration).
 * 
 * Features:
 * - Real-time validation using react-hook-form + zod
 * - Loading spinner during submission
 * - Success/error toast notifications via Sonner
 * - Black focus rings matching design spec
 * - Proper input sanitization and length limits
 * 
 * Security:
 * - Client-side validation with zod schema
 * - Input length limits and trimming
 * - Email format validation
 */
export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call delay (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // UI-only: Show success toast
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset form after successful submission
      reset();
    } catch (error) {
      // Handle any errors
      toast.error("Something went wrong", {
        description: "Please try again later or contact me directly via email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-neutral-950"
        >
          Full Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register("name")}
          disabled={isSubmitting}
          className="focus-visible:ring-neutral-950"
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p className="text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-neutral-950"
        >
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          disabled={isSubmitting}
          className="focus-visible:ring-neutral-950"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-neutral-950"
        >
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Tell me about your project..."
          rows={6}
          {...register("message")}
          disabled={isSubmitting}
          className="focus-visible:ring-neutral-950 resize-none"
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <p className="text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
};
