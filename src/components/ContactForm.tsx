import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _gotcha: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _gotcha: formData._gotcha,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          _gotcha: "",
        });
      } else {
        setStatus("error");
        setStatusMessage(
          data.error || "Unable to send your message right now. Please try again later."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage("Unable to send your message right now. Please try again later.");
    }
  };

  return (
    <div className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-8 sm:p-12 shadow-sm">
      {status === "success" ? (
        <div className="text-center py-8 space-y-4 animate-fadeIn">
          <CheckCircle2 className="w-12 h-12 text-[#856E4E] mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl text-[#221E1B] font-medium">
            Message Sent Successfully
          </h3>
          <p className="font-serif italic text-base text-[#5C564E] max-w-md mx-auto leading-relaxed">
            Message sent successfully. Thank you for contacting Rishitha.
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                setStatus("idle");
                setStatusMessage("");
              }}
              className="px-6 py-2.5 border border-[#856E4E] text-xs uppercase tracking-widest text-[#856E4E] hover:bg-[#856E4E] hover:text-white transition-colors rounded-sm cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="p-4 bg-[#FDF8F2] border border-[#E5DDCF] rounded-sm">
              <div className="flex items-start space-x-3 text-xs text-[#5C564E]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#856E4E]" />
                <p className="leading-relaxed">
                  {statusMessage || "Unable to send your message right now. Please try again later."}
                </p>
              </div>
            </div>
          )}

          {/* Anti-spam honeypot field (hidden from real users) */}
          <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
            <label htmlFor="_gotcha">Do not fill this field</label>
            <input
              id="_gotcha"
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={formData._gotcha}
              onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4B453E]"
              >
                Your Name <span className="text-[#856E4E]">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Eleanor Vance"
                className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm text-[#221E1B] placeholder-[#A0988E] focus:outline-none focus:border-[#856E4E] focus:ring-1 focus:ring-[#856E4E] transition-all"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4B453E]"
              >
                Email Address <span className="text-[#856E4E]">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                maxLength={254}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. eleanor@example.com"
                className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm text-[#221E1B] placeholder-[#A0988E] focus:outline-none focus:border-[#856E4E] focus:ring-1 focus:ring-[#856E4E] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="subject"
              className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4B453E]"
            >
              Subject <span className="text-[#856E4E]">*</span>
            </label>
            <input
              id="subject"
              type="text"
              required
              maxLength={200}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Regarding That Day is Inevitable / Reading Invitation"
              className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm text-[#221E1B] placeholder-[#A0988E] focus:outline-none focus:border-[#856E4E] focus:ring-1 focus:ring-[#856E4E] transition-all"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="message"
              className="block text-xs uppercase tracking-[0.14em] font-medium text-[#4B453E]"
            >
              Message <span className="text-[#856E4E]">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              required
              maxLength={5000}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Share your thoughts, reflections on That Day is Inevitable, questions, or collaboration requests..."
              className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#E0D8CB] rounded-sm text-sm text-[#221E1B] placeholder-[#A0988E] focus:outline-none focus:border-[#856E4E] focus:ring-1 focus:ring-[#856E4E] transition-all resize-y font-serif"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.18em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#856E4E] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </button>

            <div className="flex items-center space-x-2 text-xs text-[#736B61]">
              <span>Directly delivered to author&apos;s inbox</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
