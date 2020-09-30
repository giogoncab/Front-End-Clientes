import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../Cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from '../../usuarios/auth.service';
import { FacturaService } from '../../facturas/services/factura.service';
import { Factura } from '../../facturas/models/factura';


@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public titulo: string = "Perfil del cliente";
  public fotoSeleccionada: File;
  public progreso: number = 0;
  @Input() cliente: Cliente;

  constructor(private clienteService: ClienteService, public modalService: ModalService, public authService: AuthService,
    private facturaService: FacturaService) { }

  ngOnInit(): void {
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0){
      swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if (!this.fotoSeleccionada){
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else{
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).
      subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded / event.total) * 100);
        }else if (event.type === HttpEventType.Response){
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;

          this.modalService.notificarUpload.emit(this.cliente);
          swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
        }
      });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

  delete(factura: Factura): void{
    swal.fire({
      title: 'Esta seguro?',
      text: `Seguro que desea eliminar la factura  ${factura.descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.facturaService.delete(factura.id).subscribe(
          reponse => {
            this.cliente.facturas = this.cliente.facturas.filter(fac => fac !== factura);
            swal.fire(
              'Factura Eliminada!',
              `Factura ${factura.descripcion} eliminada con exito.`,
              'success'
            );
          }
        );
      }
    });
  }

}
