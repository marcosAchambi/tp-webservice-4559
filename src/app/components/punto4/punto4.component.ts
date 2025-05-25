import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  CommonModule
} from '@angular/common';
import {
  GeminiService
} from '../../services/gemini.service';

@Component ({
  selector: 'app-punto4',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './punto4.component.html',
  styleUrl: './punto4.component.css'
})
export class Punto4Component implements OnInit {
  postForm: FormGroup;
  isLoading = false;
  generatedImageDescription = '';
  generatedImage = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private geminiService: GeminiService
  ) {
    this.postForm = this.fb.group ({
      title: ['', [Validators.required, Validators.minLength (3)]],
      description: [''],
      style: ['moderno']
    });
  }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  onGenerateImage() {
    if (this.postForm.invalid) {
      this.markFormGroupTouched ();
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.generatedImageDescription = '';
    this.generatedImage = '';

    const title = this.postForm.get ('title')?.value;
    const style = this.postForm.get ('style')?.value;

    // Generar descripción de imagen usando Gemini
    this.geminiService.generateImageDescription (title).subscribe ({
      next: (response) => {
        if (response.candidates && response.candidates[0]) {
          this.generatedImageDescription = response.candidates[0].content.parts[0].text;

          // Aquí simularemos la generación de imagen
          // En producción, usarías un servicio como DALL-E, Midjourney API, etc.
          this.simulateImageGeneration (this.generatedImageDescription);
        }
      },
      error: (error) => {
        console.error ('Error generando descripción:', error);
        this.error = 'Error al generar la descripción de la imagen. Verifica tu API key.';
        this.isLoading = false;
      }
    });
  }

  private simulateImageGeneration(description: string) {
    // Simulación de generación de imagen
    // En producción, aquí harías una llamada a un servicio de generación de imágenes
    setTimeout (() => {
      // Generar una imagen placeholder basada en el título
      const canvas = document.createElement ('canvas');
      const ctx = canvas.getContext ('2d');

      if (ctx) {
        canvas.width = 1200;
        canvas.height = 630; // Dimensiones optimales para Facebook

        // Fondo degradado
        const gradient = ctx.createLinearGradient (0, 0, canvas.width, canvas.height);
        gradient.addColorStop (0, '#667eea');
        gradient.addColorStop (1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect (0, 0, canvas.width, canvas.height);

        // Texto principal
        const title = this.postForm.get ('title')?.value;
        ctx.fillStyle = 'white';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Dividir texto en líneas si es muy largo
        const words = title.split (' ');
        const lines = [];
        let currentLine = '';

        words.forEach ((word: string) => {
          const testLine = currentLine + word + ' ';
          const metrics = ctx.measureText (testLine);
          if (metrics.width > canvas.width - 100 && currentLine !== '') {
            lines.push (currentLine.trim ());
            currentLine = word + ' ';
          } else {
            currentLine = testLine;
          }
        });
        lines.push (currentLine.trim ());

        // Dibujar líneas centradas
        const lineHeight = 70;
        const startY = (canvas.height - (lines.length * lineHeight)) / 2 + 30;

        lines.forEach ((line, index) => {
          ctx.fillText (line, canvas.width / 2, startY + (index * lineHeight));
        });

        // Convertir a base64
        this.generatedImage = canvas.toDataURL ('image/png');
      }

      this.isLoading = false;
    }, 2000);
  }

  downloadImage() {
    if (!this.generatedImage) return;

    const link = document.createElement ('a');
    link.download = `facebook-post-${Date.now ()}.png`;
    link.href = this.generatedImage;
    link.click ();
  }

  resetForm() {
    this.postForm.reset ();
    this.generatedImageDescription = '';
    this.generatedImage = '';
    this.error = '';
  }

  private markFormGroupTouched() {
    Object.keys (this.postForm.controls).forEach (key => {
      this.postForm.get (key)?.markAsTouched ();
    });
  }

  // Getters para facilitar el acceso en el template
  get title() {
    return this.postForm.get ('title');
  }

  get description() {
    return this.postForm.get ('description');
  }
}
