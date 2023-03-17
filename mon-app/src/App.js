import logo from './logo.svg';
import './App.css';
import Headers from './composent/headers';
import Footers from './composent/footers';
import React from 'react';
import axios from 'axios';

/**
 * @author apelet
 */
class App extends React.Component {


  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [], // initialisation de l'état data avec un tableau vide
      currrentPage: 1, // initialisation de l'état currrentPage avec la valeur 1
      Maxresult: 10, // initialisation de l'état Maxresult avec la valeur 10
      totalItems: 0 // initialisation de l'état totalItems avec la valeur 0

    };
    this.Recherche = this.Recherche.bind(this); // bind de la fonction Recherche
    this.PagePrecedente = this.PagePrecedente.bind(this); // bind de la fonction PagePrecedente
    this.PageSuivante = this.PageSuivante.bind(this); // bind de la fonction PageSuivante
  }

  

  Recherche() {
    const {currrentPage, Maxresult} = this.state; // décomposition de l'état
    const startIndex = (this.state.currrentPage - 1) * this.state.Maxresult; // calcul de l'index de départ en fonction de la page courante et du nombre de résultats par page
    let requete =
      "https://www.googleapis.com/books/v1/volumes?q=inauthor:"+document.querySelector("input").value +"&startIndex="+startIndex+"&maxResults="+this.state.Maxresult; // construction de la requête de recherche
    axios
      .get(requete)
      .then((response) => {
        this.setState({data: response.data.items}); // mise à jour de l'état data avec les résultats de la recherche
      })
      .catch((error) =>{
      console.log("Error serveur"+error); // affichage du message d'erreur en cas d'échec de la requête
    })
    console.log(this.state.data); // affichage de l'état data dans la console
  }

  PagePrecedente() {
    this.setState(prevState =>({currrentPage: prevState.currrentPage - 1}), // mise à jour de l'état currrentPage avec la valeur de la page précédente
    ()=>{this.Recherche()} // appel de la fonction Recherche
      ); 
  }

  PageSuivante() {
    this.setState(prevState =>({currrentPage: prevState.currrentPage + 1}), // mise à jour de l'état currrentPage avec la valeur de la page suivante
      ()=>{this.Recherche()} // appel de la fonction Recherche
      ); 
  }
  /**
   * 
   * @returns  le composant App avec le composant Headers et la liste des résultats de la recherche ou le message "Aucun ouvrage correspondant à votre recherche" si la recherche n'a pas de résultat
   */
  render(){
    const{currrentPage, Maxresult, totalItems} = this.state; // décomposition de l'état
    const pages=[];  
    for(let i=1; i<=Math.ceil(totalItems/Maxresult); i++){ // boucle pour afficher les liens vers les différentes pages
      pages.push(i);
    }  
    return(
    <div className="App">

        <Headers cherche={this.Recherche} ></Headers> {/* appel du composant Headers avec la fonction Recherche comme prop */}
        { this.state.data && this.state.data.length > 0 ? // affichage conditionnel de la liste des résultats ou du message "Aucun ouvrage correspondant à votre recherche"
          <ul className="bod">
            
            {     
  

            
              this.state.data.map((item) => (
                <li key={item.id}>
                  {item.volumeInfo.imageLinks && <td><img src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} /></td>} {/* affichage de l'image si elle existe */}
                  {item.volumeInfo.title && <a href={item.volumeInfo.previewLink}>{item.volumeInfo.title.substring(0, 100) + '...'}</a>} {/* affichage du titre avec un lien vers la page de prévisualisation */}
                  {item.volumeInfo.description && <td>{item.volumeInfo.description.substring(0, 200) + '...'}</td>} {/* affichage de la description si elle existe */}
                </li>
              ))
            }
          </ul> 
        :
          <p>Aucun ouvrage correspondant à votre recherche </p>
        }
        <Footers currrentPage={currrentPage} pages={pages} PagePrecedente={this.PagePrecedente} PageSuivante={this.PageSuivante} Maxresult={Maxresult} totalItems={totalItems}></Footers>
    </div >
    );
  }
}

export default App;
