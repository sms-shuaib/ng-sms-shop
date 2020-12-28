import { NumberValueAccessor } from '@angular/forms';

export class ProductVO{

    id: number;
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    quantityId: number;

    constructor(){}
     
        getId(): number {
            return this.id
        }
        setId(id:number){
            this.id= id;
        }
        getTitle(): string{
            return this.title;
        }
        setTitle(title: string) {
            this.title = title
        }
        getPrice(): number {
            return this.price;
        }
        setPrice(price:number) {
            this.price = price;
        }
        getCategory(): string {
            return this.category
        }
        setCategory(category:string) {
            this.category= category;
        }
        getImageUrl(): string {
            return this.imageUrl;
        }
        setImageUrl(imageUrl: string){
            this.imageUrl=imageUrl;
        }
        getQuantityId(): number {
            return this.quantityId;
        }
        setQuantityId(quantityId: number) {
            this.quantityId = quantityId;
        }
}
