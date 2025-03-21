import GrandStaffQuiz from "../components/GrandStaffQuiz";
import SoundManager from "../components/SoundManager";
import ErrorBoundary from "../components/ErrorBoundary";
import { useEffect, useState } from "react";

export default function Home() {
  // Use client-side rendering for components that depend on browser APIs
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <ErrorBoundary>
          {isClient && <SoundManager />}
          {isClient ? (
            <GrandStaffQuiz />
          ) : (
            <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md text-center">
              <p>Loading note quiz...</p>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
