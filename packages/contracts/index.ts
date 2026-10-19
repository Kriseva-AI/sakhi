export type Locale = 'en-IN'|'hi-IN'|'bn-IN'|'mr-IN'|'te-IN'|'ta-IN'|'gu-IN'|'kn-IN'|'ml-IN'|'or-IN'|'pa-IN'|'as-IN'|'ur-IN'|'ne-IN'|'kok-IN'|'ks-Arab-IN';
export type Category = 'cyber'|'home'|'workplace'|'legal'|'friend'|'unsure';
export type Page = 'home'|'finder'|'resources'|'trust'|'maintenance'|'components';
export interface Resource {
  id: string; title: string; summary: string; url: string; source_url: string; authority: string;
  phone: string|null; categories: string[]; jurisdiction: string; eligibility: string;
  checked_at: string; expires_at: string; verification_method: string; review_status: string;
  access_type: string; service_cost: string; permission: string; limitations: string;
  status: 'verified_public_link';
}
export interface Result {
  state: 'urgent_redirect'|'minor_redirect'|'present_options'; category: string; abstained: boolean;
  resources: Resource[]; engine: string; warnings: string[]; language_status: 'review_pending';
  content_locale: string; external_actions: false;
}
export interface Pack { version: string; review_level: string; human_approved: boolean; resources: Resource[] }
