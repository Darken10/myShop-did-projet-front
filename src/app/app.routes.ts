import { Routes } from '@angular/router';
import {CaissierDashbordPageComponent} from "./pages/caissier/caissier-dashbord-page/caissier-dashbord-page.component";
import {ForbidenPageComponent} from "./pages/errors/forbiden-page/forbiden-page.component";
import {LoginPageComponent} from "./pages/auth/login-page/login-page.component";
import {AdminLayoutPageComponent} from "./pages/admin/admin-layout-page/admin-layout-page.component";
import {AdminDashbordPageComponent} from "./pages/admin/admin-dashbord-page/admin-dashbord-page.component";
import {CaissierLayoutPageComponent} from "./pages/caissier/caissier-layout-page/caissier-layout-page.component";
import {
  GestionnaireLayoutPageComponent
} from "./pages/gestionnaire/gestionnaire-layout-page/gestionnaire-layout-page.component";
import {
  GestionnaireDashbordPageComponent
} from "./pages/gestionnaire/gestionnaire-dashbord-page/gestionnaire-dashbord-page.component";
import {NotFoundPageComponent} from "./pages/errors/not-found-page/not-found-page.component";
import {InternalServerPageComponent} from "./pages/errors/internal-server-page/internal-server-page.component";
import {MaintenacePageComponent} from "./pages/errors/maintenace-page/maintenace-page.component";
import {AuthLayoutPageComponent} from "./pages/auth/auth-layout-page/auth-layout-page.component";
import {ChangePasswordPageComponent} from "./pages/auth/change-password-page/change-password-page.component";
import {ResetPasswordPageComponent} from "./pages/auth/reset-password-page/reset-password-page.component";
import {
  ActiveAccountPasswordPageComponent
} from "./pages/auth/active-account-password-page/active-account-password-page.component";
import {
  CaissierProduitListPageComponent
} from "./pages/caissier/caissier-produit-list-page/caissier-produit-list-page.component";
import {
  GestionnaireListProduitPageComponent
} from "./pages/gestionnaire/gestionnaire-list-produit-page/gestionnaire-list-produit-page.component";
import {
  GestionnaireCreateProduitPageComponent
} from "./pages/gestionnaire/gestionnaire-create-produit-page/gestionnaire-create-produit-page.component";
import {
  GestionnaireShowProduitPageComponent
} from "./pages/gestionnaire/gestionnaire-show-produit-page/gestionnaire-show-produit-page.component";
import {isLoggedInGuardGuard} from "./guards/is-logged-in-guard.guard";

export const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "change-password",
    component: ChangePasswordPageComponent,
  },
  {
    path: "reset-password",
    component: ResetPasswordPageComponent,
  },
  {
    path: "active-account",
    component: ActiveAccountPasswordPageComponent,
  },

  {
    path: "forbiden",
    component: ForbidenPageComponent,
  },
  {
    path: "not-found",
    component: NotFoundPageComponent,
  },
  {
    path: "internal-server",
    component: InternalServerPageComponent,
  },
  {
    path: "maintenance",
    component: MaintenacePageComponent,
  },

  {
    path: "admin",
    component: AdminLayoutPageComponent,
    /*canActivate:[isLoggedInGuard,isAdminMiddleware],*/
    children:[
      {
        path: "",
        component: AdminDashbordPageComponent
      }
    ]
  },
  {
    path: "gestionnaire",
    component: GestionnaireLayoutPageComponent,
    /*canActivate:[isLoggedInGuard],*/
    children:[
      {
        path: "",
        component: GestionnaireDashbordPageComponent,
        /*canActivate:[isLoggedInGuard]*/
      },
      {
        path: "list-produits",
        component: GestionnaireListProduitPageComponent,
      },
      {
        path: "create-produit",
        component: GestionnaireCreateProduitPageComponent,
        /*canActivate:[isLoggedInGuard]*/
      },
      {
        path: "show-produit/:id",
        component: GestionnaireShowProduitPageComponent,
        /*canActivate:[isLoggedInGuard]*/
      }
    ]
  },
  {
    path: "",
    component: CaissierLayoutPageComponent,
    /*canActivate:[isLoggedInGuard],*/
    children:[
        {
          path: "",
          component: CaissierDashbordPageComponent,
          /*canActivate:[isLoggedInGuard]*/
        },
      {
        path: "produits-list",
        component: CaissierProduitListPageComponent,
        /*canActivate:[isLoggedInGuard]*/
      }
      ]
  },

];
