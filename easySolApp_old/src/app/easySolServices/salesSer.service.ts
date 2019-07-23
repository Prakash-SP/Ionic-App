import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class salesSerservice {
    apiUrl = "https://103.205.66.67/AppService/V1OnlineSyncService.svc"

    constructor(
      private _httpClient: HttpClient
    ) { }
  
    setSupplier(userId ,password){
      return this._httpClient.post(this.apiUrl + '/userlogin',{"UserId":userId,"Password":password});
    }
  
    // getCustomer(){
    // //   return this._httpClient.get(this.customerUrl)
    // }
  }