module Scripts.Core {
    export interface ApiClient {
        get(url: string, onSuccess: any, onFailure: any);
        post(url: string, urlParams: any, onSuccess: any, onFailure?: any);
        post(url: string, urlParams: any, onSuccess: any, onFailure?: any, onProgress?: any);
    }
}