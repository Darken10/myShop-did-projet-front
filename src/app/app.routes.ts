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

export const routes: Routes = [
  {
    path:"login",
    component: LoginPageComponent
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
        }
      ]
  },

];
