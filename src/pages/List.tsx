import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TAlbumItem } from './day-data'
import { Card } from './Card'
import '../styles/index.css'
import { setCalendarData } from '../redux/effects/Shifts';

type TListProps = {
	items: TAlbumItem[]
}

interface listItems {
	year: any,
	index: any,
	day: number,
	startHour: number,
	endHour: number
}

export const List = memo((props: TListProps) => {
	const dispatch = useDispatch()
	const { items } = props

	const [listData, setListData] = useState<listItems[]>([])

	const handleTimeData = (data: any) => {
		let list = listData
		let year: any[] = []
		if (list.length !== 0) {
			list.forEach((content, index) => {
				year.push(content.year)
			})
		}
		if (!year.includes(data.year)) {
			list.push(data)
		}
		setListData(list)
		dispatch(setCalendarData(list))
	}
	return (
		<div className="flex-center">
			<div>
				{listData}
			</div>
			<div className="albums">
				{items.map(item => (
					<Card key={item.year} player={item.player} year={item.year} listData={listData} setListData={handleTimeData} />
				))}
			</div>
		</div>
	)
})