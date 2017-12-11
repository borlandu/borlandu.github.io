/*MCEXP*/
let getTotalExp = currentLevel => currentLevel >= 0 && currentLevel < 16 ? Math.pow(currentLevel,2)+6*currentLevel :
currentLevel >= 16 && currentLevel < 32 ? 2.5*Math.pow(currentLevel,2)-40.5*currentLevel+360 :
currentLevel >= 32 ? 4.5*Math.pow(currentLevel,2)-162.5*currentLevel+2220 : 0;

let getFromToExp = (fromLevel, toLevel) => getTotalExp(toLevel) - getTotalExp(fromLevel);

function printTotalExp(){
document.querySelector('#js-totalExp').innerHTML = getTotalExp(document.querySelector('#js-currentLevel').value);
}
function printFromToExp(){
document.querySelector('#js-requiredExp').innerHTML = getFromToExp(document.querySelector('#js-fromLevel').value, document.querySelector('#js-toLevel').value)
}