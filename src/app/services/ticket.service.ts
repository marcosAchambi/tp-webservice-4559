import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  CATEGORIA_TURISTA,
  Ticket
} from '../models/ticket.model';

@Injectable ({
  providedIn: 'root'
})
export class TicketService {
  private tickets: Ticket[] = [];
  private ticketsSubject = new BehaviorSubject<Ticket[]> ([]);

  constructor() {
  }

  getTickets(): Observable<Ticket[]> {
    return this.ticketsSubject.asObservable ();
  }

  agregarTicket(ticket: Ticket): void {
    // Crear una copia para evitar problemas de referencia
    const nuevoTicket = {...ticket};

    // Asegurarse de que categoriaTurista sea un número
    nuevoTicket.categoriaTurista = Number (nuevoTicket.categoriaTurista);

    this.tickets.push (nuevoTicket);
    // Emitir una nueva copia del array
    this.ticketsSubject.next ([...this.tickets]);
  }

  getResumenVentas(): any[] {
    const resumen = [
      {
        categoria: CATEGORIA_TURISTA.MENOR,
        cantidad: 0,
        total: 0
      },
      {
        categoria: CATEGORIA_TURISTA.ADULTO,
        cantidad: 0,
        total: 0
      },
      {
        categoria: CATEGORIA_TURISTA.JUBILADO,
        cantidad: 0,
        total: 0
      }
    ];

    this.tickets.forEach (ticket => {
      const categoriaId = Number (ticket.categoriaTurista);
      const categoria = resumen.find (r => r.categoria === categoriaId);

      if (categoria) {
        categoria.cantidad++;

        // Aplicar descuentos según la categoría
        let precioFinal = ticket.precio;
        if (categoriaId === CATEGORIA_TURISTA.MENOR) {
          precioFinal *= 0.65; // 35% descuento
        } else if (categoriaId === CATEGORIA_TURISTA.JUBILADO) {
          precioFinal *= 0.5; // 50% descuento
        }

        categoria.total += precioFinal;
      }
    });

    return resumen;
  }

  actualizarTicket(id: number, ticketActualizado: Ticket): void {
    // Solo actualizamos si el índice es válido
    if (id >= 0 && id < this.tickets.length) {
      // Crear una copia para evitar problemas de referencia
      const ticketNuevo = {...ticketActualizado};

      // Asegurarse de que categoriaTurista sea un número
      ticketNuevo.categoriaTurista = Number (ticketNuevo.categoriaTurista);

      // Actualizar el ticket en la posición correspondiente
      this.tickets[id] = ticketNuevo;

      // Emitir una nueva copia del array
      this.ticketsSubject.next ([...this.tickets]);
    }
  }

  eliminarTicket(id: number): void {
    // Solo eliminamos si el índice es válido
    if (id >= 0 && id < this.tickets.length) {
      // Eliminar el ticket en la posición correspondiente
      this.tickets.splice (id, 1);

      // Emitir una nueva copia del array
      this.ticketsSubject.next ([...this.tickets]);
    }
  }

// Método para obtener un solo ticket por su índice
  getTicketById(id: number): Ticket | null {
    if (id >= 0 && id < this.tickets.length) {
      return {...this.tickets[id]};
    }
    return null;
  }

  getTotalGeneral(): number {
    return this.getResumenVentas ().reduce ((total, item) => total + item.total, 0);
  }
}
