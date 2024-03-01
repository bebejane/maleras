import s from './page.module.scss'
import cn from 'classnames';
import { LocaleParams } from '@app/[locale]/layout';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, Block } from 'next-dato-utils/components';
import { OfferDocument } from '@graphql';
import { notFound } from 'next/navigation';
import { Image } from 'react-datocms';
import Content from '@components/Content';

export default async function Offer({ params }: LocaleParams) {

  const { offer, allOfferCategories, draftUrl } = await apiQuery<OfferQuery, OfferQueryVariables>(OfferDocument, {
    variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale: params.locale as SiteLocale },
    tags: ['offer']
  });

  if (!offer) return notFound();

  return (
    <>
      <article className={cn(s.offer)}>
        <header>
          <h1>{offer.title}</h1>
          <Content content={offer.content} />
          {offer.image &&
            <figure>
              <Image data={offer.image.responsiveImage} pictureClassName={s.image} />
            </figure>
          }
        </header>
        <nav>
          <ul>
            {allOfferCategories.filter(({ _allReferencingOfferItems }) => _allReferencingOfferItems.length).map((category, idx) => (
              <li key={idx}>
                <a href={`#${category.slug}`}>{category.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        {allOfferCategories.map(({ slug, _allReferencingOfferItems: items }, idx) => {
          return (
            <section key={idx} id={slug}>
              <ul>
                {items.map(({ title, content, gallery, backgroundImage, backgroundColor }, idx) => {
                  return (
                    <li key={idx} className="grid">
                      <div className={s.content}>
                        <h3>{title}</h3>
                        <Content content={content} />
                      </div>
                      <div className={s.gallery}>
                        {gallery.map(({ media }) => media.map((m, idx) =>
                          <figure className={cn(media.length > 1 && s.double)} key={idx}>
                            <Image data={m.responsiveImage} />
                          </figure>
                        ))}
                      </div>
                      {backgroundImage &&
                        <Image data={backgroundImage.responsiveImage} className={s.background} />
                      }
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </article>
      <DraftMode url={draftUrl} tag={offer?.id} />
    </>
  )
}