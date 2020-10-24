let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvasCol = document.querySelector('#canvasCol');
const stats =  document.getElementById('statsCol')
const healthBar = document.getElementById('healthBar')
const progressBar = document.getElementById('progressBar');

document.getElementById("eatBtn").addEventListener("click", startGame);
document.getElementById('resetGame').addEventListener("click", startGame)
document.getElementById('nextLevel').addEventListener("click", nextLevel)



function stopTimeout(timeout){
    clearTimeout(timeout)
}
function stopInterval(timeout){
    clearTimeout(timeout)
}


function startGame(){
    if(this.getAttribute('id') == 'eatBtn'){
        let row = this.parentNode.parentNode
        row.classList.toggle('d-none')
        stats.classList.toggle('d-none')
        canvas.classList.toggle('d-none')
        
        resetLevel();
        initialisePlayer();
        initialiseGhost();
        initialiseFood();
    }else{
        resetLevel();
        initialiseGhost()
        initialisePlayer()
        initialiseFood()
        updateProgress()
    }
    
    healthBar.style.width = `${player.health}%`
    if(player.health>50){
        healthBar.classList.add('bg-success')
        healthBar.classList.remove('bg-warning')
        healthBar.classList.remove('bg-danger')
    }else if(player.health <=50 && player.health>25){
        healthBar.classList.remove('bg-success')
        healthBar.classList.add('bg-warning')
    }else if(player.health <=25){
        healthBar.classList.remove('bg-success')
        healthBar.classList.remove('bg-warning')
        healthBar.classList.add('bg-danger')
      }
    
    setTimeout(function(){
        draw()
        setTimeout(healthDrop,10000)
    },1000)
}

function nextLevel(){
    initialiseGhost()
    initialiseFood()
    updateProgress()

    setTimeout(function(){
        draw()
        setTimeout(healthDrop,10000)
    },1000)

}
