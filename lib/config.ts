export const siteConfig = {
  name: "VLAD PHOTOGRAPHY",
  description: "Professional photographer specializing in weddings, portraits, and editorial photography.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://vlad-photography.com",
  ogImage: "/og-image.jpg",
  links: {
    instagram: "https://instagram.com/vlad_photography",
    telegram: "https://t.me/vlad_photography",
    vk: "https://vk.com/vlad_photography",
  },
  contact: {
    email: "contact@vlad-photography.com",
    phone: "+1234567890",
    address: {
      street: "123 Photographer St",
      city: "Milan",
      region: "MI",
      zip: "20100",
      country: "IT",
    },
  },
}
