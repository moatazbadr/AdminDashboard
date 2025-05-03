import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  // Exclude login URL from interceptor
  if (req.url.includes('/api/Accounts/Login')) {
    return next(req); // Don't modify the request
  }

  const token = localStorage.getItem('token');

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedRequest);
};
