"use client";

import { motion } from "framer-motion";

export default function EventFeeAndRegistration() {
  return (
    <section className="bg-black text-white py-12 sm:py-20 font-geist">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-8 sm:mb-12"
        >
          Event Fee & Registration
        </motion.h2>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-white/10 rounded-lg p-6 sm:p-8 mb-8 backdrop-blur-sm"
          >
            <h3 className="text-lg sm:text-xl font-normal mb-4 font-mono">
              Event Fee Solo
            </h3>
            <p className="text-2xl sm:text-3xl md:text-4xl">₹60</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-white/10 rounded-lg p-6 sm:p-8 mb-8 backdrop-blur-sm"
          >
            <h3 className="text-lg sm:text-xl font-normal mb-4 font-mono">
              Event Fee team
            </h3>
            <p className="text-2xl sm:text-3xl md:text-4xl">₹100</p>
          </motion.div>
          <motion.a
            href="https://forms.gle/ejJ8hfMXfLjpwVh38"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-white text-black font-medium text-lg sm:text-xl py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300"
          >
            Register Now
          </motion.a>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            {/* <h3 className="text-lg sm:text-xl font-normal mb-4 font-mono">
              Payment QR Codes
            </h3> */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <motion.img
                  key={index}
                  src={`/qr-code-${index + 1}.png`}
                  alt={`QR Code ${index + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-auto border border-white/10 rounded-lg hover:border-white/20 transition-all duration-300"
                />
              ))}
            </div> */}
            <p className="text-sm text-gray-400 mt-4">
              *If one QR code payment does not work, please try another.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
