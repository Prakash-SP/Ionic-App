import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "https://103.205.66.67/AppService/V1OnlineSyncService.svc"
  
  constructor(
    private _http: HttpClient
  ) { }

  setSupplier(userId ,password){
    return this._http.post(this.apiUrl + '/userlogin',{"UserId":userId,"Password":password});
  }
  loginSalesMan(lSupName,userID,pass){
    return this._http.post(this.apiUrl + '/smanlogin',{"lSuppName":lSupName, "UserId":userID,"Password":pass})
  }
}
