declare module 'purest' {
  type RequestAPI = import('request').RequestAPI<any, any, any>;
  type Response = import('request').Response;

  interface CreatePursetOpts {
    request: RequestAPI;
  }

  interface CreateProviderOpts {
    provider: string;
    config?: any;
  }

  function createPurset(options: CreatePursetOpts): typeof createProvider;

  function createProvider(options: CreateProviderOpts): Purest;

  class Purest {
    query(path?: string): this;
    qs(params?: Record<string, unknown>): this;
    auth(token: any): this;
    get(payload: any): this;
    request(callback: (error: Error, res: Response, body: any) => void);
  }

  // https://github.dev/googleapis/google-api-nodejs-client/blob/5c6826a1f5219e5e8b103035f69816be7b0902e6/src/apis/oauth2/v2.ts#L276
  export interface GoogleUserInfo {
    /**
     * The user's email address.
     */
    email: string;
    /**
     * The user's last name.
     */
    family_name?: string | null;
    /**
     * The user's gender.
     */
    gender?: string | null;
    /**
     * The user's first name.
     */
    given_name?: string | null;
    /**
     * The hosted domain e.g. example.com if the user is Google apps user.
     */
    hd?: string | null;
    /**
     * The obfuscated ID of the user.
     */
    id?: string | null;
    /**
     * URL of the profile page.
     */
    link?: string | null;
    /**
     * The user's preferred locale.
     */
    locale?: string | null;
    /**
     * The user's full name.
     */
    name?: string | null;
    /**
     * URL of the user's picture image.
     */
    picture?: string | null;
    /**
     * Boolean flag which is true if the email address is verified. Always verified because we only return the user's primary email address.
     */
    verified_email?: boolean | null;
  }

  export namespace Facebook {
    export interface PictureData {
      width: number;
      height: number;
      is_silhouette: boolean;
      url: string;
    }

    export interface Me {
      id: string;
      name: string;
      email?: string;
      picture?: { data: PictureData };
    }
  }

  export default createPurset;
}

declare module '@purest/providers';
