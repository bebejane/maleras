'use server'

import s from './page.module.scss'
import cn from 'classnames';
import { apiQuery, DraftMode } from 'next-dato-utils';
import { StartDocument } from '@graphql';

export default async function Start() {

  //const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument);

  return (
    <>
      <article className={cn(s.start)}>
        start {process.env.NEXT_PUBLIC_SITE_ID}
      </article>
      {/*<DraftMode url={draftUrl} tag={start?.id} />*/}
    </>
  )
}