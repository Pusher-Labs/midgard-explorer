import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ExplorerUiComponent } from './explorer-ui/explorer-ui.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QueryInputComponent } from './query-input/query-input.component';
import { ResponseLinksComponent } from './response-links/response-links.component';

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    HeaderComponent,
    FooterComponent,
    ExplorerUiComponent,
    QueryInputComponent,
    ResponseLinksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
