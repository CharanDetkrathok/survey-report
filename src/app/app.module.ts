import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialsModule } from './materials/materials.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';

// เปลี่ยนภาษา TH - EN
export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

// const googleLoginOptions = {
//   scope: 'profile email'
// }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    // เปลี่ยนภาษา TH - EN
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '65828115548-4m56tvbn46ab1askb225ee2bkmkbh13h.apps.googleusercontent.com',
              {
                scope: 'profile email',
                pluginName: 'survey-report-355004'
              }
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    CookieService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(private translate: TranslateService) {
    translate.addLangs(["en", "th"]);
    translate.setDefaultLang("th");
    translate.use("th");
  }
}
