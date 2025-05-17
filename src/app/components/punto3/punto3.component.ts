import {
  Component,
  OnInit
} from '@angular/core';
import {
  GameService
} from '../../services/game.service';
import {
  NgClass,
  NgForOf,
  NgIf
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  SafeHtml
} from '@angular/platform-browser';

@Component({
  selector: 'app-punto3',
  imports: [
    NgClass,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './punto3.component.html',
  styleUrl: './punto3.component.css'
})
export class Punto3Component implements OnInit {

  letra: string = '';
  mostrarModal: boolean = false;
  mensajeModal: string = '';

  // Array con las letras del abecedario
  letras: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split ('');

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
    // Iniciar un nuevo juego al cargar el componente
    this.gameService.iniciarJuego ();
  }

  // Método para intentar adivinar una letra
  intentar(letraSeleccionada: string): void {
    this.gameService.intentarLetra (letraSeleccionada);

    // Verificar si el juego terminó
    if (this.gameService.isJuegoTerminado ()) {
      if (this.gameService.isGanador ()) {
        this.mostrarModalGanador ();
      } else {
        this.mostrarModalPerdedor ();
      }
    }
  }

  // Método para intentar adivinar una letra desde el input
  intentarDesdeInput(): void {
    if (this.letra && this.letra.length === 1) {
      this.gameService.intentarLetra (this.letra);
      this.letra = '';

      // Verificar si el juego terminó
      if (this.gameService.isJuegoTerminado ()) {
        if (this.gameService.isGanador ()) {
          this.mostrarModalGanador ();
        } else {
          this.mostrarModalPerdedor ();
        }
      }
    }
  }

  // Método para reiniciar el juego
  reiniciarJuego(): void {
    this.gameService.iniciarJuego ();
    this.mostrarModal = false;
  }

  // Método para mostrar el modal de ganador
  mostrarModalGanador(): void {
    this.mensajeModal = '¡Felicidades! Has adivinado la palabra: ' + this.gameService.getPalabraActual ();
    this.mostrarModal = true;
  }

  // Método para mostrar el modal de perdedor
  mostrarModalPerdedor(): void {
    this.mensajeModal = '¡Has perdido! La palabra era: ' + this.gameService.getPalabraActual ();
    this.mostrarModal = true;
  }

  // Método para verificar si una letra ya ha sido usada
  letraUsada(letra: string): boolean {
    return this.gameService.getLetrasAdivinadas ().includes (letra);
  }

  // Método para obtener la imagen según el número de intentos
  getImagenAhorcado(): string {
    const intentosFallidos = this.gameService.getIntentosIniciales () - this.gameService.getIntentos ();
    return `hangman/hangman-${intentosFallidos}.svg`;
  }

  // Cerrar el modal
  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
