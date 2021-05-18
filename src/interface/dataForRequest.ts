export interface Regions {
    country_codes?: string[];
    region_code?: number;
    kladr_region_code?:string;
    fias_region_guid?:string;
    size?:number;
    page?:number;
    lang?:string;
}
export interface Cities extends Regions{
    kladr_code?:string;
    fias_guid?:string;
    postal_code?:string;
    code?:number;
    city?:string;
    payment_limit?:number;
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

export interface Location{
    code?:number;
    fias_guid?:string;
    postal_code?:string;
    longitude?:number;
    latitude?:number;
    country_code?:string;
    region?:string;
    region_code?:number;
    sub_region?:string;
    city?:string;
    kladr_code?:string;
    address?:string;
}
export interface Item{
    name:string;
    ware_key:string;
    marking?:string;
    payment:Money;
    cost:number;
    weight:number;
    weight_gross?:number;
    amount:number;
    name_i18n?:string;
    brand?:string;
    country_code?:string;
    material?:number;
    wifi_gsm?:boolean;
    url?:string;
}
export interface Package{
    number:string;
    weight:number;
    length?:number;
    width?:number;
    height?:number;
    comment?:string;
    items:Item[];
}
export interface Service{
    code:string;
    parameter?:number;
}
export interface TariffList {
    date?: number;
    type?: 1|2;
    currency?:number;
    lang?:string;
    from_location:Location
    to_location:Location
    packages:Package[]
}
export interface Tariff {
    date?: number;
    type?: 1|2;
    currency?:number;
    tariff_code:number;
    from_location:Location;
    to_location:Location;
    services:Service[];
    packages:Package[];
}
export interface Ddp {
    weight: number;
    cost: number;
}
export interface Money{
    value:number;
    vat_sum?:number;
    vat_rate?:number;
}
export interface Threshold{
    threshold:number;
    sum:number;
    vat_sum?:number;
    vat_rate?:number;
}
export interface Phone{
    number?:string;
    additional?:string;
}
export interface Contact{
    company?:string;
    name?:string;
    passport_series?:string;
    passport_number?:string;
    passport_date_of_issue?:string;
    passport_organization?:string;
    tin?:string;
    email?:string;
    phones?:Phone[]
}
export interface Seller{
    name?:string;
    inn:string;
    phone?:string;
    ownership_form?:number;
    address?:string;
}
export interface Order {
    type?: 1|2;
    number?:string;
    uuid?:string;
    tariff_code:number;
    comment?:string;
    developer_key?:string;
    shipment_point?:string;//условие
    delivery_point?:string;//условие
    date_invoice?:string;
    shipper_name?:string;
    shipper_address?:string;
    delivery_recipient_cost?:Money;
    delivery_recipient_cost_adv?:Threshold[];
    sender?:Contact;
    seller?:Seller;
    recipient:Contact;
    from_location:Location;
    to_location:Location;
    services:Service[];
    packages:Package[];
    print:string;
}
export interface EditOrder extends Order{
    cdek_number?:string;
}
