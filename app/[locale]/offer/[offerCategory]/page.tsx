import s from './page.module.scss'
import cn from 'classnames';
import { LocaleParams } from '@app/[locale]/layout';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { AllOfferCategoriesDocument, OfferCategoryDocument } from '@graphql';
import { notFound } from 'next/navigation';
import * as BlockComponets from '@components/content/blocks';

type Params = { params: LocaleParams['params'] & { offerCategory: string } }

export default async function OfferCategory({ params }: Params) {

  const { offerCategory, draftUrl } = await apiQuery<OfferCategoryQuery, OfferCategoryQueryVariables>(OfferCategoryDocument, {
    variables: { locale: params.locale as SiteLocale, slug: params.offerCategory },
    tags: ['offer_category']
  });

  if (!offerCategory) return notFound();

  return (
    <>
      <article className={cn(s.offerCategory)}>
        <h1>{offerCategory.title}</h1>
      </article>
      <DraftMode url={draftUrl} tag={offerCategory.id} />
    </>
  )
}

export async function generateStaticParams({ params }: LocaleParams) {
  const { allOfferCategories } = await apiQuery<AllOfferCategoriesQuery, AllOfferCategoriesQueryVariables>(AllOfferCategoriesDocument, {
    variables: { locale: params.locale as SiteLocale },
    tags: ['offer_category']
  });

  return allOfferCategories.map(({ slug }) => ({ params: { locale: params.locale, offerCategory: slug } }));
}