import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Payment {
  id: number;
  student: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  payments: Payment[] = [
    { id: 1, student: 'Alice Johnson', amount: 1200, date: '2025-01-15' },
    { id: 2, student: 'Bob Smith', amount: 950, date: '2025-02-10' }
  ];
}
