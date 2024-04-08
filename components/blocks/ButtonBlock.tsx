import s from './ButtonBlock.module.scss'

export type LayoutProps = { data: ButtonBlockRecord }

export default function ButtonBlock({ data: { url, text, openInNewWindow } }: LayoutProps) {

	return (
		<a className={s.button} href={url} target={openInNewWindow ? '_blank' : undefined}>
			<button className="button nav">
				{text}
			</button>
		</a >
	)
}