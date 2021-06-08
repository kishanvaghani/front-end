import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot({
      maxOpened:1,
      autoDismiss:true
    }),
  ]
})
export class HomeModule {
  constructor(){console.log("home Loaded");
  }
 }
