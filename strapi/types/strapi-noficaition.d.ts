// https://docs-v3.strapi.io/developer-docs/latest/development/local-plugins-customization.html#front-end-development

// eslint-disable-next-line
import * as strapi from 'strapi';

declare module 'strapi' {
  interface Strapi {
    notification: StrapiNofication;
  }

  export interface StrapiNofication {
    toggle(config: StrapiNoficationConfig): void;
    error(message: string): void;
    info(message: string): void;
    success(message: string): void;
    warning(message: string): void;
  }

  type Message = string | { id: string; defaultMessage?: string };

  export interface StrapiNoficationConfig {
    type: 'success' | 'warning' | 'info' | 'error';
    title: Message;
    message: Message;
    link?: { url: string; label: Message; target?: '_blank' | '_self' };
    timeout?: number;
    blockTransition?: boolean;
    uid?: string;
  }
}
