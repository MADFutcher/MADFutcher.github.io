let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvasCol = document.querySelector('#canvasCol');
const stats =  document.getElementById('statsCol')
const healthBar = document.getElementById('healthBar')
const progressBar = document.getElementById('progressBar');
const muteButton = document.getElementById('bgMute')
const unmuteButton = document.getElementById('bgUnmute')

const bgMusic = new Audio('./sound/backGround.mp3')
bgMusic.volume = 0.05

document.getElementById("eatBtn").addEventListener("click", startGame);
document.getElementById('resetGame').addEventListener("click", startGame)
document.getElementById('nextLevel').addEventListener("click", nextLevel)


muteButton.addEventListener('click', function(){
    bgMusic.pause()
    muteButton.classList.toggle('d-none');
    unmuteButton.classList.toggle('d-none')
})
unmuteButton.addEventListener('click', function(){
    bgMusic.play()
    muteButton.classList.toggle('d-none');
    unmuteButton.classList.toggle('d-none')

})




function stopTimeout(timeout){
    clearTimeout(timeout)
}
function stopInterval(timeout){
    clearTimeout(timeout)
}


function startGame(){
    gameOverAudio.pause()
    winningAudio.pause()
    if(this.getAttribute('id') == 'eatBtn'){
        bgMusic.loop = true
        bgMusic.play()
        let row = this.parentNode.parentNode
        row.classList.toggle('d-none')
        stats.classList.toggle('d-none')
        canvas.classList.toggle('d-none')
        
        resetLevel();
        initialisePlayer();
        initialiseGhost();
        initialiseFood();
    }else{
        bgMusic.play()
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
