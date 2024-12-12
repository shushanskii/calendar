interface Props {
  selected: string[]
}

function Selected({ selected }: Props) {

  return <div>{selected[0]} - {selected[selected.length - 1]}</div>
}

export default Selected
