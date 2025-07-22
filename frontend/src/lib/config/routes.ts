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
				slug: 'iphone-16-pro',
				name: 'iPhone 16 Pro',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=5120&hei=2880&fmt=webp&qlt=70&.v=eUdsd0dIb3VUOXdtWkY0VFUwVE8vbEdkZHNlSjBQRklnaFB2d3I5MW94NlcvVjg4Q2h4WWRjcFAyYlBrM0N1bGlCQmV2WTA2cncybDF2YzFnKzI0S2prMCtUNWwzYWR0UVU3TWVsbEdUeXZka3Q2dVFYV2lxTm4wNXBJcGZoM1Rqb3p6Q2ZyUTlqTERzaHFUOVhnZGR3&traceId=1'
			},
			{
				slug: 'iphone-16',
				name: 'iPhone 16',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-black?wid=5120&hei=2880&fmt=webp&qlt=70&.v=UXp1U3VDY3IyR1hNdHZwdFdOLzg1V0tFK1lhSCtYSGRqMUdhR284NTN4L2xJT1MvUkQrVjRwaXNCNlgyUGhDdU9MekhWSGZtV1pvV240QzNuTk80VXhseHVZcEw1SmhqcElaQkJMTm9FMzlybFRjTGx3Ymc5Q0xLTWVYeWNsMG8&traceId=1'
			},
			{
				slug: 'iphone-15',
				name: 'iPhone 15',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-black?wid=5120&hei=2880&fmt=webp&qlt=70&.v=cHJOTXEwTU92OEtKVDV2cVB1R2FTSjlERndlRTljaUdZeHJGM3dlLzR2L2xJT1MvUkQrVjRwaXNCNlgyUGhDdU9MekhWSGZtV1pvV240QzNuTk80VXhseHVZcEw1SmhqcElaQkJMTm9FMytQNHRHSXNvL0hGVGlzeWppV0UxM3U&traceId=1'
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
				slug: 'apple-watch-series-10',
				name: 'Apple Watch Series 10',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/s10-case-size-select-202409-aluminum-jet-black-46mm?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=d01LeFR0K0V4MnBZdmk4a2dHWFRaSGkvREVuVVBSc3RRT2hMdlRYQUplY1dFeEtkd2lBUEtxWldFZTNXeGFkVXpLaG5vK3dJZXFBTTZ0d05aVlpoUVh4TS9QOFlhVHZoV2xFZjU3V3B4aXNqZHBGOXVvUVIvUUNUYndFNVFmNW9LQ0FOR1h4S29BRHovMjZ3b2tYZmVB'
			},
			{
				slug: 'apple-watch-ultra-2',
				name: 'Apple Watch Ultra 2',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MYPW3ref_VW_34FR+watch-case-49-titanium-black-ultra2_VW_34FR+watch-face-49-alpine-ultra2_VW_34FR?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=ODJ6TUhuVUxmSXVQbXkrRFpieTV1M2pDV2hhem5qNnpDenFtKzI1OXdzWjRaeVR4RW9XWXhWVHRHeXZEa3AwcGZsNDErT2hQbWVmS0VCWlVweVY1UG5JeTlvZUg2NDJab29oaTJoOXRFQXBBSGRzUUpEVHM4ZVJVZlRFRENTN3dkd1o4QjdsQWVyZ0k5NU9zSDMxKzBHbytKTUtMVWljVzR5ZGEwNUpVZGUrckpmNWN0WVRsNmlxbjU0T3JCYkhaSW94SzBxYk9aamJxYmpyMzdYUFdjN3lDTk9UZTF2b0xoKzNMc1FnOGhROA'
			},
			{
				slug: 'apple-watch-se',
				name: 'Apple Watch SE',
				image:
					'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/se-case-size-select-202409-midnight-44mm?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=S0ZpY0dROXo2U0dDeTlxWXM0bXUycEx1MDFJN0ViSmVrSTA5QzdQeFVySkpaZ3IzQmxaMjNMVDgzK0I4S0xvcnpvSEo2UzBKSm5BUmFETEIwa1Jzd1BXdlJRYjdSZWJHVUh4aFVDb0hhVVVqWmRIdmpoUXV0eW1QUThrZkNrNlo'
			},
			{
				slug: 'airpods-4',
				name: 'AirPods 4',
				image:
					'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-select-202409_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=1725502554118'
			},
			{
				slug: 'airpods-pro-2',
				name: 'AirPods Pro 2',
				image:
					'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=1725492499003'
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
