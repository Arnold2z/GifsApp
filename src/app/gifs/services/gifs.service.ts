import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SearchResponse, Gif } from "../interfaces/gifs.interfaces";


@Injectable({providedIn: 'root'})
export class gifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'UfgzjOB7BbX9Ou31EVg9YGFy0fOPMqmK';
  private sereviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient){

  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if( this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
  }

  searchTag(tag: string):void{
    if(tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${ this.sereviceUrl}/search`, {params})
      .subscribe(resp =>{

        this.gifList = resp.data;
      })

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=UfgzjOB7BbX9Ou31EVg9YGFy0fOPMqmK&q=valorant&limit=10')
    //   .then(resp => resp.json())
    //   .then(data =>console.log(data));

  }

}
