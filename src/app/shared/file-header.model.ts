import { PersonModel } from './person.model';
import { CitationType } from './citation-type';

export class FileHeaderModel {
    public type: CitationType;
    public name: string;
    public about: string;
    public author: string;
    public creator: PersonModel;
    // Book tags
    public isbn: string;
    public numberOfPages: string;
    public bookEdition: string;
    // Article tags
    public articleSection: string;
    // Image object tags
    public caption: string;
    // Software source code tags
    public codeRepository: string;
    public programmingLanguage: string;
    public runtimePlatform: string;
    // Music recording tags
    public byArtist: string;
    public inAlbum: string;
    public duration: string;
    // Video object tags
    public director: PersonModel;
    public actor: PersonModel;
    public videoFrameSize: string;

    public constructor() {
      this.type = CitationType.CreativeWork;
      this.name = '';
      this.about = '';
      this.author = '';
      this.creator = new PersonModel();
      this.isbn = '';
      this.numberOfPages = '';
      this.bookEdition = '';
      this.articleSection = '';
      this.caption = '';
      this.codeRepository = '';
      this.programmingLanguage = '';
      this.runtimePlatform = '';
      this.byArtist = '';
      this.inAlbum = '';
      this.duration = '';
      this.director = new PersonModel();
      this.actor = new PersonModel();
      this.videoFrameSize = '';
    }

  public toString = () : string => {
    return '{ "name":"' + this.name + '", ' +
      '"about":"' + this.about + '", ' +
      '"author":"' + this.author + '", ' +
      '"creator":' + this.creator.toString() + ', ' +
      '"isbn":"' + this.isbn + '", ' +
      '"numberOfPages":"' + this.numberOfPages + '", ' +
      '"bookEdition":"' + this.bookEdition + '", ' +
      '"articleSection":"' + this.articleSection + '", ' +
      '"caption":"' + this.caption + '", ' +
      '"codeRepository":"' + this.codeRepository + '", ' +
      '"programmingLanguage":"' + this.programmingLanguage + '", ' +
      '"runtimePlatform":"' + this.runtimePlatform + '", ' +
      '"byArtist":"' + this.byArtist + '", ' +
      '"inAlbum":"' + this.inAlbum + '", ' +
      '"duration":"' + this.duration + '", ' +
      '"director":' + this.director.toString() + ', ' +
      '"actor":' + this.actor + ', ' +
      '"videoFrameSize":"' + this.videoFrameSize + '"}';
  }
}
