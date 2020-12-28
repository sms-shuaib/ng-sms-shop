export class PurchasedProductInfo {
    id: number;

    shipId: number;

    productId: number;

    quantityId: number;

    userName: string;

    placedDate: Date;

    title: string;

    price: number;

    constructor(id: number, shipId: number, productId: number, quantityId: number, userName: string, placedDate: Date, title: string, price: number) {
        this.id = id;
        this.shipId= shipId;
        this.productId= productId;
        this.quantityId = quantityId;
        this.userName = userName;
        this.placedDate = placedDate;
        this.title = title
        this.price = price;
    
    }


    getId(){
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }

    getShipId() {
        return this.shipId;
    }
    setShipId(shipId: number) {
        this.shipId = shipId;
    }

    getProductId(){
        return this.productId;
    }

    setProductId(productId: number) {
        this.productId = productId;
    }

     getQuantityId() {
         return this.quantityId;
     }   
    setQuantityId(qunaId: number) {
        this.quantityId = qunaId;
    }

    getTitle() {
        return this.title;
    }
    setTitle(title: string) {
        this.title = title;
    }

    getUserName() {
        return this.userName;
    }

    setUserName(username: string) {
        this.userName = username;
    }

    getPlacedDate() {
        return this.placedDate;
    }

    setPlacedDate(date:Date) {
        this.placedDate = date;
    }

    getPrice(price:  number) {
        return  this.price;
    }
    setPrice(price: number) {
        this.price = price;
    }

}