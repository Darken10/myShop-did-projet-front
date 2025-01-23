import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  /*const token=localStorage.getItem("token");
  let request=req;
  if (token){
    const  headers = req.headers.set("Authorization",'Bearer '+token);
    request=req.clone({
      headers: headers
    });
  }
  return next(request);*/
  return next(req);
};
