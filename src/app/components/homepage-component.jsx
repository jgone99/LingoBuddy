"use client";
import React, { useState } from 'react';

export function HomePageComponent({translateText}) {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = async () => {
        try {
            const translation = await translateText(inputText, 'en'); 
            setTranslatedText(translation);
        } catch (error) {
            console.error('Error translating text:', error);
            setTranslatedText('Translation failed');
        }
    };

    return (
        <div>
          <div>
            <div className="h-full bg-blue-400">
                <div className="travel-div bg-cover bg-center w-screen h-1/2 flex items-center justify-center relative">
                    <img src="/travelbanner.jpg" alt="Banner" className="h-1/2 w-full object-cover opacity-95" />
                    <div className="absolute top-1/3 transform -translate-y-1/2 text-center">
                        <h1 className="text-4xl font-bold text-black" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Your Best Friend For Spanish Learning!</h1>
                    </div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 text-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Translate Spanish or English"
                                className="px-80 py-4 pl-10 border border-gray-300 rounded-full focus:outline-none w-full lg:w-auto text-left"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button
                                className="absolute inset-y-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-full rounded-l-none hover:bg-blue-600 focus:outline-none"
                                onClick={handleTranslate}
                            >
                                Translate
                            </button>
                        </div>
                        {translatedText && (
                          <div className="bg-gray-100 rounded-full p-4 mt-4">
                          <h2 className="text-xl font-semibold mb-2">Translation:</h2>
                          <p style={{ fontSize: '20px' }}>{translatedText}</p>
                            </div>
                        )}
                    </div>
                </div>

  <div className="flex justify-left">
  <div className="p-2 mr-4 w-1/2 border-8 border-orange-300 p-8 rounded-lg">
    <img src="Teacher.jpg" alt="Left Image1" className="w-full h-full object-cover flex items-center justify-center" />
  </div>
  <div className="p-2 mr-4 w-1/2 border-8 border-orange-300 p-8 rounded-lg space-y-8">
      <h2 className="text-4xl font-bold text-black text-center" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Learning Courses</h2>
      <p className="text-2xl font-bold text-black text-left">Embark on an exciting journey of language mastery with our Learning Courses! Dive into a structured curriculum designed to take you through 10 immersive levels of learning. 
                                  Progression is earned through mastery, where each section demands a flawless 5/5 performance and every checkpoint requires an impressive 8/10. But no problem, any missteps along the way will be revisited to ensure full comprehension.</p>
      <p className="text-2xl font-bold text-black text-left"> Navigating through our railroad-style layout, you'll find yourself seamlessly guided, with a convenient "Continue" button to pick up right where you left off. Keep track of your progress effortlessly, as your current level is always at your fingertips. 
                                  For those eager to gauge their proficiency, our proficiency test awaits. Simply attempt checkpoint questions, aiming for at least 8/10. Fail to reach the mark? No worries, you'll have the chance to reevaluate and improve before advancing.</p>
      <p className="text-2xl font-bold text-black text-left">Join us on this educational adventure and unlock the full potential of your language skills! </p>
    </div>
  </div>
  
  <div className="flex justify-right">
  <div className="p-2 mr-4 w-1/2 border-8 border-green-400 p-8 rounded-lg space-y-8">
      <h2 className="text-4xl font-bold text-black text-center" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Mini-Games</h2>
      <p className="text-2xl font-bold text-black text-left">Test your new skills with our collection of two simple yet effective games designed to reinforce spelling and word recognition skills! </p>
      <p className="text-2xl font-bold text-black text-left">Hangman</p>
      <ul className="text-2xl space-y-1 text-black list-disc list-inside">
        <li>Select a prompt from a bank of 20 words and test your spelling prowess. Fill in the blank with the correct spelling of the translated prompt to progress to the next level.</li>
        <li>With the English word displayed at the top, guess the corresponding Spanish word to master vocabulary.</li>
        <li>After the hangman drawing is completed you lose and prompted to take the survival challenge again. </li>
        <li>Track your progress with a high score and aim to outdo yourself with each round.</li>
      </ul>
      <p className="text-2xl font-bold text-black text-left">Matching</p>
      <ul class="text-2xl space-y-1 text-black list-disc list-inside">
        <li>Race against the clock in a thrilling matching game. Match Spanish words to their English definitions within a 1-minute deadline.</li>
        <li>Earn 1+ point for every correct match, and track your progress with a high score.</li>
        <li>Words are not reused to give the user a wide range of vocabulary to train with!</li>
      </ul>
    </div>
    <div className="p-2 mr-2 w-1/2 border-8 border-green-400 rounded-lg">
  <img src="Games.png" alt="Left Image" className="w-full h-full object-cover flex items-center justify-center" />
  </div>
    </div>

    <div className="flex justify-left">
  <div className="p-2 mr-4 w-1/2 border-8 border-red-500 p-8 rounded-lg">
    <img src="AI.png" alt="Left Image2" className="w-full h-full object-cover flex items-center justify-center" />
  </div>
  <div className="p-2 mr-4 w-1/2 border-8 border-red-500 p-8 rounded-lg space-y-8">
      <h2 className="text-4xl font-bold text-black text-center" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>AI Chat</h2>
      <p className="text-2xl font-bold text-black text-left">Engage in conversational-style interactions with our AI companion with the new language skills you have developed. The AI will continuously remind you to speak in Spanish to enhance your language skills.</p>
      <p className="text-2xl font-bold text-black text-left">You can freely converse with the AI without any constraints. Whether you want to practice greetings, discuss your day, or explore various topics, the AI is ready to engage in conversation.</p>
      <p className="text-2xl font-bold text-black text-left">The AI companion is programmed to adapt to your speaking experience, ensuring that the conversation remains within your skill level. It will gauge your proficiency and respond with equal or slightly less complexity to match your comfort level. As the conversation progresses, the AI will gradually adjust the complexity, providing an optimal learning experience tailored to your needs.</p>
    </div>
  </div>
</div>
</div>
</div>
    )
};
