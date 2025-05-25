// gemini.service.ts
import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';


export interface GeminiRequest {
  contents: {
    parts: {
      text?: string;
      inlineData?: {
        mimeType: string;
        data: string;
      };
    }[];
  }[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
    finishReason: string;
    index: number;
  }[];
}

@Injectable ({
  providedIn: 'root'
})
export class GeminiService {
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
  private readonly apiKey = 'AIzaSyCpGRjDerqWQqREsUMpMBysJ5DP55mW4gw'; // Agrega tu API key en environment

  constructor(private http: HttpClient) {
  }

  generateContent(prompt: string, model: string = 'gemini-2.0-flash'): Observable<GeminiResponse> {
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });

    const body: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    };

    return this.http.post<GeminiResponse> (
      `${this.apiUrl}/${model}:generateContent?key=${this.apiKey}`,
      body,
      {headers}
    );
  }

  generateImageDescription(title: string): Observable<GeminiResponse> {
    const prompt = `
    Genera una descripción detallada para crear una imagen atractiva para un post de Facebook con el título: "${title}".

    La descripción debe incluir:
    - Estilo visual (moderno, minimalista, colorido, etc.)
    - Colores principales
    - Elementos visuales específicos
    - Composición
    - Mood/ambiente

    Mantén la descripción en español y hazla específica para que pueda ser usada por un generador de imágenes AI.
    `;

    return this.generateContent (prompt);
  }
}
