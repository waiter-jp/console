/**
 * 暗号化された許可証情報インターフェース
 * @interface
 */
export interface IEncodedPassport {
    token: string;
}

/**
 * 許可証発行対象インターフェース
 * @interface
 */
export interface IPassportTarget {
    scope: string;
}

/**
 * 許可証発行単位
 * @export
 * @interface
 * @memberof factory.passport
 */
export interface IIssueUnit {
    /**
     * 許可証発行単位識別子
     * 発行単位内で整理番号付けを行う
     * クライアント+日時+スコープで一意になる想定
     * @memberof IIssueUnit
     */
    identifier: string;
    /**
     * いつから有効な発行単位か
     * unix timestampe
     * @memberof IIssueUnit
     */
    validFrom: number;
    /**
     * いつまで有効な発行単位か
     * unix timestampe
     * @memberof IIssueUnit
     */
    validThrough: number;
    /**
     * 許可証発行リクエスト数
     * @memberof IIssueUnit
     */
    numberOfRequests: number;
}
