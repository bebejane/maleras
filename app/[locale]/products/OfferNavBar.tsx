'use client'

import { useEffect, useRef, useState } from 'react';
import useIsDesktop from '@lib/hooks/useIsDesktop';
import s from './OfferNavBar.module.scss'
import cn from 'classnames';
import { useScrollInfo } from 'next-dato-utils/hooks';

export type Params = {
  allOfferCategories: AllOfferCategoriesQuery['allOfferCategories']
}

export default function OfferNavBar({ allOfferCategories }: Params) {

  const categories = allOfferCategories.filter(({ _allReferencingOfferItems }) => _allReferencingOfferItems.length)
  const [currentSlug, setCurrentSlug] = useState<string | null>(categories[0]?.slug ?? null);
  const isScrolling = useRef(false);
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const { scrolledPosition } = useScrollInfo()


  useEffect(() => {

    const offers = document.getElementById('offers');

    if (!offers || isScrolling.current) return

    const offerElements = offers.querySelectorAll('section[data-offer-id]');
    let mostVisible = offerElements[0];
    let ratio = 0;
    offerElements.forEach((offer) => {
      const rect = offer.getBoundingClientRect();
      const visibleRatio = rect.height / (window.innerHeight - rect.top);
      if (visibleRatio > ratio) {
        mostVisible = offer;
        ratio = visibleRatio;
      }
    });
    setCurrentSlug(mostVisible.id);

  }, [scrolledPosition])

  useEffect(() => {
    // Set the margin-top of the first offer section to the height of the navbar, sticky stuff
    const firstOfferSection = document.getElementById('offers')?.querySelectorAll('section[data-offer-id]')[0] as HTMLDivElement
    firstOfferSection.style.marginTop = isDesktop ? `calc(-1 * calc(${ref.current?.offsetHeight}px + var(--space)))` : 'unset'
  }, [isDesktop])


  const handleClick = (e: React.MouseEvent) => {
    const id = (e.target as HTMLAnchorElement).href?.split('#')[1];
    isScrolling.current = true;
    setCurrentSlug(id);
    setTimeout(() => isScrolling.current = false, 1000);
  }

  return (
    <nav id="offer-navbar" className={cn(s.offerNavBar, "grid")} ref={ref}>
      <ul>
        {categories.map((category, idx) => (
          <li key={idx} className={cn(currentSlug === category.slug && s.selected)}>
            <a href={`#${category.slug}`} onClick={handleClick}>
              {category.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}