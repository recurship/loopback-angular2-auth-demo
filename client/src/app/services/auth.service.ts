import { Injectable } from '@angular/core';
import { SDKToken } from '../sdk';
import { LoopBackAuth } from '../sdk';

declare var Object: any;
@Injectable()
export class AuthService extends LoopBackAuth {
    private sessiontoken: SDKToken = new SDKToken();
    private remembeMe : boolean = true;
    constructor() {
        super();
        this.loadFromSession();
    }

    clear(): void{
        super.clear();
        this.clearFromSession();
    }

    saveToSession(): void {
        this.remembeMe = false;
        this.persist('id', super.getAccessTokenId());
        this.persist('userId', super.getCurrentUserId);
        this.persist('user', super.getCurrentUserData());
    }

    loadFromSession(): void{
        this.sessiontoken.id = sessionStorage.getItem('id');
        this.sessiontoken.userId = sessionStorage.getItem('userId');
        this.sessiontoken.user = sessionStorage.getItem('user');
        if(this.sessiontoken.id && this.sessiontoken.user && this.sessiontoken.userId){
            super.setUser(this.sessiontoken);
        }
    }

    clearFromSession(): void{
        Object.keys(this.sessiontoken).forEach(prop => sessionStorage.removeItem(prop));
        this.sessiontoken = new SDKToken();
    }

    persist(prop: string, value: any): void {
        if(this.remembeMe) {
            super.persist(prop, value);
        } else {
            sessionStorage.setItem(prop, JSON.stringify(value));
        }
    }
}