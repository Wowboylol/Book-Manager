export class User
{
    private _token: string;
    private _tokenExpirationDate: Date;
    public id: string;
    public email: string;

    constructor(id: string, email: string, token: string, tokenExpirationDate: Date) 
    { 
        this._token = token;
        this._tokenExpirationDate = tokenExpirationDate;
        this.id = id;
        this.email = email;
    }

    public get token(): string 
    { 
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) return null;
        return this._token; 
    }
}