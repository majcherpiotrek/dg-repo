import {PersonModel} from './person.model';

export class FileHeaderModel {
    public name: string;
    public about: string;
    public author: string;
    public creator: PersonModel;

    public constructor() {
      this.name = '';
      this.about = '';
      this.author = '';
      this.creator = new PersonModel();
    }

  public toString = () : string => {
    return '{ "name":"' + this.name + '", ' +
      '"about":"' + this.about + '", ' +
      '"author":"' + this.author + '", ' +
      '"creator":' + this.creator.toString() + '}';
  }
}
