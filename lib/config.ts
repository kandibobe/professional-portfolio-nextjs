export const siteConfig = {
  name: '[YOUR NAME] PHOTOGRAPHY',
  description:
    'Professional photographer specializing in weddings, portraits, and editorial photography.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com',
  ogImage: '/og-image.jpg',
  links: {
    instagram: 'https://instagram.com/your_profile',
    telegram: 'https://t.me/your_profile',
    vk: 'https://vk.com/your_profile',
  },
  contact: {
    email: 'contact@your-domain.com',
    phone: '+00 000 000 0000',
    address: {
      street: 'Your Street, 123',
      city: 'Your City',
      region: 'State',
      zip: '00000',
      country: 'IT',
    },
    piva: 'IT00000000000',
    cf: 'IT00000000000',
    rea: 'XX-0000000',
  },
};
