function playerEnterVehicleHandler(player, vehicle, seat) {
    // Taxi fare information
    var fare = player.vehicle.getVariable('fareprice');
    if (player.vehicle.model == mp.joaat('taxi') && fare != 'null') return player.outputChatBox(`The fare price of this Taxi is $${fare} per mile. Do /acceptfare to accept it.`);
    // ---------------------
}

mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);
