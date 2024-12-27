import { Coupon } from "./Coupon";

export class Customer{
   id: number;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   coupons: Set<Coupon>;
   
   constructor(id:number, firstName:string, lastName:string, email:string, password:string, coupons:Set<Coupon>) {
    this.id = id;                                                                                                                                                                                                                
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.coupons = coupons;
}

}