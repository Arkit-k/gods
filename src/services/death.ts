import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();                                                                              
     

const api_key = process.env.OPENROUTER_API_KEY || ''; 


class DeathService {
    async generateDeathStory(name: string, age: string): Promise<string> {
        // Convert age to number and validate
        const ageNum = parseInt(age);
        
        if (!name || !age) {
            throw new Error("Name and age are required");
        }
        
        if (isNaN(ageNum)) {
            throw new Error("Age must be a valid number");
        }
        
        if (ageNum <= 0 || ageNum > 100) {
            throw new Error("Age must be between 1 and 100 years");
        }

        // Calculate death age (random between current age +1 to +50 years, max 120)
        const deathAge = Math.min(
            ageNum + Math.floor(Math.random() * 50) + 1,
            80  // Maximum plausible human age
        );

        // Create dynamic prompt
        const prompt = (
            `Generate a realistic death story for ${name}, ` +
            `currently ${ageNum} years old who will die at ${deathAge}. ` +
            `The story should be emotionally compelling and medically plausible. ` +
            `Possible causes genrate realistic death events or refer movies ` +
            `No supernatural elements. Focus on realistic human drama.`
        );

        const headers = {
            Authorization: `Bearer ${api_key}`,
            'X-Title': 'Death Story Generator'
        };

        const data = {
            model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
            messages: [
                {
                    role: 'system',
                    content: 'You are a medical storyteller specializing in realistic death scenarios.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7  // Controls creativity vs realism
        };

        try {
            const response = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions', 
                data, 
                { 
                    headers,
                    timeout: 10000  // 10 second timeout
                }
            );
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error("API Error:", error);
            throw new Error("Failed to generate death story. Please try again later.");
        }
    }
}

export default new DeathService();

