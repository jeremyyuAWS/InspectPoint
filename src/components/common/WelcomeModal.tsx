import React, { useState } from 'react';
import { AlertTriangle, X, ArrowRight, Users, Mail, MessageCircleQuestion, Headphones, BarChart3 } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'Welcome to Firecat AI Platform',
      description: "This multi-agent platform helps you automate sales, onboarding, and support for Firecat, the fire alarm design software. Let's explore what each agent can do for you.",
      icon: <AlertTriangle className="h-10 w-10 text-red-600" />
    },
    {
      title: 'Lead Generation & Expansion',
      description: 'Our AI agents automatically identify and enrich potential Firecat customers across North America, prioritizing leads based on your Ideal Customer Profile.',
      icon: <Users className="h-10 w-10 text-blue-600" />
    },
    {
      title: 'Outbound Campaign Agent',
      description: 'Create personalized, high-conversion email campaigns with automated sequence management and engagement tracking.',
      icon: <Mail className="h-10 w-10 text-amber-600" />
    },
    {
      title: 'Demo & Onboarding Assistant',
      description: 'Meet "Ask August" - your virtual assistant that handles FAQs, provides product demos, and guides users through the onboarding process.',
      icon: <MessageCircleQuestion className="h-10 w-10 text-green-600" />
    },
    {
      title: 'Technical Support Agent',
      description: 'Automate technical support queries, route complex tickets to human agents, and leverage our knowledge base for quick resolutions.',
      icon: <Headphones className="h-10 w-10 text-purple-600" />
    },
    {
      title: 'Analytics Dashboard',
      description: 'Monitor agent performance, track lead conversion trends, and optimize your sales and support processes with our comprehensive analytics.',
      icon: <BarChart3 className="h-10 w-10 text-indigo-600" />
    }
  ];
  
  const currentStepData = steps[currentStep];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-4 overflow-hidden transform transition-all">
        <div className="relative">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-center mb-4">
              {currentStepData.icon}
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {currentStepData.description}
            </p>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
            <div className="flex space-x-1">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-2 rounded-full ${
                    idx === currentStep ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <span>{currentStep < steps.length - 1 ? 'Next' : 'Get Started'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;