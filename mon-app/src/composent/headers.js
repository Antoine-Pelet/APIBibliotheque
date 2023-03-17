import React from 'react';
import './index.css';

/**
 * 
 * @author apelet
 */
class Headers extends React.Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        // On bind la fonction "Recherche" de App.js à "handleSubmit" de ce composant
        this.handleSubmit = this.props.cherche.bind(this);
    }

    /**
     * 
     * @returns le composant Header avec le formulaire de recherche
     */
    render() {
        return (
            <div className="head">
                <form>
                    <h1>API de recherche google</h1>
                    {/* On utilise l'event onChange pour déclencher la recherche lorsque l'utilisateur entre un texte */}
                    <input type="text" name="search" onChange={this.handleSubmit} />
                </form>

            </div>
        )

    }
}

export default Headers;