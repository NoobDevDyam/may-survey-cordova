//113021

//internet is struggling i don't think i can use cordova :') 
//twas a good run o7
/* Dictionary of Candidates */
const candidates = [
  {
    name: 'Leni',
    color: 'pink',
    votes: 0
  },
  {
    name: 'BBM',
    color: 'red',
    votes: 0
  },
  {
    name: 'Pakiaw',
    color: 'orange',
    votes: 0
  },
  {
    name: 'Isko',
    color: 'blue',
    votes: 0
  },
]

function generateCandidates(){
  const fieldGroup = document.querySelector('#fieldGroup');

  for (let i = 0; i < candidates.length; i += 1){
    fieldGroup.innerHTML += `
      <div class="container my-3">
        <label class="h2 display-4 me-3" 
        style="color:${candidates[i].color}" 
        for="vote${i}">
        ${candidates[i].name}
        </label>
        <button type="button" 
        class="btn me-3 mb-4 px-5 py-2"
        style="background-color:${candidates[i].color};
        color: white"
        onclick="vote()"
        id="vote${i}">
          VOTE
        </button>
      </div>
    `
  }
  //get candidates votes
  for(let i = 0; i < candidates.length; i += 1){
    candidates[i].votes = Number(localStorage.getItem(`${candidates[i].name}`));
  }
  

  //generate graph
  generateGraph();


  //does not work giving up o7
  /* fieldGroup.innerHTML += `
      <div class="container my-3">
        <button type="button" 
        class="btn btn-info text-light"
        onclick="clear()"
        >
          CLEAR
        </button>
      </div>
    ` */
}


function vote(){
  //find all buttons
  const votes = document.querySelectorAll('button');

  for(let i = 0; i < votes.length; i += 1){

    //check which button was pressed
    votes[i].onclick = function(e){
      candidates[i].votes += 1;

      //store votes
      localStorage.setItem(`${candidates[i].name}`, candidates[i].votes);
      
      //generate graph
      generateGraph();

      //for debug
      console.log(`${candidates[i].name}`, candidates[i].votes)
      console.log(candidates)
    }
  }

}




//based from data of localStorage
function generateGraph(){
  const graphWidth = 200;
  const graphHeight = 40;

  const size = 30;
  const spacing = 10;

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext("2d");

  //set canvas size
  const canvasWidth = 80 * window.innerWidth / 100;
  const canvasHeight = 100 * window.innerHeight / 100;
  //set to be responsive
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.width = canvasWidth;
  canvas.style.height = canvasHeight;

  //coordinates
  let xGraph = 300;
  let yGraph = 50;
  let xText = 0;
  let yText = 80;

  //font
  ctx.font = `${size}px Arial`;

  //get total votes
  let totalVotes = 0;
  for(let i = 0; i < candidates.length; i += 1){
    totalVotes += Number(localStorage.getItem(`${candidates[i].name}`));
    console.log("total votes", totalVotes)
  }


  //get percentage
  const percentage = (candidate) => candidate / totalVotes;


  let graphFill = 0;
  let candidate
  for(let i = 0; i < candidates.length; i += 1){
    candidate = Number(localStorage.getItem(`${candidates[i].name}`));
    //set graphfill per vote
    graphFill = graphWidth * percentage(candidate);
    //fill with candidate color
    ctx.fillStyle = `${candidates[i].color}`;
    //place candidate name
    ctx.fillText(`${candidates[i].name} 
    (${(percentage(candidate) * 100).toFixed(2)}%)`, xText, yText);
    //fill graph
    ctx.fillRect(xGraph, yGraph, graphFill, graphHeight);
    //add spacing
    yGraph += graphHeight + spacing;
    yText += size + spacing * 2;

    console.log("percentage",percentage(candidate))
  }

  
}


//does not work I give up o7

/* function clear(){
  for(let i = 0; i < candidates.length; i+=1){
    window.localStorage.removeItem(`${candidates[i].name}`);
  }
} */



window.onload = generateCandidates()