import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
              Welcome to Phonics Learning! 📚
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn phonics, improve spelling, and master pronunciation with our
              interactive learning platform for kids and adults.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <Link
              href="/kids"
              className="bg-yellow-400 hover:bg-yellow-500 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-6xl mb-4">👶</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Kids Practice
              </h2>
              <p className="text-gray-700">
                Fun and colorful phonics practice for children. Learn with
                interactive games and progress tracking!
              </p>
            </Link>

            <Link
              href="/adults"
              className="bg-blue-500 hover:bg-blue-600 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-white"
            >
              <div className="text-6xl mb-4">👨‍💼</div>
              <h2 className="text-2xl font-bold mb-2">Adults Practice</h2>
              <p className="text-blue-100">
                Improve your spelling and phonics skills with practical English
                words. Perfect for language learners!
              </p>
            </Link>

            <Link
              href="/about"
              className="bg-green-500 hover:bg-green-600 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-white"
            >
              <div className="text-6xl mb-4">ℹ️</div>
              <h2 className="text-2xl font-bold mb-2">About & Instructions</h2>
              <p className="text-green-100">
                Learn how to use the app, understand the Julie Phonics approach,
                and get tips for effective practice.
              </p>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Features
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <span>
                  <strong>Julie Phonics Approach:</strong> Learn phonics using
                  proven teaching methods
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔊</span>
                <span>
                  <strong>Voice Playback:</strong> Hear pronunciation for every
                  word using Web Speech API
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <span>
                  <strong>Progress Tracking:</strong> Monitor your improvement
                  with detailed statistics
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎨</span>
                <span>
                  <strong>Adaptive Learning:</strong> Practice words by length
                  (2-6 letters) at your own pace
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <span>
                  <strong>Phonics Hints:</strong> Get helpful tips and rules for
                  difficult words
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <span>
                  <strong>Responsive Design:</strong> Works perfectly on desktop,
                  tablet, and mobile devices
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
