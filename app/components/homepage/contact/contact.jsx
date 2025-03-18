// Contact Component
"use client"
// Contact Component
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const [input, setInput] = useState({
    email: '',
    message: '',
  });

  const [error, setError] = useState(false);

  const handleSendMail = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!input.email || !input.message) {
      setError(true);
      toast.error('Please fill in all fields correctly.');
      return;
    }

    setError(false);

    // Prepare data for sending
    const formData = new FormData();
    formData.append('Email', input.email);
    formData.append('Message', input.message);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyvfv5guH5BU81NuffnW1rX3bCfWyMNidbk1lW399pCyx8msbu9-HIPow0sh1cEjZ38/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success('Message sent successfully!');
        setInput({ email: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <ToastContainer /> {/* ToastContainer must be included */}
      <h1 className="text-xl font-bold mb-4 text-[#16f2b3]">Contact Me</h1>
      <p className="mt-1 font-normal text-md my-2">Drop a Message,if you have any website ideas:)</p>

      <form className="space-y-4" onSubmit={handleSendMail}>
        <div>
          <label className="block text-sm font-medium text-[#d3d8e8]">Your Email</label>
          <input
            type="email"
            className="w-full bg-[#10172d] border rounded px-3 py-2 text-white border-[#353a52] focus:border-[#16f2b3] focus:outline-none"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#d3d8e8]">Your Message</label>
          <textarea
            className="w-full bg-[#10172d] border rounded px-3 py-2 text-white border-[#353a52] focus:border-[#16f2b3] focus:outline-none"
            rows="4"
            value={input.message}
            onChange={(e) => setInput({ ...input, message: e.target.value })}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-violet-600 text-white py-2 rounded hover:from-pink-600 hover:to-violet-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
