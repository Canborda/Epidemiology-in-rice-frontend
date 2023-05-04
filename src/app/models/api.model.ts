import { SignupI } from './user.model';
import { CropI } from './crop.model';
import { MapI } from './map.model';

export interface ApiUserSuccessI {
  data: SignupI;
  message: string;
}

export interface ApiCropSuccessI {
  data: CropI[] | CropI;
  message: string;
}

export interface ApiMapSuccessI {
  data: MapI[] | MapI;
  message: string;
}

export interface ApiSuccessI<T> {
  data: T;
  message: string;
}

export interface ApiErrorI {
  error: string;
  message: string;
  details: string[];
}
