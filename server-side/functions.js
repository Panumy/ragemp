mp.events.add(
{
        "TaxiFareStart": (driver, passenger) => {
                passenger.outputChatBox(`You have successfully <b style='color: green'>accepted</b> the fare.`); // pretty straight forward
                driver.outputChatBox(`The passenger has <b style='color: green'>accepted</b> the fare and the timer has started.`); // pretty straight forward

                driver.setVariable('taxipassenger', passenger); // Saves the passenger player ID

                driver.vehicle.setVariable('taxidriver', driver); // Saves the driver player ID
                driver.vehicle.setVariable('distancefromfarestart', 0); // Resets the distance of the taxi meter fare travel

                UpdateTaxiPos(driver.vehicle); // Saves the taxi's current position

                driver.call("TaxiFareTimerStart"); // Calls the client-side function to start the timer
        },

        "TaxiFareStop": (driver, vehicle) => {

                var distance = vehicle.getVariable('distancefromfarestart'); // Grabs the taxi's current location

                distance = Math.round(distance * 100) / 100; // Round up to two decimals

                var price = distance * vehicle.getVariable('fareprice'); // Calculates the total fare price

                price = Math.round(price * 100) / 100; // Round up to two decimals

                driver.getVariable('taxipassenger').outputChatBox(`The taxi driver has <b style='color: red'>stopped</b> the taxi meter. (Distance traveled: ${distance} Price paid: <b style='color: green'>$${price}</b>)`); // Pretty straight forward
                driver.outputChatBox(`You have <b style='color: red'>stopped</b> the taxi meter. Distance was: ${distance} miles, price: <b style='color: green'>$${price}</b>.`); // Pretty straight forward

                vehicle.setVariable('distancefromfarestart', 0); // Resets the distance of the taxi meter fare travel

                driver.call("TaxiFareTimerStop"); // Calls the client-side function to stop the timer
        },

        "TaxiFareUpdate": (driver) =>
        {
                if (driver.vehicle) // Checks if the taxi driver is in the vehicle
                {
                        let distance = (driver.vehicle.getVariable('distancefromfarestart') + driver.dist(driver.vehicle.positions.taxi) / 1000); // Adds the calculated distance and formats it into miles

                        distance = Math.round(distance * 100) / 100; // Rounds up to two decimals

                        driver.vehicle.setVariable('distancefromfarestart', distance); // Saves the current distance traveled

                        //driver.outputChatBox(`Distance updated (CD: ${distance} miles)`); //Debug

                        if(driver.vehicle.engineHealth < 0) return mp.events.call("TaxiFareStop", driver, driver.vehicle); // If vehicle is destroyed, stop the taxi meter

                        UpdateTaxiPos(driver.vehicle); // Saves the current taxi position
                }
        }
});

function UpdateTaxiPos(vehicle) // Used to save the current taxi position to be used in the future for comparison in distance calculation
{
        let vehpos = vehicle.position;

        vehicle.positions = { taxi: null}

        vehicle.positions.taxi = {
                x: vehpos.x,
                y: vehpos.y,
                z: vehpos.z
        }
}
