import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Contract as ContractModel } from './contract.model';

@Injectable({ providedIn: 'root' })
export class ContractService {
  private readonly apiUrl = 'http://localhost:3000/contracts';
  constructor(private http: HttpClient) {}
  // Récupérer tous les contrats
  getAllContracts(): Observable<ContractModel[]> {
    return this.http.get<ContractModel[]>(this.apiUrl);
  }
  // --- Noms "techniques" bas niveau ---
  getById(id: number): Observable<ContractModel> {
    return this.http.get<ContractModel>(`${this.apiUrl}/${id}`);
  }
  patch(id: number, data: Partial<ContractModel>): Observable<ContractModel> {
    return this.http.patch<ContractModel>(`${this.apiUrl}/${id}`, data);
  }
  // --- Alias "métier" utilisés par ton composant ---
  /** Récupère un contrat (alias de getById) */
  getContract(id: number): Observable<ContractModel> {
    return this.getById(id);
  }
  /** Met à jour tout le contrat (PUT) ou juste une partie (PATCH) */
  updateContract(contract: ContractModel): Observable<ContractModel> {
    // Si tu préfères PATCH du seul champ modifié, utilise la ligne suivante :
    // return this.patch(contract.id, { companyName: contract.companyName });
    return this.http.put<ContractModel>(`${this.apiUrl}/${contract.id}`, contract);
  }
}