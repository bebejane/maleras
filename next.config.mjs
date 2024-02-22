import { paths } from "./i18n.mjs";

const i18Rewrites = () => {
	const rewrites = [];

	Object.keys(paths).forEach((k) =>
		rewrites.push({
			source: `/${paths[k].sv}`,
			destination: `/sv/${paths[k].en}`,
			locale: false,
		})
	);

	return rewrites;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		includePaths: ["./components", "./pages"],
		prependData: `
    	@use "sass:math";
    	@import "./styles/mediaqueries"; 
    	@import "./styles/fonts";
  	`,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	devIndicators: {
		buildActivity: false,
	},
	logging: {
		fetches: {
			fullUrl: false,
		},
	},
	async rewrites() {
		return i18Rewrites();
	},
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{ key: "Access-Control-Allow-Methods", value: "POST,OPTIONS" },
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
					},
				],
			},
			{
				source: "/api/backup",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{ key: "Access-Control-Allow-Methods", value: "POST,OPTIONS" },
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
					},
				],
			},
		];
	},
};

export default nextConfig;
