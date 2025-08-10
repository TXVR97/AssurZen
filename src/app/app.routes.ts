// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { Home } from './features/home/home';
import { ContractComponent } from './features/contract/contract';
import { Attestations } from './features/attestations/attestations';
import { Reimbursements } from './features/reimbursements/reimbursements';
import { Support } from './features/support/support';

export const routes: Routes = [
  { path: '', component: Home, title: 'Asurzen • Accueil' },
  { path: 'contract', component: ContractComponent, title: 'Asurzen • Mon contrat' },
  { path: 'attestations', component: Attestations, title: 'Asurzen • Attestations' },
  { path: 'reimbursements', component: Reimbursements, title: 'Asurzen • Remboursements' },
  { path: 'support', component: Support, title: 'Asurzen • Support' },
  { path: '**', redirectTo: '' },
];