import { Component, OnInit, Input } from '@angular/core';

import { LoggerService } from "../services/logger.service";

@Component({
  selector: 'core-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {

  @Input() show: string = '';

  constructor(
    public loggerSrc: LoggerService
  ) { }

  ngOnInit() { }
}
