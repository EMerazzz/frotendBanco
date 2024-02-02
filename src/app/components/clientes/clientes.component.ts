import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { clientes } from 'src/app/models/clientes-model';
import { ClientesService } from 'src/app/service/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})

export class ClientesComponent implements OnInit {
submitForm() {
  const formData = this.formClientes.value;
  console.log('Datos del formulario:', formData);
}
  listClientes: clientes[] = [];
  formClientes!: FormGroup;
  isUpdate: boolean = false;

  constructor(private clientesService: ClientesService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Llama al método list() en el ngOnInit
    this.list();

    this.formClientes = this.formBuilder.group({
      cod_CLIENTE: [''],
      usuario: [''],
      primer_NOMBRE: [''],
      segundo_NOMBRE: [''],
      primer_APELLIDO: [''],
      segundo_APELLIDO: [''],
      telefono: [''],
      direccion: [''],
      correo: [''],
      pais_RESIDENCIA: [''],
    });
  }

  list() {
    this.clientesService.getClientes().subscribe(resp => {
      if (resp) {
        this.listClientes = resp;
      }
    });
  }

  newCliente() {
    this.isUpdate = false;
    this.formClientes.reset();
  }

  selectItem(item: any) {
    this.isUpdate = true;
    this.formClientes.patchValue(item);
  }

  save() {
    const formData = this.formClientes?.value;
    console.log('Datos del formulario en save:', formData)
    this.clientesService.saveClientes(this.formClientes.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formClientes.reset();
        
      }
    });
  }

  update() {
    this.clientesService.updateClientes(this.formClientes.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formClientes.reset();
      }
    });
  }
}
