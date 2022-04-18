import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: any;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';


   //Declare user variables
   last_login: '';
   user_id: string[] = [];
   fName: string[] = [];
   lName: string[] = [];
   email: string[] = [];
   country: string[] = [];
   gender: string[] = [];
   birthdate: string[] = [];
   today = new Date().toLocaleDateString('en-GB');
   updateDate = new Date().toLocaleString();

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,

    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;

      //Get user data
      this.isLoggedIn = true;
      this.fName = this.tokenStorage.getUser().fName;
      this.lName = this.tokenStorage.getUser().lName;
      this.email = this.tokenStorage.getUser().email;
      this.country = this.tokenStorage.getUser().country;
      this.gender = this.tokenStorage.getUser().gender;
      this.birthdate = this.tokenStorage.getUser().birthdate;
    }



  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.fName = this.tokenStorage.getUser().fName;
        this.router.navigate(['/ESPL']);
      },

      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;

      }
    );
  }



  reloadPage(): void {
    window.location.reload();
  }



}


