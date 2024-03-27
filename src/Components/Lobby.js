import { Link } from 'react-router-dom';
import './Lobby.css';

const Lobby = () => {
    return (
        <div className='lobby-container'>
            <h1>Welcome to the Lobby page!</h1>
            <h2>please choose code block:</h2>
            <div className="grid-container">
                <Link to={`/block1`} className='grid-item'>
                    <h2>first exercise:</h2>
                    <img src={require('../images/first_icon.jpg')} alt='img in here' height={200} width={200} />
                </Link>
                <Link to={`/block2`} className='grid-item'>
                    <h2>second exercise:</h2>
                    <img src={require('../images/programming.png')} alt='img in here' height={200} width={200} />
                </Link>
                <Link to={`/block3`} className='grid-item'>
                    <h2>third exercise:</h2>
                    <img src={require('../images/coding-language.png')} alt='img in here' height={200} width={200} />
                </Link>
                <Link to={`/block4`} className='grid-item'>
                    <h2>fourth exercise:</h2>
                    <img src={require('../images/password.png')} alt='img in here' height={200} width={200} />
                </Link>
            </div >
        </div>
    )
}

export default Lobby;