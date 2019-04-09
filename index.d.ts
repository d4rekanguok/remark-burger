export interface RemarkBurgerOptions {
  beginMarker?: string;
  endMarker?: string;
  onlyRunWithMarker?: boolean;
}

export default function plugin(options: RemarkBurgerOptions): void