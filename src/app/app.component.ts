import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from './shared/client.interface';
import { ClientService } from './shared/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public clientForm: FormGroup;
  public clients: any;
  
  title = 'cei-client';

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder
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
      console.log(res);
      this.clientForm.reset();
      this.getClients();
    })
  }
}
