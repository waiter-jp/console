import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { IEncodedPassport, IPassportTarget, IIssueUnit } from './passport';
import { environment } from '../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class PassportsService {
    constructor(
        private http: HttpClient,
    ) {
    }

    /**
     * 許可証を発行する
     * @param target 発行対象
     */
    issue(target: IPassportTarget): Observable<IEncodedPassport> {
        return this.http.post(`${environment.endpoint}/passports`, target, httpOptions)
            .map((passport: IEncodedPassport) => passport)
            .catch(this.handleError);
    }

    /**
     * 現在の許可証発行単位を取得する
     * @param target 発行対象
     */
    getCurrentIssueUnit(target: IPassportTarget): Observable<IIssueUnit> {
        return this.http.get(`${environment.endpoint}/passports/${target.scope}/currentIssueUnit`, httpOptions)
            .map((unit: IIssueUnit) => unit)
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
