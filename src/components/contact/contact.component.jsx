"use client";
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="bg-[#f9f9f9] py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl font-bold text-[#b42166]">Get in Touch</h2>
          <p className="text-gray-700">
            We are here to assist you with all your car sales and rental needs.
          </p>
          <div>
            <p className="text-lg font-semibold text-[#a72376]">Location:</p>
            <div className="flex items-center justify-start">
              <FaMapMarkerAlt className="text-xl text-gray-700 mr-2 mb-3" />
              <p className="text-gray-700">Yaoundé, Cameroon</p>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-[#a72376]">Phone:</p>
            <div className="flex items-center justify-start">
              <FaPhoneAlt className="text-xl text-gray-700 mr-2 mb-3" />
              <p className="text-gray-700 font-semibold">
                +237 674 75 72 43
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/237674757243"
            target="_blank"
            className="contact-link"
          >
            <span>Chat on WhatsApp</span>
            <FaWhatsapp size={25} style={{ marginLeft: 5 }} />
          </a>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          <h3 className="text-2xl font-bold text-[#b42166] mb-4 text-center">
            Send Us a Message
          </h3>
          <form className="space-y-10">
            <div className="mb-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b42166]"
              />
            </div>

            <div className="mb-5">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b42166]"
              />
            </div>

            <div className="mb-5">
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b42166]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#b42166] text-white font-semibold rounded-md shadow-md hover:bg-[#a72376] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
