mp.events.add(
{
        "TaxiFareStart": (driver, passenger) => {
                passenger.outputChatBox(`You have successfully accepted the fare.`);
                driver.outputChatBox(`The passenger has accepted the fare and the timer has started.`);

                passenger.setVariable('taxidriver', driver);
                driver.setVariable('taxipassenger', passenger);

                driver.vehicle.setVariable('distancefromfarestart', 0);

                UpdateTaxiPos(driver.vehicle);

                driver.call("TaxiFareTimerStart");

                //driver.vehicle.setVariable('distancetimer', timer);
        },

        "TaxiTimerAssign" : (vehicle, timer) => {
                vehicle.setVariable('TaxiTimer', timer);
        },

        "TaxiFareStop": (driver) => {

                var distance = driver.vehicle.getVariable('distancefromfarestart');

                distance = Math.round(distance * 100) / 100; // Round up to two decimals

                var price = distance * driver.vehicle.getVariable('fareprice');

                price = Math.round(price * 100) / 100; // Round up to two decimals

                driver.getVariable('taxipassenger').outputChatBox(`The taxi driver has stopped the taxi meter.`);
                driver.outputChatBox(`You have stopped the taxi meter. Distance was: ${distance} miles, price: $${price}.`);

                driver.vehicle.setVariable('distancefromfarestart', 0);
                //driver.call("TaxiFareTimerStop");

                var timer = driver.vehicle.getVariable('TaxiTimer');

                clearInterval(timer);
        },

        "TaxiFareUpdate" : driver =>
        {
                //let currentpos = driver.vehicle.position;

                let distance = driver.vehicle.getVariable('distancefromfarestart') + driver.dist(driver.vehicle.positions.taxi);

                distance = Math.round(distance * 100) / 100;

                //console.dir(`CP | x: ${currentpos.x} y: ${currentpos.y} z: ${currentpos.z}`);
                //console.dir(`CP | x: ${driver.vehicle.positions.taxi.x} y: ${driver.vehicle.positions.taxi.y} z: ${driver.vehicle.positions.taxi.z}`);

                driver.vehicle.setVariable('distancefromfarestart', distance);

                driver.outputChatBox(`Distance updated (CD: ${distance})`);

                UpdateTaxiPos(driver.vehicle);
        }
});

function UpdateTaxiPos(vehicle)
{
        let vehpos = vehicle.position;

        vehicle.positions = { taxi: null}

        vehicle.positions.taxi = {
                x: vehpos.x,
                y: vehpos.y,
                z: vehpos.z
        }

        //let temppos = vehicle.position.taxi;

        //console.dir(`UTP | x: ${vehpos.x} y: ${vehpos.y} z: ${vehpos.z}`); // Debug
        //console.dir(`UTP | ${temppos} | ${vehicle.position}`)
        //console.dir(`UTP | x: ${temppos.x} y: ${temppos.y} z: ${temppos.z}`); // Debug
}
