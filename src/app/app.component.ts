import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from './shared/client.interface';
import { ClientService } from './shared/client.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public clientForm: FormGroup;
  public clients: any;

  public isShowUpdate: boolean = false;
  public isId: any;
  
  title = 'cei-client';

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      country: ['', [Validators.required]],      
    })
  }

  ngOnInit(): void {
    this.getClients();    
  }

  getClients() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res;
      console.log(res);
    });
  }

  createClient() {       
    const data: Client = {
      firstName: this.clientForm.controls['firstName'].value,
      lastName: this.clientForm.controls['lastName'].value,
      email: this.clientForm.controls['email'].value,
      phone: this.clientForm.controls['phone'].value,
      dni: this.clientForm.controls['dni'].value,
      country: this.clientForm.controls['country'].value
    }
       
    this.clientService.createClient(data).subscribe(res => {
      this.toastr.success(`${res.message}`, 'Success');      
      this.clientForm.reset();
      this.getClients();
    })
  }

  deleteClient(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(id).subscribe(res => {
          Swal.fire(
            'Borrado!',
            `${res.message}`,
            'success'
          )
          this.getClients();
        })        
      }
    })
    
  }

  getClientById(id: number) {
    this.isId = id;
    this.isShowUpdate = true;
    this.clientService.getClientById(id).subscribe(res => {      
      this.clientForm.setValue({
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        phone: res.phone,
        dni: res.dni,
        country: res.country
      })
    })
  }

  updateClient() {
    const data: Client = {
      firstName: this.clientForm.controls['firstName'].value,
      lastName: this.clientForm.controls['lastName'].value,
      email: this.clientForm.controls['email'].value,
      phone: this.clientForm.controls['phone'].value,
      dni: this.clientForm.controls['dni'].value,
      country: this.clientForm.controls['country'].value
    }
    this.clientService.updateClient(this.isId, data).subscribe((res: any) => {
      this.toastr.success(`${res.message}`, 'Success');
      this.clientForm.reset();
      this.isShowUpdate = false;
      this.getClients();
    })
  }
}
