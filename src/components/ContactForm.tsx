import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, Loader2, Copy, ExternalLink } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/rishithagorupati@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: `[Website Message] ${formData.subject} - from ${formData.name}`,
          subject: formData.subject,
          message: formData.message,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json();

      // Strictly validate the response — no false positives
      if (response.ok && (data.success === "true" || data.success === true)) {
        setStatus("success");
      } else {
        // API returned an error or activation is needed
        const needsActivation = data.message && data.message.toLowerCase().includes("activation");
        setStatus("error");
        setStatusMessage(
          needsActivation
            ? "The contact form needs a one-time activation by the author. Please use one of the direct options below to send your message."
            : "The message could not be delivered automatically. Please use one of the direct options below to send your message."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Could not connect to the email service. Please use one of the direct options below to send your message."
      );
    }
  };

  const subjectText = formData.subject || "Inquiry for Rishitha Gorupati";
  const bodyText = `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`;

  const mailtoHref = `mailto:rishithagorupati@gmail.com?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(bodyText)}`;

  const gmailHref = `https://mail.google.com/mail/?view=cm&to=rishithagorupati@gmail.com&su=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(bodyText)}`;

  const handleCopyMessage = () => {
    const text = `To: rishithagorupati@gmail.com\nSubject: ${subjectText}\n\n${bodyText}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-8 sm:p-12 shadow-sm">
      {status === "success" ? (
        <div className="text-center py-8 space-y-4 animate-fadeIn">
          <CheckCircle2 className="w-12 h-12 text-[#856E4E] mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl text-[#221E1B] font-medium">
            Message Sent to Rishitha
          </h3>
          <p className="font-serif italic text-base text-[#5C564E] max-w-md mx-auto leading-relaxed">
            Thank you for reaching out, <span className="text-[#221E1B] font-medium">{formData.name}</span>. Your message has been delivered to{" "}
            <span className="font-mono text-[#856E4E]">rishithagorupati@gmail.com</span>. Rishitha will review your message and reply to{" "}
            <span className="font-mono text-[#221E1B]">{formData.email}</span> shortly.
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                setStatus("idle");
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
              className="px-6 py-2.5 border border-[#856E4E] text-xs uppercase tracking-widest text-[#856E4E] hover:bg-[#856E4E] hover:text-white transition-colors rounded-sm"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="p-5 bg-[#FDF8F2] border border-[#E5DDCF] rounded-sm space-y-4">
              <div className="flex items-start space-x-3 text-xs text-[#5C564E]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#856E4E]" />
                <p className="leading-relaxed">{statusMessage}</p>
              </div>

              {/* Direct send alternatives always available */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#856E4E]">
                  Direct Contact Options:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={gmailHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2.5 bg-[#221E1B] text-[#FDFBF7] text-[11px] uppercase tracking-[0.14em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-2" />
                    Open in Gmail
                  </a>
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center px-4 py-2.5 border border-[#D5C7B2] bg-white text-[#4B453E] text-[11px] uppercase tracking-[0.14em] font-medium rounded-sm hover:border-[#856E4E] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 mr-2 text-[#856E4E]" />
                    Open in Mail App
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center px-4 py-2.5 border border-[#D5C7B2] bg-white text-[#4B453E] text-[11px] uppercase tracking-[0.14em] font-medium rounded-sm hover:border-[#856E4E] transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 mr-2 text-[#856E4E]" />
                    {copied ? "Copied!" : "Copy Email / Message"}
                  </button>
                </div>
              </div>
            </div>
          )}

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
              className="w-full sm:w-auto px-8 py-3.5 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.18em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#856E4E] disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                  <span>Sending to Author...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </button>

            <div className="flex items-center space-x-2 text-xs text-[#736B61]">
              <span>
                Delivers to <strong className="text-[#221E1B]">rishithagorupati@gmail.com</strong>
              </span>
              <span>•</span>
              <a
                href={mailtoHref}
                className="text-[#856E4E] hover:underline"
                title="Send using your mail app directly"
              >
                Send via Email App
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
