export interface Regions {
    country_codes?: string[ ];
    region_code?: number;
    kladr_region_code?:string;
    fias_region_guid?:string;
    size?:number;
    page?:number;
    lang?:string;
}
export interface DeliveryPoints {
    postal_code?: number;
    city_code?: number;
    type?:string;
    country_codes?:string;
    region_code?:number;
    have_cashless?:boolean;
    have_cash?:boolean;
    allowed_cod:boolean;
    is_dressing_room?:boolean;
    weight_max?:number;
    weight_min?:number;
    lang?:string;
    take_only?:boolean;
    is_handout?:boolean;
    is_reception?:boolean;
}
export interface Cities {
    country_codes?: string[];
    region_code?: number;
    kladr_region_code?:string;
    fias_region_guid?:string;
    kladr_code?:string;
    fias_guid?:string;
    postal_code?:string;
    code?:number;
    city?:string;
    size?:number;
    page?:number;
    lang?:string;
    payment_limit?:number;
}
export interface Location{
    code?:number;
    postal_code?:string;
    country_code?:string;
    city?:string;
    address?:string;
}
export interface Location{
    code?:number;
    postal_code?:string;
    country_code?:string;
    city?:string;
    address?:string;
}
export interface Packages{
    weight:number;
    length?:number;
    width?:number;
    height?:number;
}
export interface TariffLis {
    date?: number;
    type?: 1|2;
    currency?:number;
    lang?:string;
    from_location:Location
    to_location:Location
    packages:Packages[]
}