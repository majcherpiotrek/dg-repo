
export class RecordDetailsModel {
    public id: string;
    public name: string;
    public about: string;
    public author: string;
    //public creator: SchemaOrgPerson;
    //public dateCreated: LocalDateTime;
    //public citations: Array<CitationMetadata>;
    //public filesNames: Array<String>;
    
    public constructor() {
      this.id = '';
      this.name = '';
      this.about = '';
      this.author = '';
    }

  public toString = () : string => {
    return '{"id":"' + this.id + '", ' 
        + '"name":"' + this.name + '", ' 
        + '"about":"' + this.about + '", ' 
        + '"author":"' + this.author + '"}';
  }
}

