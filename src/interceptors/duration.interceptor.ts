import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
   const dateIn=Date.now() ; 
   console.log('req created at : ' , dateIn) ;
    return next.handle().pipe(
      tap(
       () =>{
        const dateOut=Date.now() ; 
        console.log('response created at : ' , dateOut) ;
        console.log(`Request duration : ${dateOut-dateIn} ms`) 
       })
    );
  }
}
