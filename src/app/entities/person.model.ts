export class PersonModel {
    public givenName: string;
    public additionalName: string;
    public familyName: string;

    public constructor() {
      this.givenName = '';
      this.additionalName = '';
      this.familyName = '';
    }

    public toString = () : string => {
      return '{"givenName":"' + this.givenName + '", ' +
          '"additionalName":"' + this.additionalName + '", ' +
        '"familyName":"' + this.familyName + '"}';
    }
}
