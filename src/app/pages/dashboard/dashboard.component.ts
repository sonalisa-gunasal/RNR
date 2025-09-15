import { Component, AfterViewInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  // Sample points for doughnut chart (hardcoded)
  doughnutData = {
    labels: ['Bug Fix', 'Help', 'Innovation', 'Customer Appreciation'],
    givenToMe: [12, 8, 15, 5],
    givenByMe: [10, 6, 9, 3]
  };
  leaderboard = [
    { name: "Aisha Khan", dept: "Sales", points: 270 },
    { name: "Ravi Patel", dept: "Engineering", points: 240 },
    { name: "Meera Singh", dept: "Customer Success", points: 210 },
    { name: "Jon Lee", dept: "Design", points: 190 },
    { name: "Sara Ahmed", dept: "Finance", points: 170 },
    { name: "Dev Raj", dept: "Engineering", points: 150 }
  ];
  filteredLeaderboard = [...this.leaderboard];
  searchQuery = '';
  period = 'monthly';

  ngOnInit() {
    this.sortLeaderboard();
  }

  ngAfterViewInit() {
    // Render doughnut chart using Chart.js
    // @ts-ignore
    if (window.Chart) {
      this.renderDoughnut();
    } else {
      // Dynamically load Chart.js if not present
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => this.renderDoughnut();
      document.body.appendChild(script);
    }
  }

  renderDoughnut() {
    // @ts-ignore
    const Chart = window.Chart;
    const ctx = document.getElementById('doughnutChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.doughnutData.labels,
        datasets: [
          {
            label: 'Given To Me',
            data: this.doughnutData.givenToMe,
            backgroundColor: ['#7c3aed', '#38bdf8', '#fbbf24', '#f472b6'],
            borderWidth: 1
          },
          {
            label: 'Given By Me',
            data: this.doughnutData.givenByMe,
            backgroundColor: ['#a5b4fc', '#67e8f9', '#fde68a', '#fbcfe8'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  sortLeaderboard() {
    this.filteredLeaderboard = [...this.leaderboard].sort((a, b) => b.points - a.points);
  }

  onSearch(q: string) {
    this.searchQuery = q;
    const query = q.toLowerCase();
    this.filteredLeaderboard = this.leaderboard.filter(r =>
      r.name.toLowerCase().includes(query) || r.dept.toLowerCase().includes(query)
    ).sort((a, b) => b.points - a.points);
  }

  // onPeriodChange(period: string) {
  //   this.period = period;
  //   // In a real app, fetch data for the selected period
  //   this.sortLeaderboard();
  // }
}
