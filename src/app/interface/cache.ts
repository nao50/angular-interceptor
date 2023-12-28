import { HttpResponse } from '@angular/common/http';

export interface RequestCacheEntry {
  urlWithParams: string;
  response: HttpResponse<any>;
  lastRead: number;  
}