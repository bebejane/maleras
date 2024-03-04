'use client'

import { useEffect, useRef, useState } from 'react';
import s from './OfferNavBar.module.scss'
import cn from 'classnames';

export type Params = {
  allOfferCategories: OfferQuery['allOfferCategories']
}

export default function OfferNavBar({ allOfferCategories }: Params) {

  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const isScrolling = useRef(false);

  useEffect(() => {

    const offers = document.getElementById('offers');

    if (!offers) return

    const offerElements = offers.getElementsByTagName('section');
    const observer = new IntersectionObserver((entries) => {
      const mostVisible = entries.reduce((prev, current) => (prev.intersectionRatio > current.intersectionRatio ? prev : current));

      if (mostVisible.isIntersecting && !isScrolling.current) {
        setCurrentSlug(mostVisible.target.id);
      }
    }, { threshold: 0.5 });

    Array.from(offerElements).forEach((el) => observer.observe(el));

    return () => {
      Array.from(offerElements).forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };

  }, [])

  const handleClick = (e: React.MouseEvent) => {
    const id = (e.target as HTMLAnchorElement).href?.split('#')[1];
    isScrolling.current = true;
    setCurrentSlug(id);
    setTimeout(() => isScrolling.current = false, 1000);
  }

  return (
    <nav className={s.offerNavBar}>
      <ul>
        {allOfferCategories.filter(({ _allReferencingOfferItems }) => _allReferencingOfferItems.length).map((category, idx) => (
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