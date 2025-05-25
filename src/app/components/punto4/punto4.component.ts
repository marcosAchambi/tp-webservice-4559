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
    // Inicialización si es necesaria
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

    // Puedes combinar el título y el estilo en el prompt si lo deseas
    const prompt = `Crea una imagen para un post de Facebook con el título: "${title}" en estilo ${style}.`;

    this.geminiService.generateGeminiImage (prompt).subscribe ({
      next: (response) => {
        // Busca la parte que contiene la imagen en base64
        const imagePart = response?.candidates?.[0]?.content?.parts?.find (
          (part: any) => part.inlineData && part.inlineData.mimeType === 'image/png'
        );
        if (imagePart && imagePart.inlineData.data) {
          this.generatedImage = `data:image/png;base64,${imagePart.inlineData.data}`;
          this.generatedImageDescription = `Imagen generada con estilo ${style} para el título: "${title}"`;
        } else {
          this.error = 'No se pudo generar la imagen. Intenta con otro título.';
          this.generateFallbackImage (title, style);
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al generar la imagen. Usando imagen de respaldo.';
        this.generateFallbackImage (title, style);
        this.isLoading = false;
        console.log (error);
      }
    });
  }

  private generateFallbackImage(title: string, style: string) {
    // Generar imagen canvas como respaldo
    setTimeout (() => {
      const canvas = document.createElement ('canvas');
      const ctx = canvas.getContext ('2d');

      if (ctx) {
        canvas.width = 1200;
        canvas.height = 630;

        // Configurar estilos según la selección
        const styles = {
          moderno: {
            gradient: ['#667eea', '#764ba2'],
            textColor: 'white',
            font: 'bold 60px Arial'
          },
          minimalista: {
            gradient: ['#f8f9fa', '#e9ecef'],
            textColor: '#333333',
            font: 'bold 50px Arial'
          },
          colorido: {
            gradient: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
            textColor: 'white',
            font: 'bold 65px Arial'
          },
          profesional: {
            gradient: ['#2c3e50', '#34495e'],
            textColor: 'white',
            font: 'bold 55px Arial'
          },
          creativo: {
            gradient: ['#fa709a', '#fee140', '#ff9a9e'],
            textColor: 'white',
            font: 'bold 70px Georgia'
          }
        };

        const selectedStyle = styles[style as keyof typeof styles] || styles.moderno;

        // Crear gradiente
        const gradient = ctx.createLinearGradient (0, 0, canvas.width, canvas.height);
        selectedStyle.gradient.forEach ((color, index) => {
          gradient.addColorStop (index / (selectedStyle.gradient.length - 1), color);
        });

        ctx.fillStyle = gradient;
        ctx.fillRect (0, 0, canvas.width, canvas.height);

        // Configurar texto
        ctx.fillStyle = selectedStyle.textColor;
        ctx.font = selectedStyle.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Dividir texto en líneas si es muy largo
        const words = title.split (' ');
        const lines = [];
        let currentLine = '';
        const maxWidth = canvas.width - 100;

        words.forEach ((word: string) => {
          const testLine = currentLine + word + ' ';
          const metrics = ctx.measureText (testLine);
          if (metrics.width > maxWidth && currentLine !== '') {
            lines.push (currentLine.trim ());
            currentLine = word + ' ';
          } else {
            currentLine = testLine;
          }
        });
        lines.push (currentLine.trim ());

        // Dibujar líneas centradas
        const lineHeight = 80;
        const startY = (canvas.height - (lines.length * lineHeight)) / 2 + 40;

        lines.forEach ((line, index) => {
          ctx.fillText (line, canvas.width / 2, startY + (index * lineHeight));
        });

        // Agregar elementos decorativos según el estilo
        if (style === 'creativo') {
          // Añadir círculos decorativos
          for (let i = 0; i < 5; i++) {
            ctx.beginPath ();
            ctx.arc (
              Math.random () * canvas.width,
              Math.random () * canvas.height,
              Math.random () * 50 + 10,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random () * 0.3})`;
            ctx.fill ();
          }
        }

        this.generatedImage = canvas.toDataURL ('image/png');
        this.generatedImageDescription = `Imagen generada con estilo ${style} para el título: "${title}"`;
      }
    }, 1000);
  }

  downloadImage() {
    if (!this.generatedImage) return;

    const link = document.createElement ('a');
    link.download = `facebook-post-${Date.now ()}.png`;
    link.href = this.generatedImage;
    link.click ();
  }

  resetForm() {
    this.postForm.reset ({
      title: '',
      description: '',
      style: 'moderno'
    });
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
