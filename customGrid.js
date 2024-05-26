import {LitElement, html, css} from 'lit';


const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};


export class CustomGrid extends LitElement {
  static properties = {
    url: "",

  };
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = css`
    :host {
     width: 100vw;
    }
    .grid {

    }
    .row{
      grid: repeat(1, 33px) / auto-flow 200px;
      display: grid;
      border-bottom: 1px solid #ccc;
     
 
    }
    .row > div {
    border-right: 1px solid #ccc;
    padding: 8px;
    font-size: 18px;
    }
    .row:hover {
      background-color: #f1f1f1;
    }

  `;






  constructor() {
    super();
  
    // Define reactive properties--updating a reactive property causes
    // the component to update.
  }
  renderData(data){

    const headerRow = document.createElement('div');
    headerRow.className = 'row header';
    const headRes = (element)=> {
      for(let key in element){
        let headerCell = document.createElement('div');
        if(typeof element[key] === 'object' && element[key]  !== null){
          headRes(element[key])
        }
        else{
          headerCell.innerHTML = key;
          headerRow.appendChild(headerCell);
        }
      }
    }
    headRes(data[0]);

    this.shadowRoot.querySelector(':host .grid').appendChild(headerRow);

   const cellRes= (r, element)=>{
    for(let key in element){
      let cell = document.createElement('div');
      console.log(element[key]);
      if(typeof element[key] === 'object' && element[key]  !== null){
        cellRes(r, element[key])
      }
else{
      cell.innerHTML = element[key];

      r.appendChild(cell);
}
    }
   }
    data.forEach(element => {
      let row = document.createElement('div');
      row.className = 'row';
      cellRes(row, element);
      
      this.shadowRoot.querySelector(':host .grid').appendChild(row);



    });
   
  }



  // The render() method is called any time reactive properties change.
  // Return HTML in a string template literal tagged with the `html`
  // tag function to describe the component's internal DOM.
  // Expressions can set attribute values, property values, event handlers,
  // and child nodes/text.
  render() {
    setTimeout(() => {
      getData(this.url).then(data => {
         this.renderData(data);
  
      })}, 50);
  
    
 
    return html`<div class="grid"></div>`;
  }

  // Event handlers can update the state of @properties on the element
  // instance, causing it to re-render
  togglePlanet() {
    this.planet = this.planet === 'World' ? 'Mars' : 'World';
  }
}
customElements.define('custom-grid', CustomGrid);
