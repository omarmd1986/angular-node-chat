import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHandlerService } from './services/jwt-handler.service';
import { LoggerService } from './services/logger.service';
import { NavigateService } from './services/navigate.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [JwtHandlerService, LoggerService, NavigateService]
})
export class CoreModule { }
