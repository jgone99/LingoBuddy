"use server"

import { HomePageComponent } from '../components/homepage-component';
import Footer from "../components/footer";

async function translateText(text) {
  "use server"
  const apiKey = process.env.TRANSLATOR_API_KEY;

  const detectResponse = await fetch(`https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          q: text,
      }),
  });

  if (!detectResponse.ok) {
      throw new Error('Error detecting language');
  }

  const detectData = await detectResponse.json();
  const detectedLanguage = detectData.data.detections[0][0].language;

  const targetLanguage = detectedLanguage === 'en' ? 'es' : 'en';

  const translateResponse = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          q: text,
          target: targetLanguage,
      }),
  });

  if (!translateResponse.ok) {
      throw new Error('Error translating text');
  }

  const translateData = await translateResponse.json();
  return translateData.data.translations[0].translatedText;
}

async function HomePage(){
  return (
    <>
    <HomePageComponent translateText = {translateText}/>
    <Footer />
    </>
  );
}

export default HomePage;