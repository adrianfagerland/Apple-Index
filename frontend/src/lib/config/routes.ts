export type ProductCategory = 'mac' | 'ipad' | 'iphone' | 'others';
// | 'vision'
// | 'airpods'
// | 'tv-home';

export type RouteConfig = {
	[K in ProductCategory]: {
		title: string;
		products: {
			slug: string;
			name: string;
			image: string;
		}[];
	};
};

export const routes: RouteConfig = {
	mac: {
		title: 'Mac',
		products: [
			{
				slug: 'macbook-air',
				name: 'MacBook Air',
				image:
					'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-config-202306?wid=840&hei=508&fmt=jpeg&qlt=90&.v=1684340991333'
			},
			{
				slug: 'macbook-pro',
				name: 'MacBook Pro',
				image:
					'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-cto-hero-202410?wid=840&hei=498&fmt=jpeg&qlt=90&.v=1731525368125'
			},
			{
				slug: 'imac',
				name: 'iMac',
				image:
					'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-blue-cto-hero-202410?wid=860&hei=778&fmt=jpeg&qlt=90&.v=1729011694581'
			},
			{
				slug: 'mac-mini',
				name: 'Mac mini',
				image:
					'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-hero-202410?wid=772&hei=466&fmt=jpeg&qlt=90&.v=1728622183198'
			},
			{
				slug: 'mac-studio',
				name: 'Mac Studio',
				image:
					'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-studio-hero-202306?wid=834&hei=408&fmt=jpeg&qlt=90&.v=1683939183510'
			},
			{
				slug: 'mac-pro',
				name: 'Mac Pro',
				image:
					'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-pro-tower-hero-splitter-2023?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1684181485853'
			}
		]
	},
	ipad: {
		title: 'iPad',
		products: [
			{
				slug: 'ipad-pro',
				name: 'iPad Pro',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-storage-select-202405-13inch-spaceblack?wid=5120&hei=2880&fmt=webp&qlt=70&.v=czlRMVFIQnlSdTl0T3ZTQUtJUW9rMm5pQUoxb0NIVEJFSjRVRzZ4dzV5U2NwV2FpZUdscFJrdzhxcjBnRkVONDhLcXQxZ1h0QThIT2dnUm5qbGk5OUJkSERIUjY1Wk1Od3FtNjF6NFZLVXNEM051cXZ3Wkg5UGpEalNFQjVramR2d3FYVjZtcVBNOTFvLzEvcUtBMCtR&traceId=1'
			},
			{
				slug: 'ipad-air',
				name: 'iPad Air',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-13inch-space-gray?wid=5120&hei=2880&fmt=webp&qlt=70&.v=SzlUeW5ITUpKK1FKdDdNS0xNUVhmM3hxSU9Rc1hENld5ZlZGbisxZU9hVmRPcWJ2UWRGNG9xTWpJdVVmRldsWWdCOVI4SUNZWW56UDRQN0hkK2RSSEFDb1F2RTNvUEVHRkpGaGtOSVFHalBTUFBNZ0M4MTl3aXZXQVpzNHkwVnkzTlZ0RVhVd2ErV05JWTlSRElwZGtn&traceId=1'
			},
			{
				slug: 'ipad',
				name: 'iPad',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-10th-gen-storage-select-202212-blue?wid=5120&hei=2880&fmt=webp&qlt=70&.v=K0VQT3FFaHFhTWU0ME1DRnlHMFM3bEIvTXY5NjBUQVhVcnFORUt4SFI2QXVydldlTjVqQnhYWVhaM3FCVnF1VE9UVDVQbVhkcDIxQlRzeDZXVVpQSzF6enlSazFhbGkvR0NiVTdBeWRQTnlZZ2lWdVRBc0YzbEJkM3NURkZpSy8&traceId=1'
			},
			{
				slug: 'ipad-mini',
				name: 'iPad mini',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-mini-storage-select-gallery-202410-space-gray?wid=5120&hei=2880&fmt=webp&qlt=70&.v=bFU5N2g4aXJnREUycExQajkrUEtxVTRQdUZOUjNqOGs3RHc3NGcvUnpJb3NCQXp4M0lHOXF1dHJlMCs1UUlIbFFkNzk5MUhTY1J1b1lobFVhbXZVN1dKTG1lVWJJT2RXQWE0Mm9rU1V0V0RyNi9wUmRQRFNsWk9tVW92a0pGbzNIS2FnckNNVlFLeFBlV1FBTjN6ZEpn&traceId=1'
			}
		]
	},
	iphone: {
		title: 'iPhone',
		products: [
			{
				slug: 'iphone-17-pro',
				name: 'iPhone 17 Pro',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-3inch-deepblue?wid=5120&hei=2880&fmt=webp&qlt=90&.v=NUNzdzNKR0FJbmhKWm5YamRHb05tUzkyK3hWak1ybHhtWDkwUXVINFc0RUczK3M0RVhxWWpFZXJsZzlEU0tTSHVHdDcxbVFRSnhaQ0pnV1pOaG5KaGhNQnJMcnc4RkxJd3ZMc3hKZVVFWHVpT1Z6NWMwNURPMDlnZXlyQlY4dlVwYS9BYWxBUFY3NVFZRnlMNGI1MGh3&traceId=1'
			},
			{
				slug: 'iphone-air',
				name: 'iPhone Air',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-select-202509-spaceblack?wid=5120&hei=2880&fmt=webp&qlt=90&.v=NUpaQVl1bitSNmJWZUdKdi9QZHhsQnMyOXpiUEVyWXc0UFVFMUg1R1Ztcit0SFUxZzlOYjFnK2g1TG9hVnNYcmd2S3NaRzcrU0dmYjNHTUFiMnlsWFUxSlgrVWMrMzU1OXo2c2JyNjJZTGdKcDN0aXVOTTZnUHhGVUh3VFRCL1A&traceId=1'
			},{
				slug: 'iphone-17',
				name: 'iPhone 17',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-finish-select-202509-black_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=90&.v=WGdCRlQ0YVlqbTdXTEkxRnVQb0oxa3pYQjBteGp2cFFHL09TNGhVUUhxeHFkSUJZcmNjVXZ4cDk3YTVMcWk4SHF2TWlpSzUzejRCZGt2SjJUNGl1VEE4bm1RcmlWRWp2eDN1WHNkSjNmUmJRdGRDSXo3RG9GTXJVdDhBcERxMEQ&traceId=1'
			},{
				slug: 'iphone-16',
				name: 'iPhone 16',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-black?wid=5120&hei=2880&fmt=webp&qlt=70&.v=UXp1U3VDY3IyR1hNdHZwdFdOLzg1V0tFK1lhSCtYSGRqMUdhR284NTN4L2xJT1MvUkQrVjRwaXNCNlgyUGhDdU9MekhWSGZtV1pvV240QzNuTk80VXhseHVZcEw1SmhqcElaQkJMTm9FMzlybFRjTGx3Ymc5Q0xLTWVYeWNsMG8&traceId=1'
			},
			
			{
				slug: 'iphone-16e',
				name: 'iPhone 16e',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16e-finish-select-202502-black?wid=5120&hei=2880&fmt=webp&qlt=70&.v=bGxrMXRYSllVRTZGbi82ZklwWis2L1E4VHZqM2p1UHFJc1owKzJEcWVyUTBHUk0xampKNG9lbGhBOGJDblFiazg5ZFJsR0hrQnFVeEVSbnU0TWlpU0dSMjFQbWROWjJPYy9mb3VMRjFSOU01WlFMRld4TzIreHYyNVVpNmV3VGM&traceId=1'
			}
		]
	},
	others: {
		title: 'Others',
		products: [
			{
				slug: 'apple-vision-pro',
				name: 'Apple Vision Pro',
				image:
					'https://store.storeimages.cdn-apple.com/4981/as-images.apple.com/is/vision-pro-gallery-payment-202401_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=95&.v=1701912705450'
			},
			{
				slug: 'apple-watch-series-11',
				name: 'Apple Watch Series 11',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/s11-case-select-202509-aluminum-jet-black?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=OWZ0bXVDZkl0SldCMWswM0FYcUNTUHZ1STNHWTBvSFpnMG5kR3dUaTRpeWNIZjB2Y2x5b05WU00vQnBZNmczamZvSGF2dFhlaXl5ZzZDVTRMdEVvNldmalN5dlRpR2R3QUc1RGJwYllnWmdxWjFSTkRWemo5VzdVWUw4OTJvK2Q'
			},
			{
				slug: 'apple-watch-ultra-3',
				name: 'Apple Watch Ultra 3',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ultra-case-select-202509-black?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=eklmRkg1SGV0cnBBRkZsU1d5OTdqNDZ4eWNXSG9hWS81dk0xOGxMSGNraXRQaHRXQmg1Smw1K0VETVJwK2N3R3ZGdXpoZGFjcnJiZGtXTlNNRSszQXVKd05xSk8rWU0zQVB6eFBIbkhXbHZNbWNiSkkrWnVwaVd4bUt2bm5sUkY'
			},
			{
				slug: 'apple-watch-se-3',
				name: 'Apple Watch SE 3',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/se-case-select-202509-midnight?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=Kzl5VjJlYy8yNE5uZ1M0cU0rKzBvQURUaTBaY01DVXNUUXN4S2xSaTIvMnRQaHRXQmg1Smw1K0VETVJwK2N3R3ZGdXpoZGFjcnJiZGtXTlNNRSszQWhiQVoyN1NCZURhTDVrODdVZFZwOCtZY0NtY1ViSzFtVWp5R3JFaTBUemg'
			},
			{
				slug: 'airpods-4',
				name: 'AirPods 4',
				image:
					'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-select-202409_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=1725502554118'
			},
			{
				slug: 'airpods-pro-3',
				name: 'AirPods Pro 3',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-3-hero-select-202509?wid=976&hei=916&fmt=jpeg&qlt=90&.v=cmp4MmZ6OWxOeHNNTXh4SzlBNUpEb1RucE9zZTI5eEREaWZpY29lSld3eWVDYXovZDMyN1dXU211bjZoVlVUcWJGcXNRQnFCV0w3WVRjTExvdm1ic2M2d1A3akN5RnhicUhBZWMwNXB6MUwrNmVjbmk5c1V4VVk2VEt3TGcxekg'
			},
			{
				slug: 'airpods-max',
				name: 'AirPods Max',
				image:
					'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-compare-202409?wid=210&hei=250&fmt=jpeg&qlt=95&.v=1723594294259'
			}
		]
	}
};
// 'tv-home': {
//   title: 'TV & Home',
//   products: [
//     { slug: 'apple-tv-4k', name: 'Apple TV 4K' },
//     { slug: 'homepod', name: 'HomePod' },
//     { slug: 'homepod-mini', name: 'HomePod mini' }
//   ]
// }

