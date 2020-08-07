import {Component, OnInit} from '@angular/core';
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
    this.images = this.getPicturesService.getImageUrls('');
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) => this.images = this.getPicturesService.getImageUrls(query))
    ).subscribe();
  }
}
