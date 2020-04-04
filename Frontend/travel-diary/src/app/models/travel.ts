import { Photo } from './photo';
export class Travel {
    id: number;
    name: string;
    description: string;
    location: string;
    note: string;
    date_added: Date;
    user_id: string;
    images: Photo[];
}

