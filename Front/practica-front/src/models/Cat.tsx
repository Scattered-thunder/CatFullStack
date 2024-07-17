export interface Cat {
    id: number;
    name: string;
    color: string;
    age: number;
    img: Blob | null | string;
    base64img?: string;
}