import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { TAlbumItem } from './day-data'
import { setCalendarData } from '../redux/effects/Shifts';
import { Card } from './Card'
import '../styles/index.css'

type TListProps = {
	items?: TAlbumItem[],
	shifts?: any[]
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
	const { items, shifts } = props

	const [listData, setListData] = useState<listItems[]>([])

	// console.log(shifts)

	let contentDatas: any =[]

	const handleTimeData = (data: listItems[]) => {
		let yearData = data[0]['year']
		
		let list: any[] = []
		let year: any[] = []
		if (contentDatas.length !== 0) {
			contentDatas.forEach((content: { year: any; }, index: any) => {
				year.push(content.year)
				list.push(content)
			})
		}
		if (list.length !== 0) {
			list.forEach((content, index) => {
				year.push(content.year)
			})
		}
		if (!year.includes(yearData)) {
			let dataSend = {
				year: data[0].year,
				index: data[0].index,
				day: data[0].day,
				startHour: data[0].startHour,
				endHour: data[0].startHour
			}
			list.push(dataSend)
		}
		contentDatas = list
	}
	if (contentDatas.length !== 0) {
		setListData(contentDatas)
		dispatch(setCalendarData(contentDatas))
	}
	return (
		<div className="flex-center">
			<div>
				{listData}
			</div>
			<div className="albums">
				{
					items ? 
						<div>
							{items.map(item => (
								<Card key={item.year} player={item.player} year={item.year} listData={listData} handleTimeData={handleTimeData} />
							))}
						</div>
						:
						<div></div>
				}
			</div>
		</div>
	)
})