import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '@/components/footer';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Footer: {
    rights: 'All rights reserved',
    description:
      'Capture your unique moments through the lens of professional photography. Available for services worldwide.',
    navigation: 'Navigation',
    connect: 'Social',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
  Header: {
    portfolio: 'Portfolio',
    about: 'About Me',
    services: 'Services',
    clients: 'Clients',
    contacts: 'Contacts',
  },
};

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  decorators: [
    (Story: any) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
