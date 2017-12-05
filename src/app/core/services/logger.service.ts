import { Injectable } from '@angular/core';

//Observable for ajax request.
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
//This is for handle httpclients errors
import { catchError, tap} from 'rxjs/operators';

import { Message } from "../models/message";

@Injectable()
export class LoggerService {

  messages: Message[] = [];
  
  add(message: string | Message, type?: string): void{
    if(message instanceof Message){
      this.messages.push(message);
      return;
    }
    if(message == ''){
      return;
    }

    let obj = new Message();
    
    obj.title = '';
    obj.body = message;
    obj.type = type;

    this.messages.push(obj);
  }

  remove(index: number): void{
    this.messages.slice(index, 1);
  }
  
  clear(): void{
    this.messages = [];
  }
  
  length(): number{
    return this.messages.length;
  }

  constructor() { }

  handleRequest<T>(req: Observable<T>, message?: string, result?: T){
    return req.pipe(
        tap(_ => this.add(message, 'trace')),
        catchError(this.handleError<T>(message, result))
    );
  }

  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = '', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        // We can here had a service to save in DB the errors
        this.add(`${operation} failed: ${error.message}`, 'fail');

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
