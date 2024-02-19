import page from '@app/about/page';
import { LocaleParams } from '@app/[locale]/layout';

export type LocaleAboutParams = LocaleParams & { params: { about: string; } };

export default async (params: LocaleAboutParams) => page(params);
