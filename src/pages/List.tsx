import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TAlbumItem } from './day-data'
import { Card } from './Card'
import '../styles/index.css'
import { setCalendarData } from '../redux/effects/Shifts';


interface listItems {
	year: any,
	index: any,
	day: number,
	startHour: number,
	endHour: number
}

type TListProps = {
	items: TAlbumItem[],
	shifts?: any,
	calendarData?:any
}

// type TListProps = {
// 	items:string
// }

export const List = (props: TListProps) => {
	const dispatch = useDispatch()
	const { items, shifts, calendarData } = props

	const [listData, setListData] = useState<listItems[]>([])
	const [choosenData, setChoosenData] = useState<number[]>([])
	const [contentData, setContentData] = useState<any[]>([])

	const handleChoosenData = (year: number, shift: any) => {
		let choosen = choosenData
		let content = contentData
		if (!choosenData.includes(year)) {
			choosen.push(year)
			content.push(shift)
		}
		setChoosenData(choosen)
		setContentData(content)
	}

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
	}

	return (
		<div className="flex-center">
			<div className="albums">
				{items.map(item => (
					<Card key={item.year} contentData={contentData} choosenData={choosenData} calendarData={calendarData} handleChoosenData={handleChoosenData} shifts={shifts} player={item.player} year={item.year} listData={listData} setListData={handleTimeData} />
				))}
			</div>
		</div>
	)
}