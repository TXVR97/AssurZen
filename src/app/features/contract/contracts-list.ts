import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContractService } from './contract.service';
import type { Contract } from './contract.model';

@Component({
  selector: 'app-contracts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contracts-list.component.html'
})
export class ContractsListComponent implements OnInit {
  contracts: Contract[] = [];
  loading = true;
  error = false;

  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.contractService.getAllContracts().subscribe({
      next: (data) => {
        this.contracts = data ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}