import { Component, AfterViewInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  totalPointsGivenToMe = 0;
  totalPointsGivenByMe = 0;
  topCategoryGivenToMe = '';
  myCurrentRank = 0;
  // Sample points for doughnut chart (hardcoded)
  doughnutData = {
    labels: ['Bug Fix', 'Help', 'Innovation', 'Customer Appreciation'],
    givenToMe: [12, 8, 15, 5],
    givenByMe: [10, 6, 9, 3]
  };
  leaderboard = [
    { name: "Aisha Khan", dept: "Sales", points: 270, avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    { name: "Ravi Patel", dept: "Engineering", points: 240, avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "Meera Singh", dept: "Customer Success", points: 210, avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { name: "Jon Lee", dept: "Design", points: 190, avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
    { name: "Sara Ahmed", dept: "Finance", points: 170, avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
    { name: "Dev Raj", dept: "Engineering", points: 150, avatar: "https://randomuser.me/api/portraits/men/6.jpg" }
  ];
  filteredLeaderboard = [...this.leaderboard];
  searchQuery = '';
  period = 'monthly';

  currentUser = {
    id: 1,
    name: 'Aisha Khan',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    badges: [
      { name: 'Top Performer', icon: 'assets/badges/top-performer.png' },
      { name: 'Team Player', icon: 'assets/badges/team-player.png' }
    ]
  };

  ngOnInit() {
    this.sortLeaderboard();
    this.totalPointsGivenToMe = this.doughnutData.givenToMe.reduce((sum, val) => sum + val, 0);
    this.totalPointsGivenByMe = this.doughnutData.givenByMe.reduce((sum, val) => sum + val, 0);
    // Top category given to me
    const maxIdx = this.doughnutData.givenToMe.indexOf(Math.max(...this.doughnutData.givenToMe));
    this.topCategoryGivenToMe = this.doughnutData.labels[maxIdx];
    // Assume current user is first in leaderboard for demo
    this.myCurrentRank = this.filteredLeaderboard.findIndex(row => row.name === 'Aisha Khan') + 1;
  }

  ngAfterViewInit() {
    // Render doughnut chart using Chart.js
    // @ts-ignore
    if (window.Chart) {
      this.renderDoughnut();
      this.renderBarChart();
    } else {
      // Dynamically load Chart.js if not present
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => {
        this.renderDoughnut();
        this.renderBarChart();
      };
      document.body.appendChild(script);
    }
  }

  renderBarChart() {
    // @ts-ignore
    const Chart = window.Chart;
    const ctx = document.getElementById('categoryBarChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Bug Fix', 'Help', 'Innovation', 'Customer Appreciation'],
        datasets: [
          {
            label: 'Points',
            data: [5, 10, 15, 8],
            backgroundColor: ['#7c3aed', '#38bdf8', '#fbbf24', '#f472b6'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Category Points' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
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

  onPeriodChange(period: string) {
    this.period = period;
    // In a real app, fetch data for the selected period
    this.sortLeaderboard();
  }

  clearFilters() {
    this.searchQuery = '';
    this.period = 'monthly';
    this.onSearch(this.searchQuery);
    this.onPeriodChange(this.period);
  }
}
