import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ContractService } from './contract.service';
import type { Contract as ContractModel } from './contract.model';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contract.component.html'
})
export class ContractComponent implements OnInit {

  // ✅ State réactif avec Angular Signals
  contract = signal<ContractModel | null>(null);
  loading = signal(true);
  saving = signal(false);
  saved = signal(false);

  // ✅ FormControl pour le nom de l’entreprise
  companyNameCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(80)
  ]);

  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    // 📌 Récupération du contrat depuis l’API
    this.contractService.getContract(1).subscribe({
      next: (data) => {
        this.contract.set(data);
        this.companyNameCtrl.setValue(data.companyName); // préremplir le champ
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du contrat :', err);
        this.loading.set(false);
      }
    });
  }

  /**
   * 💾 Sauvegarder le nouveau nom d’entreprise
   */
  saveCompanyName(): void {
    if (!this.contract() || this.companyNameCtrl.invalid) return;

    this.saving.set(true);
    this.saved.set(false);

    const updatedContract: ContractModel = {
      ...this.contract()!,
      companyName: this.companyNameCtrl.value || ''
    };

    // 📌 Appel PUT vers l’API
    this.contractService.updateContract(updatedContract).subscribe({
      next: (data) => {
        this.contract.set(data);
        this.saving.set(false);
        this.saved.set(true);

        // Message de confirmation temporaire
        setTimeout(() => this.saved.set(false), 3000);
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde :', err);
        this.saving.set(false);
      }
    });
  }
}