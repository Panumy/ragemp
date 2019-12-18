function playerEnterVehicleHandler(player, vehicle, seat) {
    // Taxi fare information
    if (player.vehicle.model == mp.joaat('taxi') && player.vehicle.getVariable('fareprice') != null) return player.outputChatBox(`The fare price of this Taxi is $${player.vehicle.getVariable('fareprice')} per mile. Do /acceptfare to accept it.`);
    // ---------------------
}

function playerExitVehicleHandler(player, vehicle) {
    // If a passenger leaves the taxi
    if (vehicle.model == mp.joaat('taxi') && vehicle.getVariable('distancefromfarestart') != 0)
    {
        player.outputChatBox(`You have <b style='color: red'>left the taxi</b> vehicle and automatically <b style='color: red'>stopped</b> the fare.`);
        mp.events.call("TaxiFareStop", vehicle.getVariable('taxidriver'), vehicle); // Stops the taxi timer
    }
    // ---------------------
}

mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);
mp.events.add("playerExitVehicle", playerExitVehicleHandler);
