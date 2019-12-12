mp.events.addCommand('gibztaxi', (player) => {
    mp.vehicles.new(mp.joaat("taxi"), player.position,
        {
            numberPlate: "ADMIN",
            color: [[88, 88, 88], [88, 88, 88]]
        });
});

mp.events.addCommand('setfare', (player, fare) => {
    if (!player.vehicle) return player.outputChatBox(`You must be in a vehicle.`);
    if (player.vehicle.model != mp.joaat('taxi')) return player.outputChatBox(`You must be in a taxi.`);
    player.outputChatBox(`Set the fare to $${fare} per mile.`);
    player.vehicle.setVariable('fareprice', fare);
});

mp.events.addCommand('acceptfare', (player) => {
    if (player.vehicle.model != mp.joaat('taxi')) return player.outputChatBox(`You must be in a taxi.`);
    player.outputChatBox(`You have accepted the fare rate of this taxi.`);

    var oc = player.vehicle.getOccupants();
    //Debug
    for (var i = 0; i < 4; i++) {
        console.dir(i);
    }
    //-----

    mp.events.call("TaxiFareStart", player);
});
