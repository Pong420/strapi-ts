// eslint-disable-next-line
import * as strapi from 'strapi';

declare namespace Grant {
  interface Providers {
    email: Email;
    discord: Auth0;
    facebook: Auth0;
    google: Auth0;
    github: Auth0;
    microsoft: Auth0;
    twitter: Auth0;
    instagram: Auth0;
    vk: Auth0;
    twitch: Auth0;
    linkedin: Auth0;
    cognito: Auth0;
    reddit: Auth0;
    auth0: Auth0;
    cas: Auth0;
  }

  interface Auth0 {
    enabled: boolean;
    icon: string;
    key: string;
    secret: string;
    subdomain?: string;
    callback: string;
    scope?: string[];
    redirectUri: string;
    state?: boolean;
  }

  interface Email {
    enabled: boolean;
    icon: string;
  }
}

declare module 'strapi' {
  // https://github.com/strapi/strapi/blob/HEAD/packages/strapi/lib/services/core-store.js
  interface StorePayload {
    environment: string;
    type: string;
    name: string;
    key?: string;
  }

  interface PluginStore<T> {
    get(payload?: { key: string }): Promise<T>;
    set(payload: { key: string; value: T }): Promise<void>;
    delete(payload: { key: string }): Promise<void>;
  }

  interface PluginStoreWithKey<T> {
    get(): Promise<T>;
    set(payload: { value: T }): Promise<void>;
    delete(): Promise<void>;
  }

  interface Strapi {
    store(
      payload: StorePayload & { key: 'grant' }
    ): PluginStoreWithKey<Grant.Providers>;
    store<T>(payload: StorePayload): PluginStore<T>;
    store<T>(payload: StorePayload & { key: string }): PluginStoreWithKey<T>;
  }
}
