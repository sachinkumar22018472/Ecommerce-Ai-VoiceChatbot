import React, { useState } from 'react';

function NewLetterBox() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault(); // Page reload rokne ke liye
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      
      setTimeout(() => {
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4 text-center">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </h2>

      {/* Subtitle */}
      <p className="text-gray-400 mt-3 text-xs sm:text-sm md:text-base max-w-lg mx-auto">
        Join our newsletter to receive exclusive deals, new arrivals, and discount offers directly in your inbox.
      </p>

      {/* Form */}
      <form 
        onSubmit={onSubmitHandler} 
        className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl mx-auto"
      >
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address" 
          required 
          className="w-full flex-1 px-4 py-3 border border-gray-300 text-gray-800 text-sm outline-none focus:border-black transition-all rounded-sm sm:rounded-r-none"
        />
        <button 
          type="submit" 
          className="w-full sm:w-auto bg-black text-white text-xs sm:text-sm font-medium px-8 py-3.5 hover:bg-gray-800 active:bg-gray-900 transition-colors uppercase tracking-wider cursor-pointer rounded-sm sm:rounded-l-none"
        >
          SUBSCRIBE
        </button>
      </form>

      {/* Success Notification */}
      {isSubscribed && (
        <p className="mt-4 text-sm font-medium text-green-600">
          🎉 Thanks for subscribing! Check your email for your 20% off code.
        </p>
      )}
    </div>
  );
}

export default NewLetterBox;