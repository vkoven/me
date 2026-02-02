import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';

const { SITE_URL } = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

export default defineConfig({
  output: 'static',
  adapter: vercel(),

  integrations: [
    mdx(),
    sitemap(),
    react(),
    markdoc(),
    keystatic(),
  ],

  site: SITE_URL || 'https://airdrop.uno',

  env: {
    schema: {
      // Site configuration
      SITE_URL: envField.string({ context: 'client', access: 'public', default: 'https://airdrop.uno' }),
      SITE_LANGUAGE: envField.string({ context: 'client', access: 'public', default: 'en' }),
      SITE_TITLE: envField.string({ context: 'client', access: 'public', default: 'Professional Portfolio' }),
      SITE_DESCRIPTION: envField.string({ context: 'client', access: 'public', default: 'Engineering leader specializing in system architecture, technical decision-making, and delivering measurable business impact.' }),
      
      // Author information
      SITE_AUTHOR_NAME: envField.string({ context: 'client', access: 'public', default: 'vkoven' }),
      SITE_AUTHOR_TITLE: envField.string({ context: 'client', access: 'public', default: 'Senior Software Engineer' }),
      SITE_AUTHOR_BIO: envField.string({ context: 'client', access: 'public', default: 'Engineering leader focused on solving complex technical challenges through thoughtful architecture and pragmatic trade-off analysis.' }),
      SITE_AUTHOR_EMAIL: envField.string({ context: 'client', access: 'public', default: 'coin9520@gmail.com' }),
      SITE_AUTHOR_LOCATION: envField.string({ context: 'client', access: 'public', default: '' }),
      
      // Social media links (empty string = hidden)
      SOCIAL_GITHUB: envField.string({ context: 'client', access: 'public', default: '' }),
      SOCIAL_LINKEDIN: envField.string({ context: 'client', access: 'public', default: '' }),
      SOCIAL_TWITTER: envField.string({ context: 'client', access: 'public', default: '' }),
      SOCIAL_MASTODON: envField.string({ context: 'client', access: 'public', default: '' }),
      SOCIAL_BLUESKY: envField.string({ context: 'client', access: 'public', default: '' }),
    },
  },


  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Limit concurrent image processing to avoid memory issues
        limitInputPixels: 268402689, // ~16K x 16K pixels
      }
    },
    remotePatterns: [],
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
});