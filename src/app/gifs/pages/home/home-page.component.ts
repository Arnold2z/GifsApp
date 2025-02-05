import { Component } from '@angular/core';
import { gifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  standalone: false,

  templateUrl: './home-page.component.html',

})
export class HomePageComponent {

  constructor(private gifsService: gifsService){}

    get gifs(): Gif[] {
      return this.gifsService.gifList;
    }



}
