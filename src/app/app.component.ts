import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TransactionsService } from './shared/transactions.service.js';
import { Data } from './data.js';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe.js';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';
import { Photos } from './photos.js';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule, SearchPipe],
  providers: [TransactionsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'my-app';
  searchKey: string = '';
  users: Data[] = [];
  photos: Photos[] = [];
  selectedUserId?: number; // Track selected user ID

  chart : any  ;

  constructor(private _transactions: TransactionsService) {}
  ngOnInit(): void {
    this.getTransactionsUsers();
    this.getTransactionsPosts();
    this.getTransactionsPhotos();
    // this.getChart()
  }

  getTransactionsUsers() {
    this._transactions.getUsers().subscribe(data => {
      this.users= data.map((user: Data)  => ({
        ...user,
        totalTransactionAmount: this.generateRandomAmount(),
        transactionsPerDay: this.generateRandomTransactions()
      }));
    });
  }
  getTransactionsPosts() {
    this._transactions.getPosts().subscribe({
      next: (res) => {
        // console.log('posts', res);
      },
    });
  }

  getTransactionsPhotos() {
    this._transactions.getPhotos().subscribe({
      next: (res) => {
        this.photos = res;
        // console.log('photos', res);
      },
    });
  }


  getPhotoUrl(userId: number): string {
    const photo = this.photos.find(p => p.id === userId);
    return photo ? photo.url : '';
  }


  generateRandomAmount(): number {
    return Math.floor(Math.random() * 1000);
  }

  generateRandomTransactions(): number {
    return Math.floor(Math.random() * 10);
  }



  getChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy(); // Destroy the previous chart if it exists
    }

    // Register necessary components
    Chart.register(LinearScale, CategoryScale, BarElement, BarController, Title, Tooltip, Legend);

    // Filter data for the selected user
    const user = this.users.find(user => user.id === this.selectedUserId);
    if (!user) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Transaction Amount', 'Transactions per Day'],
        datasets: [{
          label: 'Transaction Data',
          data: [user.totalTransactionAmount, user.transactionsPerDay],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category'
          },
          y: {
            // beginAtZero: true,
            ticks: {
              // beginAtZero: true
            }
          }
        }
      }
    });
  }

  trackByUserId(index: number, user: Data): number {
    return user.id;
  }

  onUserSelect(userId: number): void {
    this.selectedUserId = userId;
    this.getChart();
  }


}
