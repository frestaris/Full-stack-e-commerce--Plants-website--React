const Contact = () => {
  return (
    <section className="contact__container py-10 px-6 lg:px-20 bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
        Get in Touch with Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div className="contact__info bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-gray-600 mb-6">
            Have questions about our plants or need help with your order? Reach
            out to us via the following methods:
          </p>

          <ul className="text-gray-700 space-y-4">
            <li>
              <strong>Location:</strong> 123 Greenhouse Lane, Plant City, FL
              12345
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+1234567890"
                className="text-green-600 hover:underline"
              >
                +1 (234) 567-890
              </a>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@plantstore.com"
                className="text-green-600 hover:underline"
              >
                support@plantstore.com
              </a>
            </li>
            <li>
              <strong>Business Hours:</strong> Mon - Sat, 9:00 AM - 6:00 PM
            </li>
          </ul>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-green-600"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-green-600"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-green-600"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact__form bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="add-product-InputCSS"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="add-product-InputCSS"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="add-product-InputCSS"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7080.76848125788!2d153.03531199999998!3d-27.457294649999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b91579aac93d233%3A0x402a35af3deaf40!2sBrisbane%20QLD!5e0!3m2!1sen!2sau!4v1733486651096!5m2!1sen!2sau"
        width="100%"
        height="450"
        className="mt-10"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default Contact;
