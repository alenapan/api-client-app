export enum HttpMethod {
    Get = "Get",
    Post = "Post",
    Put = "Put",
    Delete = "Delete",
}

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
}

export class ApiService {
    
    private readonly baseUrl: string;
    private readonly token: string;
    
    constructor() {
        this.baseUrl = "https://api.pagerduty.com";
        this.token = "INSERT_TOKEN_HERE";
    }

    get(path: string) {
        return this.makeRequest(path, HttpMethod.Get);
    }

    post(path: string, data: any) {
        return this.makeRequest(path, HttpMethod.Post, data);
    }

    put(path: string, data: any) {
        return this.makeRequest(path, HttpMethod.Put, data);
    }

    delete(path: string) {
        return this.makeRequest(path, HttpMethod.Delete);
    }

    private makeRequest(path: string, method: HttpMethod, data: any = null): Promise<Response> {
        
        const headers: HeadersInit = new Headers({
            "Authorization": `Token token=${this.token}`
        });
      
        const body = data ? JSON.stringify(data) : null;
    
        const options: RequestInit = {
            method,
            headers,
            body: body as BodyInit,
        };
          
        return fetch(`${this.baseUrl}/${path}`, options).then((response) => {
            return response ? response.json() : new Promise(() => null);
        });
    }
}