import { HttpContextToken, HttpEvent, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { RequestCacheEntry } from '../interface/cache';
import { Observable, of, tap } from 'rxjs';

const cache = new Map<string, RequestCacheEntry>(); // キャッシュの構造
// const maxAge = 30000; // キャッシュ時間（ms）
const maxAge = 5000; // キャッシュ時間（ms）

export const CACHING_ENABLED = new HttpContextToken<boolean>(() => true); // キャッシュのON/OFFスイッチ

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(CACHING_ENABLED)) {
    const cached = cache.get(req.url); // アクセス先URLをKeyにキャッシュを検索
    console.log('cached:::', cached);
    if (cached !== undefined) {
      const isExpired = cached.lastRead < (Date.now() - maxAge); // キャッシュ時間満了を確認
      if (!isExpired) {
        return of(cached.response); // キャッシュ時間ないであればキャッシュされた内容を返却
      }
    }

    // レスポンスデータを取得しキャッシュに格納
    return next(req).pipe( 
      tap((event) => {
        if (req.method === 'GET' && event instanceof HttpResponse) {
          cache.set(req.url, {urlWithParams: req.urlWithParams, response: event, lastRead: Date.now() })
        }
      })
    );
  } else {
    return next(req);
  }
};