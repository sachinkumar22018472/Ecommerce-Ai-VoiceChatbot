import React, { useState, useContext } from 'react'
import axios from 'axios'
import Title from '../components/Title'
import contact_img from '../assets/contact_img.png' 
import { userDataContext } from '../context/UserContext'

function Contact() {
  const contextData = useContext(userDataContext); 
  
  // Context me serverUrl, backendUrl ya url ho sakta hai — safe fallback set kar rahe hain:
  const serverUrl = contextData?.serverUrl || contextData?.backendUrl || "http://localhost:5000";

  const [isLoading, setIsLoading] = useState(false);  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/contact`,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        {
          withCredentials: true,
        }
      );

      console.log(result.data);
      alert(result.data.message || "Message Sent Successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to send message!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800">
      
      {/* Page Title */}
      <div className="text-center text-3xl font-bold tracking-tight mb-12">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Main Grid: Form + Info Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        
        {/* Left Side: Contact Information & Image */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-100 to-gray-100 rounded-2xl transform -rotate-1 -z-10"></div>
            <img 
              src={contact_img} 
              alt="Contact OneCart" 
              className="w-full h-[260px] sm:h-[320px] object-cover rounded-xl shadow-md border border-gray-100"
            />
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b pb-3">Our Store</h3>
            
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start space-x-3">
                <span className="font-semibold text-gray-800 min-w-[80px]">Address:</span>
                <p>54709 Willms Station, Suite 350, Washington, USA</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-800 min-w-[80px]">Phone:</span>
                <p>+1 (555) 019-2834</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-800 min-w-[80px]">Email:</span>
                <p>support@onecart.com</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-800 min-w-[80px]">Hours:</span>
                <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">
            Get in Touch
          </span>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-2">We'd love to hear from you</h2>
          <p className="text-sm text-gray-500 mb-8">
            Have a question, feedback, or need help with an order? Fill out the form below and our team will reply within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                Subject
              </label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help you?" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5" 
                placeholder="Type your message here..." 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 hover:bg-indigo-600 disabled:bg-gray-400 text-white font-medium text-sm rounded-xl shadow-md transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>

      {/* Careers Section */}
      <div className="p-8 sm:p-10 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-xl font-bold mb-1">Careers at OneCart</h3>
          <p className="text-gray-300 text-sm">Learn more about our teams and job openings.</p>
        </div>
        <button className="px-6 py-3 border border-white/20 hover:bg-white hover:text-gray-900 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap">
          Explore Jobs
        </button>
      </div>

    </div>
  )
}

export default Contact