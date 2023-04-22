import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<boolean | User | any> =
    new BehaviorSubject(null);
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('auth change: ', event);
      console.log('auth change session: ', session);
      if (session) {
        this.currentUser.next(session.user);
      } else {
        this.currentUser.next(false);
      }
    });
  }

  createAccount({ email, password }: { email: string; password: string }) {
    return this.supabase.auth.signUp({ email, password });
  }

  login({ email, password }: { email: string; password: string }) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }
}
