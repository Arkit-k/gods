import { Request, Response } from 'express';
import axios from 'axios';
import { parse } from 'path';
import dotenv from 'dotenv';


dotenv.config();                                                                              
     

const api_key = process.env.OPENROUTER_API_KEY || ''; 


class LoverService {
  async getLover(name:string, gender:string): Promise<string> {
            
    if (!name || typeof name !== 'string') {
        throw new Error("Name must be a non-empty string");
    }
    
    const trimmedName = name.trim().toLocaleLowerCase();
    if (trimmedName.length === 0) {
        throw new Error("Name cannot be just whitespace");
    }
    if (trimmedName.length > 50) {
        throw new Error("Name must be 50 characters or less");
    }
    if (gender !== 'male' && gender !== 'female') {
      throw new Error("age is not eather male or female ")
    }

    // Determine lover's gender
    const loverGender = gender === 'male' ? 'female' : 'male';

    // Create dynamic prompt
    const prompt = (
      `You are a romantic AI novelist. Create a beautiful and ultra-realistic love story involving a person named ${name}, `
      + `who is a ${gender}. Their lover should be of the opposite gender (${loverGender}). `
      + `First, invent a lover's name suitable for that gender. Then write a cinematic love story between ${name} and the generated lover. `
      + `The story should include how they meet, fall in love, go through emotional moments, and create unforgettable memories. `
      + `Make it grounded in reality — no fantasy or sci-fi.`
    );


    const headers = {
      Authorization: `Bearer ${api_key}`,
      'X-Title': 'Love Story Generator'
    };

    const data = {
      model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      messages: [
        {
          role: 'system',
          content: 'You are a masterful storyteller of ultra-realistic romantic stories.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7  // Controls creativity vs realism
    };

    try {
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions',
             data, { headers, timeout: 10000 }
         );
         return response.data.choices[0].message.content;
    } catch (error) {
      console.error("API Error:", error);
      throw new Error("Failed to generate love story. Please try again later.");
    }
      
}
}

export default new LoverService();


