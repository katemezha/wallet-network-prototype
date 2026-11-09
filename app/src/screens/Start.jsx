export default function Start({ onStart }) {
  return (
    <section className="screen screen-center">
      <div className="coin" aria-hidden="true">₮</div>
      <h1>Send USDT</h1>
      <p className="muted">You'll complete two transfers. Act as you would with your own money.</p>
      <div className="actions">
        <button className="btn btn-primary" onClick={onStart}>Start</button>
      </div>
    </section>
  )
}
