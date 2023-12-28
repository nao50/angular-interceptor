import { Routes } from '@angular/router';
import { CsrComponent } from './csr/csr.component';
import { SsrComponent } from './ssr/ssr.component';

export const routes: Routes = [
  {
    path: 'csr',
    component: CsrComponent,
  },
  {
    path: 'ssr',
    component: SsrComponent,
  },
  {
    path: '**',
    redirectTo: 'csr',
  },
];
