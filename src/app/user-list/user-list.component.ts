import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { UserService } from './services/user.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  pagedUsers: any[] = [];
  currentPage = 1;
  itemsPerPage = 20;

  constructor(
    private userService: UserService,
    private router: Router // Inject Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  goToSponsor(): void {
    this.router.navigate(['/sponsor-list']);
  }
  loadUsers(): void {
    this.userService.getUsers(this.currentPage, this.itemsPerPage).subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          // If the response is an array, assign it directly to this.users
          this.users = response;
          console.log(response); // Log the response for debugging
        } else if (response && Array.isArray(response.data)) {
          // If the response is an object with a 'data' property containing an array
          this.users = response.data;
          console.log(response.data); // Log the array of users for debugging
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }


  editUser(user: any): void {
    // Implement edit user logic
  }

  deleteUser(userId: any): void {
    // Implement delete user logic
    console.log(userId)
    this.userService.deleteUser(userId).subscribe((response) => {
      if (response) {
        console.log(response)
        this.loadUsers()
      }
    }, (error) => {
      console.log(error)

    })
  }

  goToAddUser(): void {
    this.router.navigate(['/user-form']); // Navigate to user form component
  }
  onUpdateButtonClick(user: {}): void {
    this.router.navigate(['/update-user-form'], { state: { user: user } });
  }

  setPage(page: number): void {
    // Calculate start and end indexes
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.users.length - 1);

    // Slice users array based on calculated indexes
    this.pagedUsers = this.users.slice(startIndex, endIndex + 1);
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }


}
