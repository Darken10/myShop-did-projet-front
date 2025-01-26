import { HttpInterceptorFn } from '@angular/common/http';
import {Token} from "../../constantes/Token";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  let request=req;
  let token: String|null = null
  if (typeof localStorage!== "undefined"){
  token=localStorage.getItem("token");
  console.log('Localstorage')

  } else {
    token = Token.TOKEN
  }

  if (token){
    const  headers = req.headers.set("Authorization",'Bearer '+token);
    request=req.clone({
      headers: headers
    });
  }

  console.log(token)



  return next(request);
};
