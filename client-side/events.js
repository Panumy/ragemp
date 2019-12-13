let TaxiFareTimerStart = () => { 
    driver = mp.players.local;
    var timer = setInterval(function(){ TaxiFareUpdateRedirect(driver); }, 1000);
    
    mp.events.callRemote("TaxiTimerAssign",driver.vehicle, timer);
};

/*let TaxiFareTimerStop = () => { 
    var timer = driver.vehicle.getVariable('TaxiTimer');
    clearInterval(timer);
};*/

mp.events.add('TaxiFareTimerStart', TaxiFareTimerStart);
//mp.events.add('TaxiFareTimerStop', TaxiFareTimerStop);

function TaxiFareUpdateRedirect (driver){
    mp.events.callRemote("TaxiFareUpdate", driver);
}
