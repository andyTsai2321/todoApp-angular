import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StorageApiService } from './storage-api.service';
import { TodoApiService } from './todo-api.service';

import { TodoStatusFilterPipe } from './todo-status-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoStatusFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TodoApiService,StorageApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
