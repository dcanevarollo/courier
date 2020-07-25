import slug from 'slugify';

export default function slugify(str: string) {
  const strSlug = slug(str, { replacement: '', lower: true, strict: true });

  return strSlug;
}
