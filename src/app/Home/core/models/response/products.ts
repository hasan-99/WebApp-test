export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    rating?: number;
    cartegor: string; 
    availability: boolean
}