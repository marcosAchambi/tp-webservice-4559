// punto1.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarouselImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-punto1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto1.component.html',
  styleUrls: ['./punto1.component.css']
})
export class Punto1Component implements OnInit, OnDestroy {
  // Date variables
  hoy: number = new Date().getDate();
  mes: number = new Date().getMonth() + 1;

  // Carousel variables
  currentSlide: number = 0;
  interval: any;
  autoPlayInterval: number = 5000; // 5 seconds

  images: CarouselImage[] = [
    {
      src: '/punto1/Argentina Alberto Fernandez.webp',
      alt: 'Alberto Fernández',
      title: 'Jueces confirman la investigación contra el expresidente Alberto Fernández por presunta violencia de género'  ,
      description: 'La Cámara Federal de Buenos Aires confirmó este martes la investigación contra el expresidente Alberto Fernández por presunta violencia de género contra la ex primera dama Fabiola Yáñez, con lo que el exmandatario queda a un paso de un posible juicio oral.'
    },
    {
      src: '/punto1/Alfredo De Angeli.webp',
      alt: 'Alfredo De Angeli, senador nacional por Juntos por el Cambio',
      title: 'Alfredo De Ángeli, sobre Ficha Limpia: "Tenemos los votos para que salga en el Senado"',
      description: 'Alfredo De Ángeli, senador nacional por Juntos por el Cambio, habló este martes sobre el proyecto de Ficha Limpia que mañana debatirá el Senado y aseguró en CNN Radio que “están los votos para que salga” la ley.'
    },
    {
      src: '/punto1/Laura Alonso.webp',
      alt: 'Laura Alonso',
      title: 'Laura Alonso: "Rodríguez Larreta se fue y compite contra el PRO”',
      description: 'Laura Alonso, vocera del Gobierno de la Ciudad de Buenos Aires y candidata a legisladora porteña por el PRO, se refirió al lanzamiento del primer colectivo eléctrico y a la campaña con vistas al 18 de mayo.'
    },
    {
      src: '/punto1/Paro de colectivos.webp',
      alt: 'Paro de colectivos',
      title: 'Paro de la UTA: Luciano Fusaro habló de las tarifas y dijo que "este es un problema que se arregla con plata y no hay”',
      description: 'Luciano Fusaro, presidente de la Asociación Argentina de Empresas del Transporte Automotor, conversó con Nacho Girón y el equipo de La Mañana de CNN sobre el paro de colectivos y dijo que “es un problema que se arregla con plata y no hay plata”, mientras que remarcó que la única solución al reclamo es “subir las tarifas”.'
    },
    {
      src: '/punto1/Estados Unidos y China.webp',
      alt: 'Estados Unidos y China',
      title: 'Álvaro Iriarte, analista internacional: “China es el único adversario geopolítico de Estados Unidos”',
      description: 'Álvaro Iriarte, analista internacional del Instituto Res Publica y Asesor del Master of Liberal Art de la Universidad de Chicago, se refirió a los 100 primeros días de mandato de Estados Unidos.'
    }
  ];

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    // Clear interval when component is destroyed
    this.stopAutoPlay();
  }

  // Start automatic slideshow
  startAutoPlay(): void {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  // Stop automatic slideshow
  stopAutoPlay(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // Go to next slide
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  // Go to previous slide
  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  // Go to specific slide
  goToSlide(index: number): void {
    this.currentSlide = index;
    // Reset autoplay timer when manually changing slides
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
