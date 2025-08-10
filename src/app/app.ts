import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="min-h-screen flex flex-col">
      <header class="bg-blue-600 text-white">
        <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a routerLink="/" class="font-bold tracking-wide">Asurzen</a>
          <nav class="flex gap-4 text-sm">
            <a routerLink="/contracts" class="hover:underline">Contrats</a>
            <a routerLink="/attestations" class="hover:underline">Attestations</a>
            <a routerLink="/reimbursements" class="hover:underline">Remboursements</a>
            <a routerLink="/support" class="hover:underline">Support</a>
          </nav>
        </div>
      </header>

      <main class="flex-1">
        <div class="max-w-5xl mx-auto px-4 py-6">
          <router-outlet />
        </div>
      </main>

      <footer class="border-t">
        <div class="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-500">
          © 2025 Asurzen — Assurance santé pour freelances & TPE
        </div>
      </footer>
    </div>
  `,
})
export class App {}