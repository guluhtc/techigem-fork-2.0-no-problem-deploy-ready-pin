import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const { type, prompt, options = {} } = await request.json();
    const language = options?.language || 'en';

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'caption':
        systemPrompt = language === 'hi' 
          ? "आप एक एक्सपर्ट इंस्टाग्राम कंटेंट क्रिएटर हैं जो आकर्षक हिंदी कैप्शन लिखने में माहिर हैं। कैप्शन में इमोजी का उचित प्रयोग करें और इंस्टाग्राम के लिए ऑप्टिमाइज़ करें।"
          : "You are an expert Instagram content creator who specializes in writing engaging captions. Create captions that are authentic, engaging, and optimized for Instagram. Always include relevant emojis and hashtags.";
        
        userPrompt = `Create an engaging Instagram caption about: ${prompt}\n\nTone: ${options?.tone || 'professional'}\nLength: ${options?.length || 'medium'}`;
        
        if (options?.includeEmojis !== false) {
          userPrompt += '\nInclude appropriate emojis';
        }
        
        if (options?.includeHashtags !== false) {
          userPrompt += '\nInclude relevant hashtags';
        }
        
        break;

      case 'bio':
        systemPrompt = language === 'hi'
          ? "आप एक एक्सपर्ट हैं जो प्रोफेशनल और आकर्षक हिंदी इंस्टाग्राम बायो बनाने में माहिर हैं। बायो को संक्षिप्त, प्रभावशाली और इंस्टाग्राम की कैरेक्टर लिमिट के अनुसार ऑप्टिमाइज़ करें।"
          : "You are an expert at creating professional and engaging Instagram bios. Create bios that are concise, impactful, and optimized for Instagram's character limit. Focus on clarity, personality, and call-to-action.";
        
        userPrompt = `Create an Instagram bio for a ${options?.category || 'professional'} account focused on: ${prompt}

Style: ${options?.style || 'professional'}
Tone: ${options?.tone || 'friendly'}
Max Length: ${options?.maxLength || 150} characters
Include Emojis: ${options?.includeEmojis !== false ? 'Yes' : 'No'}
Include Website: ${options?.includeWebsite !== false ? 'Yes' : 'No'}
Language: ${language}

Format the bio with line breaks for better readability.`;
        break;

      case 'hashtag':
        systemPrompt = language === 'hi'
          ? "आप एक एक्सपर्ट हैं जो इंस्टाग्राम के लिए प्रभावी हिंदी हैशटैग सेट बनाने में माहिर हैं। रिलेवेंट, ट्रेंडिंग और प्रभावी हैशटैग का मिश्रण बनाएं जो रीच और एंगेजमेंट को अधिकतम करे।"
          : "You are an expert at Instagram hashtag optimization. Create relevant, trending, and effective hashtag sets that maximize reach and engagement.";
        
        userPrompt = `Generate relevant hashtags for: ${prompt}
Category: ${options?.category || 'general'}
Number of hashtags: ${options?.count || 30}
Popularity level: ${options?.popularity || 'mixed'}
Include location-based hashtags: ${options?.includeLocation ? 'Yes' : 'No'}
Include emojis: ${options?.includeEmojis ? 'Yes' : 'No'}
Language: ${language}`;
        break;

      default:
        return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: type === 'bio' ? 150 : 300
    });

    return NextResponse.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}