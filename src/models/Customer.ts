import { Coupon } from "./Coupon";

export class Customer{
   id: number;
   firstName: string;
   lastName: string;
   password: string;
   email: string;
   coupons: Set<Coupon>;
   
   constructor(id:number, firstName:string, lastName:string, password:string, email:string, coupons:Set<Coupon>) {
    this.id = id;                                                                                                                                                                                                                
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.coupons = coupons;
}

}