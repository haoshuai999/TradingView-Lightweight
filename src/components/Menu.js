const Menu = ({options, selectedAsset, onAssetChange}) => {
    return (
        <select id="asset-select" onChange={
            event => onAssetChange(event.target.value)
        }>
            {options.map((option) => (
                <option selected={option === selectedAsset} value={option}>{option}</option>
            ))
            }
        </select>
    )
}


export default Menu;