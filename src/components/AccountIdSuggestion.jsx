import './AccountIdSuggestion.css'

function AccountIdSuggestion() {
  return (
    <div className="hint">
      <p>Don't know where to get your AccountID?</p>
      <p>
        Go to <a href="https://steamdb.info/calculator/" target="_blank" style={{ color: "#88bbd5", fontSize: 18 }}>SteamDB</a> and find your Steam account
      </p>
    </div>

  )
}

export default AccountIdSuggestion