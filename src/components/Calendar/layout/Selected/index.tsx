// Types
import { RangeSelect, SingleSelect } from 'components/Calendar/hooks/useCalendar/types'

interface Props<T> {
  selected: NonNullable<T extends SingleSelect ? SingleSelect : RangeSelect>
}

function Selected<T>({ selected }: Props<T>) {

  if ((selected as RangeSelect).start && (selected as RangeSelect).end) {
    return (
      <div>
        <span>{(selected as RangeSelect).start}</span>
        &nbsp;-&nbsp;
        <span>{(selected as RangeSelect).end}</span>
      </div>
    )
  }

  if ((selected as RangeSelect).start) {
    return <div>{(selected as RangeSelect).start}</div>
  }


  if (typeof selected !== 'object') {
    return (
      <div>{(selected as SingleSelect)}</div>
    )
  }

  return <div>selected</div>
}

export default Selected
