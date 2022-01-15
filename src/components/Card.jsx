import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <>
      <div className="card" style={{ width: '18rem' }}>
        { data.image && <img src="https://media.gettyimages.com/photos/bicycle-from-1885-one-of-the-first-bicycles-historical-engraving-1880-picture-id629447585?s=2048x2048" alt="" />}
        <div className="card-body">
          <h5 className="card-title">{data.title}</h5>
          <p className="card-text">{data.text}</p>
          {data.cta && <Link to={data.cta} className="btn btn-primary">Go somewhere</Link>}
          {data.secondaryCta && <button onClick={() => {data.handleBuyButtonClick(data.id)}} className="btn btn-success">Buy me</button>}
        </div>
      </div>
    </>
  )
}

export default Card;