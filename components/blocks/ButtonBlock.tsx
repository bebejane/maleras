import s from './ButtonBlock.module.scss'

export type LayoutProps = { data: ButtonBlockRecord }

export default function ButtonBlock({ data: { url, text } }: LayoutProps) {

	return (
		<a className={s.button} href={url}>
			<button className="button nav">
				{text}
			</button>
		</a >
	)
}