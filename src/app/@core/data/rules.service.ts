import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { IRule } from './rule';
import { environment } from '../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class RulesService {
    constructor(
        private http: HttpClient,
    ) {
    }

    getAll(): Observable<IRule[]> {
        return this.http.get(`${environment.endpoint}/rules`, httpOptions)
            .map((clients: IRule[]) => clients)
            .catch(this.handleError);
    }

    /**
     * Handle Http operation that failed.
     */
    private handleError(error: any) {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        return Observable.throw(error);
    }
}
