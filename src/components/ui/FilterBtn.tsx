interface Props {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

export default function FilterBtn({ active, onClick, children }: Props) {
  return (
    <button className={`ag-filter-btn${active ? ' active' : ''}`} onClick={onClick}>
      {children}
    </button>
  )
}
