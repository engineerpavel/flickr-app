export interface ImageModel {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrOutput {
  photos: {
    photo: ImageModel[]
  };
}

export interface UrlObject {
  url: string;
  title: string;
}
