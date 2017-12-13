import { Injectable } from '@angular/core';

//Observable for ajax request.
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
//This is for handle httpclients errors
import { delay, finalize, catchError, tap} from 'rxjs/operators';

import { Message } from "../models/message";
import { LoaderService } from "./loader.service";

@Injectable()
export class LoggerService {

  messages: Message[] = [];

  constructor(
    private loader: LoaderService
  ) { }
  
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

  lastError(): Message|null{
    let reverse = this.messages.reverse();
    let result = null;
    reverse.forEach( (obj: Message) => {
      if(obj.type == 'danger'){
        result = obj;
        return;
      }
    });
    return result;
  }

  remove(index: number): void{
    this.messages.splice(index, 1);
  }
  
  clear(): void{
    this.messages = [];
  }
  
  length(): number{
    return this.messages.length;
  }

  handleRequest<T>(req: Observable<T>, message?: string, result?: T){
    this.loader.show()
    return req.pipe(
        tap(_ => this.add(message, 'info')),
        // delay(2000),
        catchError(this.handleError<T>(message, result)),
        finalize(() => {this.loader.stop()})
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
        this.add(`${operation} failed: ${error.error && error.error.message ? error.error.message : error.message}`, 'danger');

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
