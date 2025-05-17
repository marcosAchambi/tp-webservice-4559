import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private palabras: string[] = ['MESSI', 'MARADONA', 'BATISTUTA', 'KEMPES', 'AGUERO', 'CANIGGIA', 'RIQUELME', 'ZANETTI', 'AYMAR', 'MASCHERANO'];
  private categoria: string = 'Futbolistas Argentinos';
  private palabraActual: string = '';
  private letrasAdivinadas: string[] = [];
  private intentos: number = 8;
  private intentosIniciales: number = 8;
  private juegoTerminado: boolean = false;
  private ganoJuego: boolean = false;

  constructor() {
    this.iniciarJuego ();
  }

  // Método para iniciar el juego
  iniciarJuego(): void {
    // Seleccionar una palabra aleatoria
    this.palabraActual = this.palabras[Math.floor (Math.random () * this.palabras.length)];
    this.letrasAdivinadas = [];
    this.intentos = this.intentosIniciales;
    this.juegoTerminado = false;
    this.ganoJuego = false;
  }

  // Método para intentar adivinar una letra
  intentarLetra(letra: string): boolean {
    // Convertir a mayúscula para comparar
    letra = letra.toUpperCase ();

    // Verificar si la letra ya fue adivinada
    if (this.letrasAdivinadas.includes (letra)) {
      return false;
    }

    // Agregar la letra a las letras adivinadas
    this.letrasAdivinadas.push (letra);

    // Verificar si la letra está en la palabra
    if (!this.palabraActual.includes (letra)) {
      this.intentos--;

      // Verificar si se acabaron los intentos
      if (this.intentos === 0) {
        this.juegoTerminado = true;
      }

      return false;
    }

    // Verificar si se completó la palabra
    const palabraCompleta = this.palabraActual.split ('').every (char =>
      this.letrasAdivinadas.includes (char)
    );

    if (palabraCompleta) {
      this.juegoTerminado = true;
      this.ganoJuego = true;
    }

    return true;
  }

  // Método para obtener la palabra oculta con las letras adivinadas
  obtenerPalabraOculta(): string[] {
    return this.palabraActual.split ('').map (letra =>
      this.letrasAdivinadas.includes (letra) ? letra : '_'
    );
  }

  // Getters para acceder a los datos desde los componentes
  getCategoria(): string {
    return this.categoria;
  }

  getPalabraActual(): string {
    return this.palabraActual;
  }

  getLetrasAdivinadas(): string[] {
    return this.letrasAdivinadas;
  }

  getIntentos(): number {
    return this.intentos;
  }

  getIntentosIniciales(): number {
    return this.intentosIniciales;
  }

  isJuegoTerminado(): boolean {
    return this.juegoTerminado;
  }

  isGanador(): boolean {
    return this.ganoJuego;
  }
}
