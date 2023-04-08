import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    email = new FormControl('');
    password = new FormControl('');
    repassword = new FormControl('');
    firstname = new FormControl('');
    lastname = new FormControl('');

  constructor(private router: Router, private location: Location, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signin(this.email.value, this.password.value).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.email.value,
        username: this.email.value.split('@')[0],
        name: {
          firstname: this.firstname.value,
          lastname: this.lastname.value
        }
      };
      this.userService.create(user).then(_ => {
        console.log('User added successfully.');
        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.log(error);
      })
    }).catch(error => {
      console.error(error);
      if(error == "FirebaseError: Firebase: Error (auth/invalid-email)."){
        alert('Nem megfelelő email!');
      } 
      if(error == "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."){
        alert('Nem megfelelő jelszó! (Minimum 6 karakter)');
      } 
    }); 
  }

  goBack() {
    this.location.back();
  }

}
