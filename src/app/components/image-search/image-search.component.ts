import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {UrlObject} from '../../models/image.model';
import {GetPicturesService} from '../../services/get-pictures.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.less']
})
export class ImageSearchComponent implements OnInit {
  public searchControl = new FormControl('');
  public images: UrlObject[];
  constructor(private getPicturesService: GetPicturesService) { }

  public ngOnInit(): void {

  }

  public search(event: any): void {
    const keyword = event.target.value.toLowerCase();
    if (keyword && keyword.length > 0) {
      this.getPicturesService.getImageUrls(keyword).subscribe()
    }
    return null;
  }

}
