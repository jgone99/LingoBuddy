"use server"

import { HomePageComponent } from '../components/homepage-component';
import Footer from "../components/footer";
import { GoogleAuth } from 'google-auth-library';

let cachedAccessToken = null;
let cachedAccessTokenExpiry = 0;

async function getAccessToken() {
    const now = Date.now();

    if (cachedAccessToken && cachedAccessTokenExpiry - now > 60_000) {
        return cachedAccessToken;
    }

    if (!process.env.GCP_SA_KEY) {
        throw new Error("GCP_SA_KEY env var not found. Add your service account JSON to GCP_SA_KEY.");
    }

    let credentials;
    try {
        credentials = JSON.parse(process.env.GCP_SA_KEY);
    } catch (err) {
        throw new Error("Failed to parse GCP_SA_KEY JSON: " + err.message);
    }

    const auth = new GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/cloud-translation"],
    });

    const client = await auth.getClient();
    const res = await client.getAccessToken();

    const token = typeof res === "string" ? res : (res && res.token);
    if (!token) throw new Error("Failed to obtain access token from Google Auth client.");

    cachedAccessTokenExpiry = now + 50 * 60 * 1000;

    return token;
}

async function fetchWithAuth(url, bodyObj) {
    const accessToken = await getAccessToken();

    const r = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObj),
    });

    return r;
}

async function translateText(text) {
    "use server"

    const detectResponse = await fetchWithAuth(
        'https://translation.googleapis.com/language/translate/v2/detect',
        { q: text }
    );

    if (!detectResponse.ok) {
        const body = await detectResponse.text().catch(() => "");
        throw new Error(`Error detecting language: ${detectResponse.status} ${detectResponse.statusText} - ${body}`);
    }

    const detectData = await detectResponse.json();
    const detectedLanguage = detectData.data.detections[0][0].language;

    if (!detectedLanguage) {
        throw new Error("Failed to parse detected language from Google response.");
    }

    const targetLanguage = detectedLanguage === 'en' ? 'es' : 'en';

    const translateResponse = await fetchWithAuth(
        'https://translation.googleapis.com/language/translate/v2',
        {
            q: text,
            target: targetLanguage
        }
    );

    if (!translateResponse.ok) {
        const body = await translateResponse.text().catch(() => "");
        throw new Error(`Error translating text: ${translateResponse.status} ${translateResponse.statusText} - ${body}`);
    }

    const translateData = await translateResponse.json();
    const translated = translateData?.data?.translations?.[0]?.translatedText;
    if (!translated) {
        throw new Error("Failed to parse translation from Google response.");
    }

    return translated;
}

async function HomePage() {
    return (
        <>
            <HomePageComponent translateText={translateText} />
            <Footer />
        </>
    );
}

export default HomePage;