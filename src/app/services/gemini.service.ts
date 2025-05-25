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
  private  apiKey = 'AIzaSyBYYet-CLSpb6EsZXdnEqMiViafQbEGRUE'; // Agrega tu API key en environment

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

  generateImagen3Image(prompt: string, sampleCount: number = 1): Observable<any> {
    const url = `${this.apiUrl}/imagen-3.0-generate-002:predict?key=${this.apiKey}`;
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });
    const body = {
      instances: [
        {prompt}
      ],
      parameters: {
        sampleCount
      }
    };
    return this.http.post (url, body, {headers});
  }

  generateGeminiImage(prompt: string): Observable<any> {
    const url = `${this.apiUrl}/gemini-2.0-flash-preview-image-generation:generateContent?key=${this.apiKey}`;
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });
    const body = {
      contents: [
        {
          parts: [
            {text: prompt}
          ]
        }
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"]
      }
    };
    return this.http.post (url, body, {headers});
  }
  generateImageFromTitle(title: string, style: string = 'moderno'): Observable<any> {
    const stylePrompts: Record<string, string> = {
      moderno: 'estilo moderno, limpio, con gradientes suaves y tipografía sans-serif',
      minimalista: 'estilo minimalista, espacios en blanco, colores neutros, diseño simple',
      colorido: 'estilo colorido y vibrante, colores brillantes, energético',
      profesional: 'estilo profesional y corporativo, colores sobrios, elegante',
      creativo: 'estilo creativo y artístico, elementos únicos, composición dinámica'
    };

    const styleDescription = stylePrompts[style] || stylePrompts['moderno'];

    const prompt = `
    Crea una imagen para un post de Facebook con el título: "${title}".
    Especificaciones:
    - Dimensiones: 1200x630 píxeles (formato Facebook)
    - ${styleDescription}
    - El título debe ser prominente y legible
    - Fondo atractivo que complemente el texto
    - Diseño profesional para redes sociales
    - Alta calidad visual
    El texto principal debe ser: "${title}"
  `;

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });

    const body = {
      contents: [
        {
          parts: [
            {text: prompt}
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      },
      // Esta clave es importante para pedir imagen
      responseModalities: ["TEXT", "IMAGE"]
    };

    return this.http.post (
      `${this.apiUrl}/gemini-2.0-flash-preview-image-generation:generateContent?key=${this.apiKey}`,
      body,
      {headers}
    );
  }
}
