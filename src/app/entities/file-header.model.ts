import {PersonModel} from './person.model';

export class FileHeaderModel {
    public name: string;
    public about: string;
    public author: string;
    public creator: PersonModel;
}
