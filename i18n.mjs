export const locales = ["sv", "en"];
export const defaultLocale = "sv";
export const paths = {
	start: {
		en: "",
		sv: "",
	},
	about: {
		en: "about",
		sv: "om",
	},
	contact: {
		en: "contact",
		sv: "kontakt",
	},
	offer: {
		en: "offer",
		sv: "erbjudande",
	},
};

export const translatePath = (path, locale) => {
	const k = Object.keys(paths).find((key) => `/${paths[key].en}` === path);
	const translatedPath = paths[k][locale];
	return translatedPath;
};
