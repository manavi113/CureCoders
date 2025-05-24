import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFirstAid } from "@fortawesome/free-solid-svg-icons";
import ChatBot from "../Components/Chatbot/ChatBot";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start text-center px-4 py-12 overflow-x-hidden overflow-y-auto">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 -z-10 bg-[url('/healthcare-bg.jpg')]"
      ></div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">
          Welcome to Telehealth Platform
        </h1>
        <p className="text-gray-800 text-lg mb-6 font-medium">
          Get instant access to quality, affordable healthcare from the comfort of your home.
        </p>
        <Link to="/register">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3 w-full max-w-6xl">
        <div className="p-4 border rounded-lg shadow hover:shadow-md bg-white bg-opacity-90">
          <h3 className="font-semibold text-lg text-blue-600 mb-2">Instant Consultation</h3>
          <p className="text-gray-700">Connect with doctors via video in minutes.</p>
        </div>
        <div className="p-4 border rounded-lg shadow hover:shadow-md bg-white bg-opacity-90">
          <h3 className="font-semibold text-lg text-blue-600 mb-2">Secure & Private</h3>
          <p className="text-gray-700">Your health data is encrypted and safe.</p>
        </div>
        <div className="p-4 border rounded-lg shadow hover:shadow-md bg-white bg-opacity-90">
          <h3 className="font-semibold text-lg text-blue-600 mb-2">Real-time Transcription</h3>
          <p className="text-gray-700">Overcome dialect and accent challenges with real-time Transcription
             
             </p>
        </div>
      </div>
       <Link
        to="/chatbot"
        className="fixed bottom-6 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition duration-300 z-50 animate-pulse"
        aria-label="Open Chatbot"
      >
        <FontAwesomeIcon icon={faFirstAid} size="4x" />
      </Link>
    </div>
  );
}
