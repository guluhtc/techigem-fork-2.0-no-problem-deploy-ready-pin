import { supabase } from './supabase'

export async function generateCaption(prompt: string, options: any = {}) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type: 'caption', 
        prompt,
        options: {
          ...options,
          language: options.language || 'en'
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate caption');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error generating caption:', error);
    throw error;
  }
}

export async function generateBio(topic: string, category: string, options: any = {}) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type: 'bio', 
        prompt: topic,
        options: {
          ...options,
          category,
          maxLength: options.length || 150,
          language: options.language || 'en'
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to generate bio: ${error}`);
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error generating bio:', error);
    throw error;
  }
}

export async function generateHashtags(topic: string, options: any = {}) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type: 'hashtag', 
        prompt: topic, 
        options: {
          ...options,
          language: options.language || 'en'
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to generate hashtags: ${error}`);
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error generating hashtags:', error);
    throw error;
  }
}