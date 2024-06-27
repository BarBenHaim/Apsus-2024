const colors = ['#FFECB3', '#FFF9C4', '#FFCDD2', '#BBDEFB', '#C8E6C9', '#FFE0B2']

export function ColorPicker({ onColorSelect }) {
    return (
        <div className='color-picker'>
            <div className='color-options'>
                {colors.map(color => (
                    <div
                        key={color}
                        className='color-option'
                        style={{ backgroundColor: color }}
                        onClick={e => {
                            e.stopPropagation()
                            onColorSelect(color)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
