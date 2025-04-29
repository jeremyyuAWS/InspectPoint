import { faker } from '@faker-js/faker';

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min: number, max: number, decimals = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

export function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function getRandomItems<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function generateCompanyName(industry: string): string {
  const prefixes = ['Advanced', 'Professional', 'Elite', 'Premium', 'Superior'];
  const suffixes = ['Systems', 'Solutions', 'Technologies', 'Services', 'Group'];
  return `${getRandomItem(prefixes)} ${industry} ${getRandomItem(suffixes)}`;
}

export function generateEmail(companyName: string): string {
  const domain = companyName.toLowerCase().replace(/\s+/g, '') + '.com';
  return `${faker.internet.email({ provider: domain })}`;
}

export function generatePhoneNumber(): string {
  return faker.phone.number('(###) ###-####');
}

export function generateWebsite(companyName: string): string {
  return `https://www.${companyName.toLowerCase().replace(/\s+/g, '')}.com`;
}

export function generateAddress(city: string, state: string): string {
  return `${faker.location.streetAddress()}, ${city}, ${state} ${faker.location.zipCode()}`;
}

export function generateCoordinates(): { latitude: number; longitude: number } {
  return {
    latitude: parseFloat(faker.location.latitude()),
    longitude: parseFloat(faker.location.longitude())
  };
}

export function generateICPScore(): number {
  return getRandomInt(0, 100);
}

export function generateTechStack(options: string[]): string[] {
  return getRandomItems(options, getRandomInt(2, 5));
}

export function generateRevenue(min: number, max: number): number {
  return getRandomInt(min, max);
}

export function generateEmployees(min: number, max: number): number {
  return getRandomInt(min, max);
}

export function generateAnnualGrowth(): number {
  return getRandomFloat(-10, 30);
}

export function generateDateWithinRange(start: Date, end: Date): Date {
  return faker.date.between({ from: start, to: end });
}

export function generateTimeToEvent(min: number, max: number): number {
  return getRandomInt(min, max);
}

export function generateRate(min: number, max: number): number {
  return getRandomFloat(min, max);
}

export function generatePartNumber(category: string, subCategory: string): string {
  const prefix = category.substring(0, 2).toUpperCase();
  const subPrefix = subCategory.substring(0, 2).toUpperCase();
  const number = getRandomInt(1000, 9999);
  return `${prefix}-${subPrefix}-${number}`;
}

export function generateDescription(category: string, subCategory: string): string {
  return `${category} ${subCategory} with ${faker.commerce.productAdjective()} features and ${faker.commerce.productMaterial()} construction.`;
}

export function generateSpecification(template: { type: 'string' | 'number' | 'boolean', options?: any[], range?: { min: number, max: number } }): any {
  switch (template.type) {
    case 'string':
      return getRandomItem(template.options || []);
    case 'number':
      return getRandomInt(template.range?.min || 0, template.range?.max || 100);
    case 'boolean':
      return Math.random() > 0.5;
    default:
      return null;
  }
} 