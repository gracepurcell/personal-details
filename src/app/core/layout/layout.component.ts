import { Component } from '@angular/core';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  tabs = [
    { path: 'strategy', label: 'Strategy' },
    { path: 'details', label: 'Personal Details'}
  ];
}
