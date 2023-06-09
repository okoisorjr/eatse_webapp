import { Injectable } from '@angular/core';
import { UserAccount } from '../auth/models/user-account.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrentUser } from '../auth/auth.service';
import { DocumentData, Firestore, collection, doc, getDoc, getDocs, getDocsFromServer } from '@angular/fire/firestore';
import { getStorage, ref } from '@firebase/storage';
import { NavigationEnd, Router } from '@angular/router';

export interface Services {
  service: string;
  description: string;
  imgPath: string;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalResourceService {
  currentUser: any;
  private currentUrl: string;
  private previousUrl!: string;
  mobileMenu: boolean = false;
  allServices: any[] = [];
  footerServices: any[] = [];
  service: any;

  constructor(private fs: Firestore, private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  setCurrentUser(user: CurrentUser) {
    this.currentUser = user;
  }

  getCurrentUser(): CurrentUser {
    return this.currentUser;
  }

  setMobileMenuState(currentState: boolean) {
    this.mobileMenu = currentState;
  }

  getMobileMenuState() {
    return this.mobileMenu;
  }

  getPreviousUrl(){
    return this.previousUrl;
  }

  async fetchServices(): Promise<Services[]> {
    this.allServices = [];
    const servicesRef = collection(this.fs, 'services');
    let services = await getDocsFromServer(servicesRef);
    services.forEach((document) => {
      this.allServices.push(document.data());
      this.footerServices = this.allServices;
    });

    return this.allServices;
  }

  async fetchFooterServices(): Promise<Services[]> {
    let servicess:any = [];
    const servicesRef = collection(this.fs, 'services');
    let services = await getDocs(servicesRef);
    services.forEach((document) => {
      servicess.push(document.data());
    });

    return servicess;
  }

  async getSingleService(serviceName: string): Promise<Services>{
    const serviceRef = doc(this.fs, `services`, serviceName);
    this.service = await getDoc(serviceRef);
    return this.service.data();
  }
}
