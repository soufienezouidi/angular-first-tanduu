import { CanActivate } from '@angular/router';
import Swal from 'sweetalert2';

export class Routingguard implements CanActivate {
  canActivate() {

    let cu: any = JSON.parse(localStorage.getItem('main'));
    let serviceLang = "name_" + localStorage.getItem("language")
    if (cu) {
      if (cu.is_active != true) {
        let message = {
          name_en: "Your account is not activated yet. Check your email then try again.",
          name_de: "Dein Benutzerkonto ist noch nicht aktiviert. Überprüfen Sie Ihre E-Mail und versuchen Sie es erneut.",
          name_fr: "Votre compte n'est pas encore activé. Vérifiez votre e-mail, puis réessayez.",
        }
        Swal.fire({
          icon: "warning",
          title: message[serviceLang]
        })
        return false;
      } else {
        if (cu.roles[0] === 'ROLE_ADMIN') {
          return true;
        } else {
          let message = {
            name_en: "You should login as jobber to continue.",
            name_de: "Sie sollten sich als Jobber anmelden, um fortzufahren.",
            name_fr: "Vous devez vous connecter en tant que jobber pour continuer.",
          }
          Swal.fire({
            icon: "warning",
            title: message[serviceLang]
          })
          return false;
        }
      }
    } else {

      return false;
    }
  }
}
export class simpleuserguard implements CanActivate {
  canActivate() {

    let cu: any = JSON.parse(localStorage.getItem('main'));
    if (cu) {
      if (cu.is_active != true) {

        return false;
      } else {
        if (cu.roles[0] === 'ROLE_CUSTOMER') {
          return true;
        } else {

          return false;
        }
      }
    } else {

      return false;
    }
  }
}
export class tanduu_adminguard implements CanActivate {
  canActivate() {

    let cu: any = JSON.parse(localStorage.getItem('main'));
    if (cu) {
      if (cu.is_active != true) {

        return false;
      } else {
        if (cu.roles[0] === 'ROLE_TANDUU_ADMIN') {
          return true;
        } else {

          return false;
        }
      }
    } else {

      return false;
    }
  }
}
export class commercial_guard implements CanActivate {
  canActivate() {

    let cu: any = JSON.parse(localStorage.getItem('main'));
    if (cu) {

      if (!cu.is_active) {

        return false;
      } else {
        if (cu.roles[0] === 'ROLE_COMMERCIAL') {
          return true;
        } else {

          return false;
        }
      }
    } else {

      return false;
    }
  }
}
