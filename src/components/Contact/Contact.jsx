import { memo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import {
  FaEnvelope,
  FaUser,
  FaPaperPlane,
  FaPhone,
  FaMapMarkerAlt,
  FaRocket,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.message.trim()
      ) {
        return;
      }

      setIsSubmitting(true);

      try {
        await emailjs.send(
          "service_ermp125", //service ID
          "template_6jmsuem", //template ID
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          "NyFYJGObUaA1UQvOZ" //public key
        );

        toast.success("Message sent successfully!!!", {
          duration: 2000,
        });
        setFormData({ name: "", email: "", message: "" });
      } catch {
        toast.error("Failed to send message!", { duration: 2000 });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "sabashamsun@gmail.com",
      href: "mailto:sabashamsun@gmail.com",
      color: "text-blue-400",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: " +1(409)6594499",
      href: "tel:+14096594499",
      color: "text-green-400",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Beaumont, Texas, United States",
      href: "https://maps.app.goo.gl/ZXbAJZHJE1tf5NWG7",
      color: "text-purple-400",
    },
  ];
  return (
    <section className="section-padding pt-12  lg:pt-20">
      <div className="max-w-6xl mx-auto mt-6 md:mt-8 lg:mt-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-8"
        >
          <FaRocket className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-gray-300">
            Contact With Me
          </span>
        </motion.div>
        {/* main content */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-2 py-4 md:p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <FaPaperPlane className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl font-bold">
                    Send Message
                  </h2>
                  <p className="text-gray-100 text-sm">
                    I’d love to hear from you
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium text-white mb-3">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 md:p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                      placeholder="Shamsun Nahar"
                      required
                    />
                  </div>
                  <div>
                    <label className="block  font-medium text-white mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 md:p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                      placeholder="sabashamsun@gmail.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-white mb-3">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 "
                    placeholder="Enter your message..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-2 md:p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-4 h-4 md:w-5 md:h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* contact information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 md:space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl mx-auto  p-2 py-4 md:p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <FaUser className="h-5 w-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl font-bold">
                    Contact Info
                  </h2>
                  <p className="text-gray-100 text-sm">Get in touch with me</p>
                </div>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="group"
                    >
                      <a
                        href={info.href}
                        className="flex items-center gap-2 md:gap-4 p-2 md:p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10 group-hover:scale-[1.02]"
                      >
                        <div
                          className={`w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center ${info.color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className=" text-white mb-1">{info.label}</p>
                          <p className="text-white font-medium">{info.value}</p>
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* toast on the Top */}
      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default memo(Contact);
