import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-my-recognitions',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './my-recognitions.component.html',
  styleUrl: './my-recognitions.component.scss'
})
export class MyRecognitionsComponent {
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
}
