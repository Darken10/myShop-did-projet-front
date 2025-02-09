import { HttpInterceptorFn } from '@angular/common/http';
import {Token} from "../../constantes/Token";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  let request=req;
  const token=localStorage.getItem("token");

  if (token){
    const  headers = req.headers.set("Authorization",'Bearer '+token);
    request=req.clone({
      headers: headers
    });
  }

  console.log(token)



  return next(request);
};
