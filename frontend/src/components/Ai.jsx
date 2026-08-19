import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ai from '../assets/ai.png'
import { shopDataContext } from '../context/ShopContext'

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext)
  const [isListening, setIsListening] = useState(false)
  const navigate = useNavigate()

  // Instant Click / Beep Sound Effect Generator
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime) // High crisp tone
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime) // Volume control
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.12) // Quick fade out

      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      oscillator.start()
      oscillator.stop(audioCtx.currentTime + 0.12)
    } catch (error) {
      console.error("Audio error:", error)
    }
  }

  // Voice Response (Text to Speech in English)
  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message)
    utterance.lang = 'en-US'
    window.speechSynthesis.speak(utterance)
  }

  // Voice Recognition Handler
  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      toast.error("Speech Recognition is not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'

    // Play click sound as soon as mic starts listening
    recognition.onstart = () => {
      setIsListening(true)
      playBeep()
    }

    recognition.onend = () => setIsListening(false)

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase()
      console.log("Voice Command:", transcript)

      // Search Bar Commands
      if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
        speak("opening search")
        setShowSearch(true)
        navigate("/collections")
      } 
      else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
        speak("closing search")
        setShowSearch(false)
      } 
      // Collection / Products Page Commands
      else if (
        transcript.includes("collection") || 
        transcript.includes("collections") || 
        transcript.includes("product") || 
        transcript.includes("products")
      ) {
        speak("opening collection page")
        navigate("/collections")
        setShowSearch(false)
      } 
      // About Page Commands
      else if (transcript.includes("about") || transcript.includes("about page")) {
        speak("opening about page")
        navigate("/about")
        setShowSearch(false)
      } 
      // Home Page Commands
      else if (transcript.includes("home") || transcript.includes("home page")) {
        speak("opening home page")
        navigate("/")
        setShowSearch(false)
      } 
      // Cart Page Commands
      else if (transcript.includes("cart") || transcript.includes("shopping cart")) {
        speak("opening your cart")
        navigate("/cart")
        setShowSearch(false)
      } 
      // Contact Page Commands
      else if (transcript.includes("contact") || transcript.includes("contact us")) {
        speak("opening contact page")
        navigate("/contact")
        setShowSearch(false)
      } 
      // Orders Page Commands
      else if (
        transcript.includes("order") || 
        transcript.includes("orders") || 
        transcript.includes("my orders")
      ) {
        speak("opening your orders page")
        navigate("/orders")
        setShowSearch(false)
      } 
      else {
        toast.error("Try Again")
      }
    }

    recognition.onerror = () => {
      setIsListening(false)
      toast.error("Could not hear clearly. Try Again.")
    }

    recognition.start()
  }

  return (
    <div 
      className="fixed lg:bottom-[25px] md:bottom-[35px] bottom-[70px] left-[2.5%] z-50 flex items-center gap-3 group cursor-pointer select-none"
      onClick={handleMicClick}
    >
      {/* Outer Glowing Circle Container */}
      <div className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-500 bg-white/80 backdrop-blur-lg border border-neutral-200/80 shadow-xl ${
        isListening 
          ? 'scale-110 ring-4 ring-blue-500/60 shadow-blue-500/50' 
          : 'hover:scale-105 group-hover:shadow-2xl group-hover:border-blue-300'
      }`}>

        {/* Ambient Glowing Effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-md transition-opacity duration-300 ${
          isListening ? 'opacity-70 animate-pulse' : 'group-hover:opacity-40'
        }`}></div>

        {/* AI Image */}
        <img 
          src={ai} 
          alt="AI Assistant" 
          className="relative z-10 w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] object-contain drop-shadow-md transition-transform duration-300 group-hover:rotate-6" 
        />

        {/* Online / Listening Dot Indicator */}
        <span className={`absolute top-1 right-1 z-20 w-3.5 h-3.5 rounded-full border-2 border-white ${
          isListening ? 'bg-red-500 animate-ping' : 'bg-emerald-500'
        }`}></span>
      </div>

      {/* Floating Tooltip Label */}
      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-md transition-all duration-300 backdrop-blur-md ${
        isListening 
          ? 'bg-blue-600 text-white animate-pulse' 
          : 'bg-neutral-900/90 text-white opacity-80 group-hover:opacity-100 group-hover:translate-x-1'
      }`}>
        {isListening ? "Listening..." : "Ask AI 🤖"}
      </span>
    </div>
  )
}

export default Ai