import { compileNgModuleFromRender2 } from '@angular/compiler/src/render3/r3_module_compiler';
import { RouterModule, Routes } from '@angular/router';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormularioComponent } from './components/clientes/formulario.component';
import { LoginComponent } from './components/usuarios/login.component';
import { AuthGuard } from './components/usuarios/guards/auth.guard';
import { RoleGuard } from './components/usuarios/guards/role.guard';
import { DetalleFacturaComponent } from './components/facturas/detalle-factura.component';
import { FacturasComponent } from './components/facturas/facturas.component';


const APP_ROUTES: Routes = [
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormularioComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'clientes/form/:id', component: FormularioComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
  {path: 'facturas/:id', component: DetalleFacturaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  {path: 'facturas/form/:clienteId', component: FacturasComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: '**', pathMatch: 'full', redirectTo: 'clientes'}
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
