mp.gui.chat.safeMode = false;

var TaxiTimer;

let TaxiFareTimerStart = () => { 
    driver = mp.players.local; // Grabs the player id
    TaxiTimer = setInterval(function(){ TaxiFareUpdateRedirect(driver, driver.vehicle); }, 1000); // Starts a 1 second timer
};

let TaxiFareTimerStop = () => { 
    clearInterval(TaxiTimer); //  Stops the taxi timer
};

mp.events.add('TaxiFareTimerStart', TaxiFareTimerStart);
mp.events.add('TaxiFareTimerStop', TaxiFareTimerStop);

function TaxiFareUpdateRedirect (driver, vehicle){
    mp.events.callRemote("TaxiFareUpdate", driver, vehicle); // Calls a server-side function that updates the fare distance
}
