import './index.css'

const TabItem = props => {
  const {eachTab, isActive, clickTabItem} = props
  const {displayText, tabId} = eachTab
  const buttonStyle = isActive ? 'active-button' : 'normal-button'
  const onClickingTab = () => {
    clickTabItem(tabId)
  }

  return (
    <li>
      <button type="button" className={buttonStyle} onClick={onClickingTab}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
