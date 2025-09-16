import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-my-recognitions',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './my-recognitions.component.html',
  styleUrl: './my-recognitions.component.scss'
})
export class MyRecognitionsComponent implements AfterViewInit {
  // Recognitions given to me
  received = [
    { name: 'Aisha Khan', category: 'Help', date: '2025-09-10', comments: 'Helped with onboarding.', points: 10 },
    { name: 'Ravi Patel', category: 'Bug Fix', date: '2025-09-08', comments: 'Fixed a critical bug.', points: 8 }
  ];
  // Recognitions I gave
  given = [
    { name: 'Meera Singh', category: 'Innovation', date: '2025-09-12', comments: 'Great new feature idea.', points: 12 },
    { name: 'Jon Lee', category: 'Customer Appreciation', date: '2025-09-09', comments: 'Excellent client support.', points: 7 }
  ];

  receivedDataSource = new MatTableDataSource(this.received);
  givenDataSource = new MatTableDataSource(this.given);

  @ViewChild('receivedPaginator') receivedPaginator!: MatPaginator;
  @ViewChild('givenPaginator') givenPaginator!: MatPaginator;
  @ViewChild('receivedSort') receivedSort!: MatSort;
  @ViewChild('givenSort') givenSort!: MatSort;

  hoveredRow: any = null;

  ngAfterViewInit() {
    this.receivedDataSource.paginator = this.receivedPaginator;
    this.givenDataSource.paginator = this.givenPaginator;
    this.receivedDataSource.sort = this.receivedSort;
    this.givenDataSource.sort = this.givenSort;
  }

  applyReceivedFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.receivedDataSource.filter = filterValue;
  }


  applyGivenFilter(filterValue: string) {
    this.givenDataSource.filter = filterValue.trim().toLowerCase();
  }

  
}
