import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from './contract.service';
import type { Contract as ContractModel } from './contract.model';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contract.component.html'
})
export class ContractComponent implements OnInit {
  contract = signal<ContractModel | null>(null);
  loading = signal(true);
  saving = signal(false);
  saved = signal(false);
  error = signal(false);

  companyNameCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(80),
  ]);

  constructor(
    private route: ActivatedRoute,
    private contractService: ContractService
  ) {}

  ngOnInit(): void {
    // /contract/:id → si présent on le prend, sinon on charge le 1er contrat
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
  
    if (Number.isNaN(id)) {
      // Pas d'id dans l'URL → on charge le premier contrat dispo
      this.loading.set(true);
      this.error.set(false);
  
      this.contractService.getAllContracts().subscribe({
        next: (list) => {
          if (list.length) {
            const first = list[0];
            this.contract.set(first);
            this.companyNameCtrl.setValue(first.companyName);
          } else {
            this.error.set(true);
          }
          this.loading.set(false);
        },
        error: () => {
          this.error.set(true);
          this.loading.set(false);
        },
      });
      return;
    }
  
    // Id présent → on charge ce contrat précis
    this.fetchContract(id);
  }

  private fetchContract(id: number) {
    this.loading.set(true);
    this.error.set(false);

    this.contractService.getContract(id).subscribe({
      next: (c) => {
        this.contract.set(c);
        this.companyNameCtrl.setValue(c.companyName);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  saveCompanyName() {
    const c = this.contract();
    if (!c || this.companyNameCtrl.invalid) return;

    this.saving.set(true);
    this.saved.set(false);

    const updated: ContractModel = { ...c, companyName: this.companyNameCtrl.value || '' };

    this.contractService.updateContract(updated).subscribe({
      next: (res) => {
        this.contract.set(res);
        this.saved.set(true);
        this.saving.set(false);
        setTimeout(() => this.saved.set(false), 2500);
      },
      error: () => {
        this.saving.set(false);
        alert('Échec de la mise à jour.');
      },
    });
  }
}