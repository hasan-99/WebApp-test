import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login(username: string, password: string): boolean {
    return username === 'admin@admin.com' && password === '123456';
  }

}