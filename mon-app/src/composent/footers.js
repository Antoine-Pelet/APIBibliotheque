import React from 'react';
import './index.css';

/**
 * 
 * @author apelet
 */
class Footers extends React.Component {


    render() {
        const {currrentPage,PagePrecedente,PageSuivante,pages,Maxresult,totalItems} = this.props;  // décomposition de l'état
        return (
            <div className="foot">
                <button onClick={PagePrecedente} disabled={currrentPage === 1}>Page précédente</button>
               
                <span> {Maxresult} sur {totalItems}</span>

                <button onClick={PageSuivante} disabled={currrentPage === pages.length}>Page suivante</button>
            </div>
        )

    }
}

export default Footers;