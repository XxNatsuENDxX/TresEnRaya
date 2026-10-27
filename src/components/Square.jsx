export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''} ${children === '×' ? 'is-x' : children === '○' ? 'is-o' : ''
        }`

    const handleClick = () => {
        if (updateBoard) {
            updateBoard(index)
        }
    }

    return (
        <button type='button' onClick={handleClick} className={className}>
            {children}
        </button>
    )
}