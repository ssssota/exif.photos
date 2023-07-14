import { npm_package_description, npm_package_name } from '$env/static/private';
import type { ManifestOptions } from 'vite-plugin-pwa';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	return new Response(
		JSON.stringify({
			name: npm_package_name,
			short_name: npm_package_name,
			description: npm_package_description,
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#ffffff',
			start_url: '/?standalone=true',
			icons: [
				{ src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
				{ src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
				{
					src: '/maskable-icon-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any maskable'
				}
			]
		} satisfies Partial<ManifestOptions>),
		{
			headers: { 'content-type': 'application/manifest+json' }
		}
	);
};
