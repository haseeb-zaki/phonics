import Navigation from '@/components/Navigation';

export default function About() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="container mx-auto py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            About Phonics Learning
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                What is the Julie Phonics Approach?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                The Julie Phonics approach is a systematic method for teaching
                phonics that focuses on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                <li>
                  <strong>Sound-symbol relationships:</strong> Learning how
                  letters and letter combinations represent sounds
                </li>
                <li>
                  <strong>Decoding skills:</strong> Breaking down words into
                  their component sounds
                </li>
                <li>
                  <strong>Blending:</strong> Combining sounds to read words
                </li>
                <li>
                  <strong>Pattern recognition:</strong> Identifying common
                  phonics patterns in words
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                What is Jolly Phonics?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Jolly Phonics is a fun and child-centered approach to teaching
                literacy through synthetic phonics. It uses:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                <li>
                  <strong>Actions:</strong> Each letter sound has a fun action
                  to help children remember it (e.g., weave hand like a snake for
                  's')
                </li>
                <li>
                  <strong>Stories:</strong> Engaging stories that help children
                  connect sounds with memorable scenarios
                </li>
                <li>
                  <strong>Songs:</strong> Catchy songs and rhymes that make
                  learning phonics sounds enjoyable and memorable
                </li>
                <li>
                  <strong>Multi-sensory learning:</strong> Children learn through
                  seeing, hearing, and doing actions
                </li>
                <li>
                  <strong>Systematic groups:</strong> Letters are taught in
                  specific groups (7 groups) in a logical order
                </li>
              </ul>
              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-300 dark:border-purple-700">
                <p className="text-purple-800 dark:text-purple-200 font-semibold mb-2">
                  🎭 How to Use Jolly Phonics in This App:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-purple-700 dark:text-purple-300">
                  <li>Select a letter in the Kids Practice section</li>
                  <li>Look at the Jolly Phonics section to see the action, story, and song</li>
                  <li>Do the action while saying the sound</li>
                  <li>Listen to the story and song to help remember the sound</li>
                  <li>Practice the letter using the phonics sounds</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                How to Use the App
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    1. Choose Your Practice Mode
                  </h3>
                  <p>
                    Select either <strong>Kids Practice</strong> for a fun,
                    colorful learning experience, or{' '}
                    <strong>Adults Practice</strong> for a more professional
                    interface focused on practical English words.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    2. Select Word Length
                  </h3>
                  <p>
                    Choose the difficulty level by selecting word length (2-6
                    letters). Start with shorter words and progress to longer
                    ones as you improve.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    3. Listen to Pronunciation
                  </h3>
                  <p>
                    Click the <strong>"Play Sound"</strong> button to hear the
                    word pronounced. This helps you learn the correct
                    pronunciation and sound patterns.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    4. Practice Spelling
                  </h3>
                  <p>
                    Type the word you heard in the spelling input field. You'll
                    get immediate feedback on whether your spelling is correct.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    5. Use Phonics Hints
                  </h3>
                  <p>
                    Click <strong>"Show Hint"</strong> to see phonics rules and
                    tips that can help you understand how the word is
                    constructed.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    6. Track Your Progress
                  </h3>
                  <p>
                    Monitor your improvement with the progress tracker, which
                    shows your accuracy and the number of words you've
                    practiced.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Tips for Effective Practice
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                <li>
                  <strong>Practice regularly:</strong> Consistent practice is key
                  to improvement
                </li>
                <li>
                  <strong>Start with shorter words:</strong> Build confidence
                  with 2-3 letter words before moving to longer ones
                </li>
                <li>
                  <strong>Use voice playback:</strong> Listen to words multiple
                  times to reinforce pronunciation
                </li>
                <li>
                  <strong>Read phonics hints:</strong> Understanding the rules
                  helps you spell new words correctly
                </li>
                <li>
                  <strong>Review incorrect answers:</strong> Pay attention to
                  feedback and pronunciation tips
                </li>
                <li>
                  <strong>Take breaks:</strong> Don't practice for too long at
                  once - short, focused sessions are more effective
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Browser Compatibility
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                This app uses the Web Speech API for text-to-speech
                functionality. It works best in:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                <li>Google Chrome (recommended)</li>
                <li>Microsoft Edge</li>
                <li>Safari (macOS and iOS)</li>
                <li>Firefox (limited support)</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                If voice playback doesn't work, make sure your browser is
                up-to-date and check your browser settings for audio permissions.
              </p>
            </section>

            <section className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Need Help?
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you're having trouble with pronunciation, use the "Can't
                pronounce? Type it here" button to manually enter the word and
                hear it pronounced. This adaptive feature helps you learn even
                when you're unsure of the spelling.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

