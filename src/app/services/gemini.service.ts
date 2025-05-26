// gemini.service.ts
import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders} from '@angular/common/http';
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
  private readonly apiKey = 'AIzaSyBYYet-CLSpb6EsZXdnEqMiViafQbEGRUE'; // Agrega tu API key en environment

  constructor(private http: HttpClient) {
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
}
