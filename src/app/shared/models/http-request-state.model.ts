import { HttpErrorResponse } from "@angular/common/http";

export interface HttpRequestState<T> {
    value: T;
    loading: boolean;
    error?: HttpErrorResponse;
}