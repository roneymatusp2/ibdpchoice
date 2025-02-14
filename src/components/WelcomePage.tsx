import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomePageProps {
    onStart: () => void;
}

function WelcomePage({ onStart }: WelcomePageProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-custom">
            <div className="max-w-4xl w-full bg-white/90 rounded-xl shadow-2xl overflow-hidden">
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/ZMqWZKCjSCc?autoplay=1"
                        title="IB Math Choice Introduction"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                <div className="p-8 text-center">
                    <h1 className="text-3xl font-bold text-school-navy mb-4">
                        Welcome to IB Math Choice Guide
                    </h1>
                    <p className="text-lg text-school-navy/70 mb-8">
                        Watch the introduction video above and when you're ready, click the button below to start the questionnaire.
                    </p>
                    <button
                        onClick={onStart}
                        className="inline-flex items-center px-8 py-4 bg-school-red text-white font-semibold rounded-lg hover:bg-school-red/90 transition-colors"
                    >
                        Start Questionnaire
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;