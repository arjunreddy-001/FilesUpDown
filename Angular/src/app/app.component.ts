import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.items = [
      {
        label: 'File Manager',
        icon: 'pi pi-folder-open',
      },
      {
        label: 'View Images',
        icon: 'pi pi-images',
      },
    ];
  }
}
