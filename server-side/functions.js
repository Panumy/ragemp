var timer;

mp.events.add(
{
        "TaxiFareStart": (driver, passenger) => {
                passenger.outputChatBox(`You have successfully accepted the fare.`);
                driver.outputChatBox(`The passenger has accepted the fare and the timer has started.`);

                passenger.setVariable('taxidriver', driver);
                driver.setVariable('taxipassenger', passenger);

                driver.vehicle.setVariable('distancefromfarestart', 0);

                timer = setInterval(function(){ UpdateTimer(driver); }, 1000);
                //driver.vehicle.setVariable('distancetimer', timer);
        },

        "TaxiFareStop": (driver) => {

                var distance = driver.vehicle.getVariable('distancefromfarestart');

                distance = Math.round(distance * 100) / 100; // Round up to two decimals

                var price = distance * driver.vehicle.getVariable('fareprice');

                price = Math.round(price * 100) / 100; // Round up to two decimals

                driver.getVariable('taxipassenger').outputChatBox(`The taxi driver has stopped the taxi meter.`);
                driver.outputChatBox(`You have stopped the taxi meter. Distance was: ${distance} miles, price: $${price}.`);

                driver.vehicle.setVariable('distancefromfarestart', 0);
                clearInterval(timer);
        }
});

function UpdateTimer(driver) {
        console.dir(`In UpdateTimer with driver (${driver})`);

        var distance = driver.vehicle.getVariable('distancefromfarestart') + 0.5; // Adding 0.5 until I make a system that gives actual distance

        console.dir(`Added 0.5 to distance (${distance})`);

        driver.vehicle.setVariable('distancefromfarestart', distance);

        driver.outputChatBox(`Distance updated by 0.5 (CD: ${distance})`);
}
