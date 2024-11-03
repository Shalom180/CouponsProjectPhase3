import { Coupon } from "./Coupon";

export class Company {
    id: number;
    name: string;
    email: string;
    password: string;
    coupons: Set<Coupon>;

    constructor(id:number, name:string, email:string, password:string, coupons:Set<Coupon>) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
    }
}