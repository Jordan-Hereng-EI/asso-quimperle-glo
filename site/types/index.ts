export type BrandTone = "green" | "yellow" | "red" | "ink" | "sand" | "sage";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface FooterColumnItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  items: FooterColumnItem[];
}

export interface Mission {
  image: string;
  imageAlt: string;
  tag: string;
  tagTone: BrandTone;
  accent: string;
  title: string;
  description: string;
  articleSource: string;
  href: string;
}

export type AlbumCategory = "benin" | "bretagne";

export interface AlbumPhoto {
  file: string;
  title: string;
  description: string;
  category: AlbumCategory;
  /** Intrinsic pixel dimensions, required by next/image for non-fill usage. */
  width: number;
  height: number;
}

export interface BureauMember {
  name: string;
  role: string;
  tone: Extract<BrandTone, "green" | "yellow" | "red">;
}
