import s from './page.module.scss'
import cn from 'classnames';
import { LocaleParams } from '@app/[locale]/layout';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, Block } from 'next-dato-utils/components';
import { OfferDocument } from '@graphql';
import { notFound } from 'next/navigation';
import { Image } from 'react-datocms';
import Content from '@components/Content';
import OfferNavBar from './OfferNavBar';

export default async function Offer({ params }: LocaleParams) {

  const { offer, allOfferCategories, draftUrl } = await apiQuery<OfferQuery, OfferQueryVariables>(OfferDocument, {
    variables: { siteId: process.env.NEXT_PUBLIC_SITE_ID, locale: params.locale as SiteLocale },
    tags: ['offer']
  });

  if (!offer) return notFound();

  return (
    <>
      <article id="offers" className={cn(s.offer)}>
        <header>
          <section>
            <h1>{offer.title}</h1>
            <Content content={offer.content} className="intro" />
          </section>
          {offer.image &&
            <figure>
              <Image data={offer.image.responsiveImage} pictureClassName={s.image} />
            </figure>
          }
        </header>
        <OfferNavBar allOfferCategories={allOfferCategories} />
        {allOfferCategories.map(({ id, slug, _allReferencingOfferItems: items }, idx) => {
          return (
            <section id={slug} key={idx} data-offer-id={id}>
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