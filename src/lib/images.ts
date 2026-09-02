// Vendor image mapping — real Pexels photos for each vendor
export const VENDOR_IMAGES: Record<string, string> = {
  'Mama Njoh\'s Achu Spot': 'https://images.pexels.com/photos/12924182/pexels-photo-12924182.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Bamenda Kitchen Kati-Kati': 'https://images.pexels.com/photos/14716239/pexels-photo-14716239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Auntie Grace Yellow Soup': 'https://images.pexels.com/photos/36874369/pexels-photo-36874369.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Douala Achu Express': 'https://images.pexels.com/photos/18015967/pexels-photo-18015967.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Njangi Catering Cooks': 'https://images.pexels.com/photos/34772937/pexels-photo-34772937.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Kati-Kati Corner': 'https://images.pexels.com/photos/30268596/pexels-photo-30268596.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Grassfield Delicacy Hub': 'https://images.pexels.com/photos/34772940/pexels-photo-34772940.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const HERO_IMAGE = 'https://images.pexels.com/photos/12924182/pexels-photo-12924182.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export function getVendorImage(name: string): string {
  return VENDOR_IMAGES[name] || HERO_IMAGE;
}
