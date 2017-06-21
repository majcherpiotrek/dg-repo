import { PersonModel } from './person.model';

export class RecordDetailsModel {
  public id: string;
  public name: string;
  public about: string;
  public author: string;
  public creator: PersonModel;
  public filesNames: Array<string>;

  public constructor() {
    this.id = '';
    this.name = '';
    this.about = '';
    this.author = '';
    this.filesNames = [''];
  }

  public toString = (): string => {
    return '{"id":"' + this.id + '", '
      + '"name":"' + this.name + '", '
      + '"about":"' + this.about + '", '
      + '"author":"' + this.author + '"}';
  }
  public getFilesNames(): Array<string> {
    /*var toReturn: Array<string>;
    
    this.filesNames.forEach(element => {
      
    });
    toReturn = ;

    return toReturn;
    */
    return this.filesNames;
  }
}

