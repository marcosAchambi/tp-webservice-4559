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
  CATEGORIA_TURISTA,
  Ticket
} from '../../models/ticket.model';
import {
  TicketService
} from '../../services/ticket.service';
import {
  NgClass,
  DatePipe,
  CurrencyPipe,
  CommonModule
} from '@angular/common';

@Component ({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    DatePipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit {
  ticketForm: FormGroup;
  tickets: Ticket[] = [];
  categorias = [
    {
      id: CATEGORIA_TURISTA.MENOR,
      nombre: 'Menor'
    },
    {
      id: CATEGORIA_TURISTA.ADULTO,
      nombre: 'Adulto'
    },
    {
      id: CATEGORIA_TURISTA.JUBILADO,
      nombre: 'Jubilado'
    }
  ];
  precioCalculado: number | null = null;
  mostrarPrecioFinal: boolean = false;
  resumenVentas: any[] = [];
  totalGeneral: number = 0;

  // Paginación
  pagina: number = 1;
  elementosPorPagina: number = 5;

  // Filtrado
  filtro: string = '';
  // Para controlar el modo edición
  editMode: boolean = false;
  editingIndex: number = -1;

// Modal para confirmar eliminación
  showDeleteModal: boolean = false;
  ticketToDeleteIndex: number = -1;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService
  ) {
    this.ticketForm = this.fb.group ({
      dni: ['', [Validators.required, Validators.pattern ('[0-9]{8}')]],
      precio: [0, [Validators.required, Validators.min (1)]],
      categoriaTurista: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaCompra: [new Date (), Validators.required]
    });
  }

  ngOnInit(): void {
    // Subscribirse a los tickets
    this.ticketService.getTickets ().subscribe ((tickets: Ticket[]) => {
      this.tickets = tickets;
      this.actualizarResumen ();
    });

    // Combinar las subscripciones de precio y categoría para calcular el precio final
    this.ticketForm.get ('precio')?.valueChanges.subscribe (() => this.calcularPrecioFinal ());
    this.ticketForm.get ('categoriaTurista')?.valueChanges.subscribe (() => this.calcularPrecioFinal ());

    // Calcular precio inicial si hay valores por defecto
    this.calcularPrecioFinal ();
  }

  calcularPrecioFinal(): void {
    const precio = this.ticketForm.get ('precio')?.value;
    const categoria = this.ticketForm.get ('categoriaTurista')?.value;

    if (precio > 0 && categoria) {
      let descuento = 0;

      if (Number (categoria) === CATEGORIA_TURISTA.MENOR) {
        descuento = 0.35; // 35%
      } else if (Number (categoria) === CATEGORIA_TURISTA.JUBILADO) {
        descuento = 0.5; // 50%
      }

      this.precioCalculado = precio * (1 - descuento);
      this.mostrarPrecioFinal = true;
    } else {
      this.mostrarPrecioFinal = false;
    }
  }

  // Iniciar edición de un ticket
  editarTicket(index: number): void {
    const ticket = this.ticketService.getTicketById (index);
    if (ticket) {
      this.ticketForm.setValue ({
        dni: ticket.dni,
        precio: ticket.precio,
        categoriaTurista: ticket.categoriaTurista,
        email: ticket.email,
        fechaCompra: ticket.fechaCompra
      });
      this.editMode = true;
      this.editingIndex = index;
      // Calcular precio final con los nuevos valores
      this.calcularPrecioFinal ();
    }
  }

// Cancelar la edición
  cancelarEdicion(): void {
    this.ticketForm.reset ({
      fechaCompra: new Date (),
      precio: 0,
      categoriaTurista: null
    });
    this.editMode = false;
    this.editingIndex = -1;
    this.mostrarPrecioFinal = false;
  }

// Guardar cambios en ticket existente
  guardarCambios(): void {
    if (this.ticketForm.valid && this.editingIndex >= 0) {
      const ticketActualizado: Ticket = {
        ...this.ticketForm.value,
        categoriaTurista: Number (this.ticketForm.get ('categoriaTurista')?.value)
      };
      this.ticketService.actualizarTicket (this.editingIndex, ticketActualizado);

      // Resetear formulario y modo edición
      this.ticketForm.reset ({
        fechaCompra: new Date (),
        precio: 0,
        categoriaTurista: null
      });
      this.editMode = false;
      this.editingIndex = -1;
      this.mostrarPrecioFinal = false;
    }
  }

// Confirmar eliminación de ticket
  confirmarEliminarTicket(index: number): void {
    this.ticketToDeleteIndex = index;
    this.showDeleteModal = true;
  }

// Eliminar ticket
  eliminarTicket(): void {
    if (this.ticketToDeleteIndex >= 0) {
      this.ticketService.eliminarTicket (this.ticketToDeleteIndex);
      this.showDeleteModal = false;
      this.ticketToDeleteIndex = -1;
    }
  }

// Cerrar modal de confirmación
  cerrarModalConfirmacion(): void {
    this.showDeleteModal = false;
    this.ticketToDeleteIndex = -1;
  }

// Modificar el método registrarTicket para usar este mismo formulario
  registrarTicket(): void {
    if (this.ticketForm.valid) {
      if (this.editMode) {
        this.guardarCambios ();
      } else {
        const nuevoTicket: Ticket = {
          ...this.ticketForm.value,
          categoriaTurista: Number (this.ticketForm.get ('categoriaTurista')?.value)
        };
        this.ticketService.agregarTicket (nuevoTicket);
        this.ticketForm.reset ({
          fechaCompra: new Date (),
          precio: 0,
          categoriaTurista: null
        });
        this.mostrarPrecioFinal = false;
      }
    }
  }

  actualizarResumen(): void {
    this.resumenVentas = this.ticketService.getResumenVentas ();
    this.totalGeneral = this.ticketService.getTotalGeneral ();
  }

  // Métodos para la paginación
  cambiarPagina(pagina: number): void {
    this.pagina = pagina;
  }

  get ticketsPaginados(): Ticket[] {
    const inicio = (this.pagina - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;

    // Si hay filtro, aplicarlo
    const ticketsFiltrados = this.filtro
      ? this.tickets.filter (t =>
        t.dni.includes (this.filtro) ||
        t.email.toLowerCase ().includes (this.filtro.toLowerCase ()))
      : this.tickets;

    return ticketsFiltrados.slice (inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil (this.tickets.length / this.elementosPorPagina);
  }

  getNombreCategoria(categoria: number): string {
    const categoriaEncontrada = this.categorias.find (c => c.id === categoria);
    return categoriaEncontrada ? categoriaEncontrada.nombre : '';
  }
}
