import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';
import { clientes } from 'src/app/models/clientes-model';
import { ClientesService } from 'src/app/service/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {
  item: any;
onSubmit() {
throw new Error('Method not implemented.');
}
  listClientes: clientes[] = [];
  formClientes: FormGroup = new FormGroup ({});
   isUpdate: boolean = false;
  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    // Llama al método list() en el ngOnInit
    this.list();

    this.formClientes= new FormGroup({
      pais_RESIDENCIA: new FormControl (''),
      telefono:  new FormControl (''),
      primer_APELLIDO:  new FormControl (''),
      direccion:  new FormControl (''),
      primer_NOMBRE:  new FormControl (''),
      segundo_APELLIDO: new FormControl (''),
      correo: new FormControl (''),
      usuario: new FormControl (''),
      cod_CLIENTE: new FormControl (''),
      segundo_NOMBRE:  new FormControl ('')
  
      });
  }

  list() {
    this.clientesService.getClientes().subscribe(resp => {
      if (resp) {
        this.listClientes = resp;
      }
    });
  }
  
newCliente(){
this.isUpdate = false;
this.formClientes.reset();

}

selectItem(item: any) {
  this.isUpdate = true;
  console.log('Item seleccionado:', item);
  console.log('ID del cliente:', item.cod_CLIENTE);
  console.log('Nombre completo:', item.primer_NOMBRE + ' ' + item.primer_APELLIDO);
  this.formClientes.controls['cod_CLIENTE'].setValue(item.cod_CLIENTE);
  this.formClientes.controls['usuario'].setValue(item.usuario);
  this.formClientes.controls['primer_NOMBRE'].setValue(item.primer_NOMBRE);
  this.formClientes.controls['segundo_NOMBRE'].setValue(item.segundo_NOMBRE);
  this.formClientes.controls['primer_APELLIDO'].setValue(item.primer_APELLIDO);
  this.formClientes.controls['segundo_APELLIDO'].setValue(item.segundo_APELLIDO);
  this.formClientes.controls['telefono'].setValue(item.telefono);
  this.formClientes.controls['direccion'].setValue(item.direccion);
  this.formClientes.controls['correo'].setValue(item.correo);
  this.formClientes.controls['pais_RESIDENCIA'].setValue(item.pais_RESIDENCIA);
}




  save(){
    this.formClientes.controls['status'].setValue('1');
    this.clientesService.saveClientes(this.formClientes.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formClientes.reset();
      }
    });
  }
}

