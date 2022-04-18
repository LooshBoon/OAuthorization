import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { OauthService } from '../services/oauth.service';
import { UsersService } from '../services/users.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  isLoggedIn = false;
  steamStatus = false;
  users: any;
  oauth: any;
  user_id: string[];
  oauth_id: string[];
  fName = '';

constructor(


  private route: ActivatedRoute,
  private router: Router,
  private oauthService: OauthService,
  private usersService: UsersService,
  private tokenStorageService: TokenStorageService,
  private breakpointObserver: BreakpointObserver) { }





  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();


      if (this.isLoggedIn) {

        const token = this.tokenStorageService.getUser();

        this.oauth_id = token.oauths_oauth_id;

        this.user_id = token.user_id
        this.fName = token.fName;


      }

      this.retrieveUsers(this.user_id);
      this.retrieveOauth(this.oauth_id)

      console.log(this.steamStatus)


  }


//--------------------------------------------------------------------------------------------------------

retrieveUsers(user_id): void {
  this.usersService.getOne(user_id)
    .subscribe(
      data => {
        this.users = data;
        this.steamStatus = this.oauth.steam_status
        console.log(data);                                  //Get USERS table data from the database
      },
      error => {
        console.log(error);
      });
}

//--------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------

retrieveOauth(oauth_id): void {
  this.oauthService.getOne(this.oauth_id)
    .subscribe(
      data => {
        this.oauth = data;
        console.log(data);                                //Get USERS table data from the database
      },
      error => {
        console.log(error);
      });
}

//--------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------------------------------------

/*updateStatus(steam_status): void {
  const data = {
    steam_status: steam_status,
  };

  this.oauthService.update(this.oauth_id, data).subscribe(
    (response) => {
      this.oauth.steam_status = steam_status;                      //Updates the status of the referral record on the database (true or false)
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}

//-----------------------------------------------------------------------------------------------------------------------------------

updateBattlenetStatus(steam_status): void {
  const data = {
    steam_status: steam_status,
  };

  this.oauthService.updateBattlenetStatus(this.oauth_id, data).subscribe(
    (response) => {
      this.oauth.steam_status = steam_status;                      //Updates the status of the referral record on the database (true or false)
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}*/































  steamRedir(): void {
    window.location.href = "http://localhost:9000/auth/steam" ;
  }

  blizzardRedir(): void {
    document.location.href = "http://localhost:9000/oauth/battlenet" ;
  }






}
