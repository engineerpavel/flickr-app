import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {UrlObject} from '../../models/image.model';
import {GetPicturesService} from '../../services/get-pictures.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.less']
})
export class ImageSearchComponent implements OnInit {
  public searchControl = new FormControl('');
  public images: Observable<UrlObject[]>;
  constructor(private getPicturesService: GetPicturesService) { }

  public ngOnInit(): void {

  }

  public search(event: any): void {
    console.log('клик');
    const keyword = event.target.value.toLowerCase();
    if (keyword && keyword.length > 0) {
      this.images = this.getPicturesService.getImageUrls(keyword);
    }
    return null;
  }

}
