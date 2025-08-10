import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <h1 class="text-xl font-semibold">Bienvenue sur votre portail assuré</h1>
    <p class="mt-2 text-gray-700">
      Gérez votre contrat, téléchargez vos attestations, suivez vos remboursements et contactez un conseiller.
    </p>
  `,
  styles: ``
})
export class Home {

}
