import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './app/graphql/graphql.module';

// Si usas enrutamiento, vendría aquí con provideRouter(...)

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, GraphQLModule)
  ]
})