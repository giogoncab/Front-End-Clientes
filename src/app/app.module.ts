import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Componentes (Controlador)
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormularioComponent } from './components/clientes/formulario.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Servicios (Modelo)
import { ClienteService } from './components/clientes/cliente.service';

//Rutas*/
import { APP_ROUTING } from './app.route';


/*Angular Material*/
import { MaterialModule } from './material.module';
import { PerfilComponent } from './components/clientes/perfil/perfil.component';
import { LoginComponent } from './components/usuarios/login.component';
import { TokenInterceptor } from './components/usuarios/interceptors/token.interceptor';
import { DetalleFacturaComponent } from './components/facturas/detalle-factura.component';
import { FacturasComponent } from './components/facturas/facturas.component';

//Fechas
registerLocaleData(localeES, 'es');


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormularioComponent,
    PaginatorComponent,
    PerfilComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [ClienteService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
