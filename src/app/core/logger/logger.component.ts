import { Component, OnInit } from '@angular/core';

import { LoggerService } from "../services/logger.service";

@Component({
  selector: 'core-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {

  constructor(
    public loggerSrc: LoggerService
  ) { }

  ngOnInit() { }

  remove(index: number): void {
    console.log(this.loggerSrc.messages)
    this.loggerSrc.remove(index);
    console.log(this.loggerSrc.messages)
  }

}
