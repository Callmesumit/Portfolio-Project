import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import axios from "axios";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sumitdevda6@gmail.com",
    href: "mailto:sumitdevda6@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9516787083",
    href: "tel:+919516787083",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Vijay Nagar, Indore, India",
    href: "https://www.google.com/maps/search/Vijay+Nagar+Indore",
  },
];

export const Contact = () => {
  // ✅ MISSING STATES (FIXED)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    type: null, // "success" | "error"
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await axios.post("http://localhost:5000/api/contact", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium uppercase">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Let's build{" "}
            <span className="font-serif italic font-normal text-white">
              something great.
            </span>
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind? I'd love to hear about it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div className="glass p-8 rounded-3xl border border-primary/30">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface rounded-xl border outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email" // ✅ FIXED
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface rounded-xl border outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface rounded-xl border outline-none resize-none"
                />
              </div>

              <Button className="w-full" type="submit" size="lg" disabled={isLoading}>
                {isLoading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              {submitStatus.type && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
