import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 0;
  pages: number[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number): void {
    this.userService.getUsers(page, this.itemsPerPage).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.users = response.data; // Update this according to your API response structure
          this.totalItems = response.all; // Total number of items
          this.totalItems = response.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  pageChanged(page: number): void {
    this.currentPage = page;
    this.loadUsers(this.currentPage);
  }

  goToSponsor(): void {
    this.router.navigate(['/sponsor-list']);
  }

  deleteUser(userId: any): void {
    this.userService.deleteUser(userId).subscribe((response) => {
      if (response) {
        this.loadUsers(this.currentPage); // Reload users on the current page
      }
    }, (error) => {
      console.error('Error deleting user:', error);
    });
  }

  goToAddUser(): void {
    this.router.navigate(['/user-form']);
  }

  onUpdateButtonClick(user: any): void {
    this.router.navigate(['/update-user-form'], { state: { user: user } });
  }
}
