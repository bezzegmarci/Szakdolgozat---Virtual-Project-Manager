import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
   this.authService.login(this.email.value, this.password.value).then(cred => {
    console.log(cred);
    this.router.navigateByUrl('/main');
   }).catch(error => {
      console.error(error);
      if(error == "FirebaseError: Firebase: Error (auth/invalid-email)."){
        alert('Nem megfelelő email vagy jelszó!');
      }
      if(error == "FirebaseError: Firebase: Error (auth/internal-error)."){
        alert('Nem megfelelő email vagy jelszó!');
      }
      if(error == "FirebaseError: Firebase: Error (auth/wrong-password)."){
        alert('Nem megfelelő email vagy jelszó!');
      }
      if(error == "FirebaseError: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."){
        alert('Túl sok próbálkozás miatt a felhasználó letiltva átmenetileg!');
      }
      if(error == "FirebaseError: Firebase: Error (auth/user-not-found)."){
        alert('Nincs ilyen felhasználó!');
      }
      
    });
  }

}
