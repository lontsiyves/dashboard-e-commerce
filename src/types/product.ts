import { IRating } from "./rating";

export interface IProduct {
    id: number,
    title: String,
    price:  number,
    category: string,
    description: string,
    image: string,
    rating:IRating
}