import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {UrlObject} from '../../models/image.model';
import {GetPicturesService} from '../../services/get-pictures.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';

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
    this.images = this.searchControl.valueChanges.pipe(
      filter((value) => value && value.length),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) => this.getPicturesService.getImageUrls(query))
    );
  }

  public search(event: any): void {
    const keyword = event.target.value.toLowerCase();
    if (keyword && keyword.length > 0) {
      this.images = this.getPicturesService.getImageUrls(keyword);
    }
    return null;
  }

}
